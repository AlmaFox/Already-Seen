const DEFAULT_SETTINGS = {
  dimWatched: true,
  hideWatched: false,
  dimOpacity: 0.35,
  autoMarkThreshold: 0.8,
  autoMarkEnabled: true,
  language: "ru",
  showBadgeCounter: true,
  showChannelProgress: true
};

function formatBadgeCount(count) {
  if (!count || count <= 0) return "";
  if (count > 9999) return `${(count / 1000).toFixed(0)}k`;
  if (count > 999) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function updateBadge(count, showBadgeCounter = true) {
  const actionApi = (typeof chrome !== "undefined" && chrome.action) ? chrome.action : ((typeof browser !== "undefined" && browser.action) ? browser.action : null);
  if (!actionApi) return;
  if (!showBadgeCounter) {
    actionApi.setBadgeText({ text: "" });
    return;
  }
  const text = formatBadgeCount(count);
  actionApi.setBadgeText({ text });
  actionApi.setBadgeBackgroundColor({ color: "#ff0033" });
}

function refreshBadge() {
  chrome.storage.local.get(["watched_videos", "settings"], (result) => {
    const watched = result.watched_videos || {};
    const count = Object.keys(watched).length;
    const showCounter = result.settings ? result.settings.showBadgeCounter !== false : true;
    updateBadge(count, showCounter);
  });
}

function reinjectContentScripts() {
  const tabsApi = (typeof chrome !== "undefined" && chrome.tabs) ? chrome.tabs : ((typeof browser !== "undefined" && browser.tabs) ? browser.tabs : null);
  const scriptingApi = (typeof chrome !== "undefined" && chrome.scripting) ? chrome.scripting : ((typeof browser !== "undefined" && browser.scripting) ? browser.scripting : null);
  if (!tabsApi || !scriptingApi) return;
  tabsApi.query({ url: "*://*.youtube.com/*" }, (tabs) => {
    if (!tabs || !tabs.length) return;
    for (const tab of tabs) {
      if (!tab.id) continue;
      scriptingApi.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      }).catch(() => {});
      scriptingApi.insertCSS({
        target: { tabId: tab.id },
        files: ["styles.css"]
      }).catch(() => {});
    }
  });
}

function loadInitialHistoryIfEmpty() {
  chrome.storage.local.get(["watched_videos", "initial_history_seeded"], (res) => {
    if (res && res.initial_history_seeded) return;
    if (res && res.watched_videos && Object.keys(res.watched_videos).length > 0) {
      chrome.storage.local.set({ initial_history_seeded: true });
      return;
    }
    try {
      const url = chrome.runtime.getURL("initial_history.json");
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          if (data && data.watched_videos && Object.keys(data.watched_videos).length > 0) {
            chrome.storage.local.set({ watched_videos: data.watched_videos, initial_history_seeded: true }, () => {
              refreshBadge();
            });
          }
        })
        .catch(() => {});
    } catch (e) {}
  });
}

chrome.runtime.onInstalled.addListener(() => {
  reinjectContentScripts();
  chrome.storage.local.get(["settings", "watched_videos", "watch_later"], (result) => {
    const updates = {};
    if (!result.settings) {
      updates.settings = DEFAULT_SETTINGS;
    } else {
      updates.settings = Object.assign({}, DEFAULT_SETTINGS, result.settings);
    }
    if (!result.watched_videos) {
      updates.watched_videos = {};
    }
    if (!result.watch_later) {
      updates.watch_later = {};
    }
    chrome.storage.local.set(updates, () => {
      refreshBadge();
      loadInitialHistoryIfEmpty();
    });
  });
});

chrome.runtime.onStartup.addListener(() => {
  refreshBadge();
  loadInitialHistoryIfEmpty();
});

loadInitialHistoryIfEmpty();

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && (changes.watched_videos || changes.settings)) {
    refreshBadge();
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return false;

  if (message.type === "GET_STATS") {
    chrome.storage.local.get(["watched_videos", "watch_later"], (result) => {
      const watched = result.watched_videos || {};
      const watchLater = result.watch_later || {};
      sendResponse({
        count: Object.keys(watched).length,
        watchLaterCount: Object.keys(watchLater).length
      });
    });
    return true;
  }

  if (message.type === "OPEN_DASHBOARD") {
    const url = chrome.runtime.getURL("dashboard/index.html");
    chrome.tabs.create({ url });
    sendResponse({ success: true, url: url });
    return true;
  }

  if (message.type === "TOGGLE_WATCHED") {
    const { videoId, source = "manual", title = "", channel = "" } = message;
    if (!videoId) {
      sendResponse({ success: false, error: "Missing videoId" });
      return false;
    }

    chrome.storage.local.get(["watched_videos"], (result) => {
      const watched = result.watched_videos || {};
      const isWatched = Boolean(watched[videoId]);

      if (isWatched) {
        delete watched[videoId];
      } else {
        watched[videoId] = {
          timestamp: Date.now(),
          source: source,
          title: title,
          channel: channel
        };
      }

      chrome.storage.local.set({ watched_videos: watched }, () => {
        sendResponse({
          success: true,
          videoId: videoId,
          isWatched: !isWatched,
          count: Object.keys(watched).length
        });
      });
    });
    return true;
  }

  if (message.type === "TOGGLE_WATCH_LATER") {
    const { videoId, title = "", channel = "" } = message;
    if (!videoId) {
      sendResponse({ success: false, error: "Missing videoId" });
      return false;
    }

    chrome.storage.local.get(["watch_later"], (result) => {
      const list = result.watch_later || {};
      const isSaved = Boolean(list[videoId]);

      if (isSaved) {
        delete list[videoId];
      } else {
        list[videoId] = {
          timestamp: Date.now(),
          title: title,
          channel: channel
        };
      }

      chrome.storage.local.set({ watch_later: list }, () => {
        sendResponse({
          success: true,
          videoId: videoId,
          isSaved: !isSaved,
          count: Object.keys(list).length
        });
      });
    });
    return true;
  }

  if (message.type === "CLEAR_ALL") {
    chrome.storage.local.set({ watched_videos: {}, watch_later: {} }, () => {
      updateBadge(0);
      sendResponse({ success: true, count: 0 });
    });
    return true;
  }

  if (message.type === "FETCH_METADATA") {
    const { videoId } = message;
    if (!videoId) {
      sendResponse({ success: false, error: "Missing videoId" });
      return false;
    }

    const endpoint = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        sendResponse({
          success: true,
          videoId: videoId,
          title: data.title || "",
          channel: data.author_name || ""
        });
      })
      .catch((err) => {
        sendResponse({ success: false, error: err.message });
      });
    return true;
  }

  return false;
});
