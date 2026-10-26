if (window.__ALREADY_SEEN_TEARDOWN__) {
  try {
    window.__ALREADY_SEEN_TEARDOWN__();
  } catch (e) {}
}

function isExtensionValid() {
  try {
    if (typeof browser !== "undefined" && browser.runtime && browser.runtime.id) {
      return true;
    }
    return typeof chrome !== "undefined" && Boolean(chrome.runtime && chrome.runtime.id);
  } catch (e) {
    return false;
  }
}

function queuePendingAction(type, videoId, metadata, source) {
  try {
    const raw = localStorage.getItem("as_pending_actions");
    const list = raw ? JSON.parse(raw) : [];
    list.push({ type, videoId, metadata, source, timestamp: Date.now() });
    localStorage.setItem("as_pending_actions", JSON.stringify(list));
  } catch (e) {}
}

function showReloadNotice() {
  let toast = document.getElementById("as-reload-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "as-reload-toast";
    toast.className = "as-reload-toast";
    const isRu = settings.language === "ru";
    const text = isRu
      ? "Already Seen: расширение было обновлено. Ваши отметки временно сохранены."
      : "Already Seen: extension was reloaded. Your marks are temporarily saved.";
    const btnText = isRu ? "Обновить (F5)" : "Reload page";
    const span = document.createElement("span");
    span.textContent = text;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "as-reload-btn";
    btn.textContent = btnText;
    btn.addEventListener("click", () => {
      window.location.reload();
    });
    toast.appendChild(span);
    toast.appendChild(btn);
    document.body.appendChild(toast);
  }
  toast.classList.add("as-show");
  setTimeout(() => {
    toast.classList.remove("as-show");
  }, 7000);
}

function flushPendingActions() {
  if (!isExtensionValid()) return;
  try {
    const raw = localStorage.getItem("as_pending_actions");
    if (!raw) return;
    const list = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) return;
    localStorage.removeItem("as_pending_actions");

    chrome.storage.local.get(["watched_videos", "watch_later"], (result) => {
      if (chrome.runtime.lastError || !result) return;
      const watched = result.watched_videos || {};
      const wl = result.watch_later || {};
      let changedWatched = false;
      let changedWl = false;

      for (const item of list) {
        if (!item.videoId) continue;
        if (item.type === "toggleWatched") {
          if (watched[item.videoId]) {
            delete watched[item.videoId];
          } else {
            watched[item.videoId] = {
              timestamp: item.timestamp || Date.now(),
              source: item.source || "manual",
              title: (item.metadata && item.metadata.title) || "",
              channel: (item.metadata && item.metadata.channel) || ""
            };
          }
          changedWatched = true;
        } else if (item.type === "toggleWatchLater") {
          if (wl[item.videoId]) {
            delete wl[item.videoId];
          } else {
            wl[item.videoId] = {
              timestamp: item.timestamp || Date.now(),
              title: (item.metadata && item.metadata.title) || "",
              channel: (item.metadata && item.metadata.channel) || ""
            };
          }
          changedWl = true;
        }
      }

      const updates = {};
      if (changedWatched) updates.watched_videos = watched;
      if (changedWl) updates.watch_later = wl;
      if (Object.keys(updates).length > 0) {
        chrome.storage.local.set(updates, () => {
          for (const item of list) {
            updateCardsForVideoId(item.videoId);
          }
        });
      }
    });
  } catch (e) {}
}

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

const CARD_SELECTORS = [
  "ytd-rich-item-renderer",
  "ytd-grid-video-renderer",
  "ytd-video-renderer",
  "ytd-compact-video-renderer",
  "yt-lockup-view-model"
].join(", ");

const watchedMap = new Map();
const watchLaterMap = new Map();
let settings = Object.assign({}, DEFAULT_SETTINGS);

let mutationFrameId = null;
let currentTrackedVideo = null;

function extractVideoId(urlOrPath) {
  if (!urlOrPath) return null;
  const watchMatch = urlOrPath.match(/(?:[?&]v=|\/watch\?v=|\/watch\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortsMatch = urlOrPath.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];
  const embedMatch = urlOrPath.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  const liveMatch = urlOrPath.match(/\/live\/([a-zA-Z0-9_-]{11})/);
  if (liveMatch) return liveMatch[1];
  const youtuMatch = urlOrPath.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuMatch) return youtuMatch[1];
  return null;
}

function findVideoIdInCard(card) {
  const anchor = card.querySelector(
    'a#thumbnail[href], a.yt-lockup-view-model-wiz__content-image[href], a[href*="/watch?v="], a[href*="/shorts/"], a[href*="/watch/"], a.ytd-thumbnail[href]'
  );
  if (!anchor) return null;
  const href = anchor.getAttribute("href") || anchor.href;
  return extractVideoId(href);
}

function extractCardMetadata(card) {
  let title = "";
  let channel = "";

  const titleEl = card.querySelector(
    "#video-title, #video-title-link, a#video-title, h3 a, .yt-lockup-metadata-view-model-wiz__title, #video-title yt-formatted-string, yt-formatted-string#video-title, span#video-title"
  );
  if (titleEl) {
    title = (titleEl.getAttribute("title") || titleEl.getAttribute("aria-label") || titleEl.textContent || "").trim();
  }

  if (!title) {
    const fallbackTitleEl = card.querySelector("a[aria-label][href*='watch?v='], a[aria-label][href*='/shorts/']");
    if (fallbackTitleEl) {
      const aria = fallbackTitleEl.getAttribute("aria-label") || "";
      if (aria) {
        title = aria.split(" by ")[0].trim();
      }
    }
  }

  const channelEl = card.querySelector(
    "#channel-name #text, ytd-channel-name #text, .ytd-channel-name, .yt-lockup-metadata-view-model-wiz__metadata, yt-formatted-string.ytd-channel-name, ytd-channel-name yt-formatted-string, ytd-video-meta-block #channel-name"
  );
  if (channelEl) {
    channel = (channelEl.textContent || "").trim();
  }

  return { title, channel };
}

function extractPageMetadata() {
  let title = "";
  let channel = "";

  const titleEl = document.querySelector(
    "h1.ytd-watch-metadata yt-formatted-string, #title h1 yt-formatted-string, h1.title, h1.ytd-reel-player-header-renderer"
  );
  if (titleEl) {
    title = (titleEl.textContent || "").trim();
  }

  const channelEl = document.querySelector(
    "#channel-name #text, ytd-channel-name #text, #owner-name a, #upload-info #channel-name, ytd-channel-name a"
  );
  if (channelEl) {
    channel = (channelEl.textContent || "").trim();
  }

  return { title, channel };
}

function getBadgeContainer(card) {
  return (
    card.querySelector("#dismissible") ||
    card.querySelector("ytd-rich-grid-media") ||
    card.querySelector(".yt-lockup-view-model-wiz__content-image") ||
    card.querySelector("yt-thumbnail-view-model") ||
    card.querySelector("ytd-thumbnail") ||
    card.querySelector("#thumbnail") ||
    card
  );
}

function applyCardClasses(card, isWatched) {
  if (isWatched) {
    if (settings.hideWatched) {
      card.classList.add("as-card-hidden");
      card.classList.remove("as-card-watched");
    } else if (settings.dimWatched) {
      card.classList.add("as-card-watched");
      card.classList.remove("as-card-hidden");
    } else {
      card.classList.remove("as-card-watched");
      card.classList.remove("as-card-hidden");
    }
  } else {
    card.classList.remove("as-card-watched");
    card.classList.remove("as-card-hidden");
  }
}

function createClockSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2.2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "12");
  circle.setAttribute("cy", "12");
  circle.setAttribute("r", "9");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "12 7 12 12 15 14");

  svg.appendChild(circle);
  svg.appendChild(polyline);
  return svg;
}

function createPlusSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "13");
  svg.setAttribute("height", "13");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "3.4");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line1.setAttribute("x1", "12");
  line1.setAttribute("y1", "5");
  line1.setAttribute("x2", "12");
  line1.setAttribute("y2", "19");

  const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line2.setAttribute("x1", "5");
  line2.setAttribute("y1", "12");
  line2.setAttribute("x2", "19");
  line2.setAttribute("y2", "12");

  svg.appendChild(line1);
  svg.appendChild(line2);
  return svg;
}

function createCheckSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "12");
  svg.setAttribute("height", "12");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "3");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "20 6 9 17 4 12");

  svg.appendChild(polyline);
  return svg;
}

function createChannelProgressIconSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2.2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z");

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", "12");
  circle.setAttribute("cy", "12");
  circle.setAttribute("r", "3");

  svg.appendChild(path);
  svg.appendChild(circle);
  return svg;
}

function createChannelProgressCheckSvg() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "14");
  svg.setAttribute("height", "14");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2.6");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "20 6 9 17 4 12");

  svg.appendChild(polyline);
  return svg;
}

function isChannelPage() {
  const p = window.location.pathname;
  return (
    p.startsWith("/@") ||
    p.startsWith("/channel/") ||
    p.startsWith("/c/") ||
    p.startsWith("/user/")
  );
}

function normalizeChannelName(name) {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ");
}

function parseVideoCount(text) {
  if (!text) return null;
  const cleaned = text.trim().toLowerCase().replace(/\u00a0|\u202f/g, " ");
  if (!/(?:video|видео|vídeo)/i.test(cleaned)) return null;
  if (!/\d/.test(cleaned)) return null;

  const mK = cleaned.match(/([\d\s,.]+)\s*(?:k|тыс|kilo)/i);
  if (mK) {
    const num = parseFloat(mK[1].replace(/\s/g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000);
  }

  const mM = cleaned.match(/([\d\s,.]+)\s*(?:m|млн|million)/i);
  if (mM) {
    const num = parseFloat(mM[1].replace(/\s/g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000000);
  }

  const mExact = cleaned.match(/([\d\s,.]+)\s*(?:video|видео|vídeo)/i);
  if (mExact) {
    const raw = mExact[1].replace(/\s/g, "").replace(/,/g, "");
    const num = parseInt(raw, 10);
    if (!isNaN(num)) return num;
  }
  return null;
}

function extractChannelHeaderInfo() {
  const header = document.querySelector(
    "yt-page-header-view-model, ytd-c4-tabbed-header-renderer"
  );
  if (!header) return null;

  let title = "";
  const titleEl = header.querySelector(
    ".yt-page-header-view-model__page-header-headline h1, .page-header-view-model-wiz__page-header-headline h1, h1, #channel-name #text"
  );
  if (titleEl) {
    title = (titleEl.textContent || "").trim();
  }
  if (!title) {
    title = (document.title || "").replace(/\s*-\s*YouTube.*$/i, "").trim();
  }

  let handle = "";
  if (window.location.pathname.startsWith("/@")) {
    handle = window.location.pathname.split("/")[1];
  } else {
    const handleEl = header.querySelector(
      "a[href^='/@'], yt-content-metadata-view-model a[href^='/@']"
    );
    if (handleEl) {
      handle = (handleEl.textContent || "").trim();
    }
  }

  let totalVideos = null;
  const spans = header.querySelectorAll(
    "yt-content-metadata-view-model span, .yt-content-metadata-view-model__metadata-text, #videos-count, #meta-container span"
  );
  for (let i = 0; i < spans.length; i++) {
    const count = parseVideoCount(spans[i].textContent);
    if (count !== null) {
      totalVideos = count;
      break;
    }
  }

  if (totalVideos === null) {
    const text = header.textContent || "";
    const parts = text.split(/[\n•·|]/);
    for (let i = 0; i < parts.length; i++) {
      const count = parseVideoCount(parts[i]);
      if (count !== null) {
        totalVideos = count;
        break;
      }
    }
  }

  return { header, title, handle, totalVideos };
}

function getChannelWatchedCount(channelTitle, channelHandle) {
  const normTitle = normalizeChannelName(channelTitle);
  const normHandle = normalizeChannelName(channelHandle);

  const matchedVideoIds = new Set();

  for (const [id, item] of watchedMap.entries()) {
    if (!item) continue;
    const c = normalizeChannelName(item.channel);
    if (!c) continue;

    if (normTitle && c === normTitle) {
      matchedVideoIds.add(id);
      continue;
    }
    if (normHandle && c === normHandle) {
      matchedVideoIds.add(id);
      continue;
    }
    if (normTitle && normTitle.length >= 4 && (c.includes(normTitle) || normTitle.includes(c))) {
      matchedVideoIds.add(id);
      continue;
    }
  }

  const cards = document.querySelectorAll(
    "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, yt-lockup-view-model"
  );
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const id = card.dataset.alreadySeenId || findVideoIdInCard(card);
    if (id && watchedMap.has(id)) {
      matchedVideoIds.add(id);
    }
  }

  return matchedVideoIds.size;
}

function insertChannelProgressBar(header, container) {
  if (container.parentElement && container.isConnected) {
    return;
  }

  const headlineInfo = header.querySelector(
    ".yt-page-header-view-model__page-header-headline-info, .page-header-view-model-wiz__page-header-headline-info, .ytPageHeaderViewModelHeadlineInfo"
  );
  if (headlineInfo) {
    const metaModel = headlineInfo.querySelector("yt-content-metadata-view-model");
    if (metaModel && metaModel.nextSibling) {
      headlineInfo.insertBefore(container, metaModel.nextSibling);
      return;
    }
    headlineInfo.appendChild(container);
    return;
  }

  const textContainer = header.querySelector(".ytPageHeaderViewModelTextContainer");
  if (textContainer) {
    textContainer.appendChild(container);
    return;
  }

  const classicMeta = header.querySelector("#meta-container, #inner-header-container");
  if (classicMeta) {
    classicMeta.appendChild(container);
    return;
  }

  header.appendChild(container);
}

function updateChannelProgress() {
  if (!isExtensionValid()) return;
  if (!settings.showChannelProgress) {
    const existing = document.getElementById("as-channel-progress");
    if (existing) existing.remove();
    return;
  }

  if (!isChannelPage()) {
    const existing = document.getElementById("as-channel-progress");
    if (existing) existing.remove();
    return;
  }

  const info = extractChannelHeaderInfo();
  if (!info || !info.header) return;

  const { header, title, handle, totalVideos } = info;
  const watchedCount = getChannelWatchedCount(title, handle);

  let container = document.getElementById("as-channel-progress");
  if (!container) {
    container = document.createElement("div");
    container.id = "as-channel-progress";
    container.className = "as-channel-progress";

    const headerRow = document.createElement("div");
    headerRow.className = "as-channel-progress-header";

    const titleDiv = document.createElement("div");
    titleDiv.className = "as-channel-progress-title";

    const iconSpan = document.createElement("span");
    iconSpan.className = "as-channel-progress-icon";

    const textSpan = document.createElement("span");
    textSpan.className = "as-channel-progress-text";

    titleDiv.appendChild(iconSpan);
    titleDiv.appendChild(textSpan);

    const percentSpan = document.createElement("span");
    percentSpan.className = "as-channel-progress-percent";

    headerRow.appendChild(titleDiv);
    headerRow.appendChild(percentSpan);

    const track = document.createElement("div");
    track.className = "as-channel-progress-track";

    const bar = document.createElement("div");
    bar.className = "as-channel-progress-bar";

    track.appendChild(bar);
    container.appendChild(headerRow);
    container.appendChild(track);
  }

  insertChannelProgressBar(header, container);

  const iconSpan = container.querySelector(".as-channel-progress-icon");
  const textSpan = container.querySelector(".as-channel-progress-text");
  const percentSpan = container.querySelector(".as-channel-progress-percent");
  const bar = container.querySelector(".as-channel-progress-bar");
  const isRu = settings.language === "ru";

  if (totalVideos !== null && totalVideos >= 0) {
    const displayWatched = Math.min(watchedCount, totalVideos);
    const rawPercent = totalVideos > 0 ? (displayWatched / totalVideos) * 100 : 0;
    const clampedPercent = Math.min(100, Math.max(0, rawPercent));
    const remaining = Math.max(0, totalVideos - displayWatched);

    let percentStr = "";
    if (clampedPercent === 100) {
      percentStr = "100";
    } else if (clampedPercent === 0) {
      percentStr = "0";
    } else {
      let rounded = clampedPercent.toFixed(1);
      if (rounded === "0.0" && displayWatched > 0) {
        rounded = "0.1";
      } else if (rounded === "100.0" && displayWatched < totalVideos) {
        rounded = "99.9";
      }
      percentStr = isRu ? rounded.replace(".", ",") : rounded;
    }

    if (textSpan) {
      textSpan.textContent = isRu
        ? `Просмотрено: ${displayWatched} из ${totalVideos} видео`
        : `Watched: ${displayWatched} of ${totalVideos} videos`;
    }

    if (percentSpan) {
      percentSpan.textContent = `${percentStr}%`;
    }

    if (bar) {
      bar.style.width = `${clampedPercent}%`;
    }

    if (clampedPercent === 100) {
      container.classList.add("as-all-watched");
      if (bar) bar.classList.add("as-completed");
      if (iconSpan && !iconSpan.querySelector(".as-icon-check")) {
        iconSpan.textContent = "";
        const checkSvg = createChannelProgressCheckSvg();
        checkSvg.classList.add("as-icon-check");
        iconSpan.appendChild(checkSvg);
      }
    } else {
      container.classList.remove("as-all-watched");
      if (bar) bar.classList.remove("as-completed");
      if (iconSpan && !iconSpan.querySelector(".as-icon-eye")) {
        iconSpan.textContent = "";
        const eyeSvg = createChannelProgressIconSvg();
        eyeSvg.classList.add("as-icon-eye");
        iconSpan.appendChild(eyeSvg);
      }
    }

    container.title = isRu
      ? `${displayWatched} просмотрено, ${remaining} осталось (${percentStr}%)`
      : `${displayWatched} watched, ${remaining} remaining (${percentStr}%)`;
  } else {
    if (textSpan) {
      textSpan.textContent = isRu
        ? `Просмотрено видео: ${watchedCount}`
        : `Watched videos: ${watchedCount}`;
    }

    if (percentSpan) {
      percentSpan.textContent = "";
    }

    if (bar) {
      bar.style.width = "0%";
      bar.classList.remove("as-completed");
    }

    container.classList.remove("as-all-watched");
    if (iconSpan && !iconSpan.querySelector(".as-icon-eye")) {
      iconSpan.textContent = "";
      const eyeSvg = createChannelProgressIconSvg();
      eyeSvg.classList.add("as-icon-eye");
      iconSpan.appendChild(eyeSvg);
    }

    container.title = isRu
      ? `Просмотрено на канале: ${watchedCount}`
      : `Watched on channel: ${watchedCount}`;
  }
}

function renderBadge(card, isWatched, isWatchLater) {
  const container = getBadgeContainer(card);
  if (!container) return;

  const computedStyle = window.getComputedStyle(container);
  if (computedStyle.position === "static") {
    container.style.position = "relative";
  }

  let group = container.querySelector(":scope > .as-badge-group") || card.querySelector(".as-badge-group");

  if (!group) {
    group = document.createElement("div");
    group.className = "as-badge-group";

    const badge = document.createElement("div");
    badge.className = "as-badge";
    badge.setAttribute("role", "button");
    badge.setAttribute("tabindex", "0");

    const iconSpan = document.createElement("span");
    iconSpan.className = "as-badge-icon";

    const labelSpan = document.createElement("span");
    labelSpan.className = "as-badge-label";

    badge.appendChild(iconSpan);
    badge.appendChild(labelSpan);

    badge.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentId = card.dataset.alreadySeenId;
      if (currentId) {
        const metadata = extractCardMetadata(card);
        toggleVideoWatched(currentId, "manual", metadata);
      }
    });

    badge.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    badge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        const currentId = card.dataset.alreadySeenId;
        if (currentId) {
          const metadata = extractCardMetadata(card);
          toggleVideoWatched(currentId, "manual", metadata);
        }
      }
    });

    const wlBadge = document.createElement("div");
    wlBadge.className = "as-watch-later-badge";
    wlBadge.setAttribute("role", "button");
    wlBadge.setAttribute("tabindex", "0");
    wlBadge.appendChild(createClockSvg());

    wlBadge.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentId = card.dataset.alreadySeenId;
      if (currentId) {
        const metadata = extractCardMetadata(card);
        toggleWatchLater(currentId, metadata);
      }
    });

    wlBadge.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    wlBadge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        const currentId = card.dataset.alreadySeenId;
        if (currentId) {
          const metadata = extractCardMetadata(card);
          toggleWatchLater(currentId, metadata);
        }
      }
    });

    group.appendChild(badge);
    group.appendChild(wlBadge);
    container.appendChild(group);
  } else if (group.parentElement !== container) {
    container.appendChild(group);
  }

  const badge = group.querySelector(".as-badge");
  const wlBadge = group.querySelector(".as-watch-later-badge");
  const isRu = settings.language === "ru";

  if (badge) {
    const label = badge.querySelector(".as-badge-label");
    if (label) {
      label.textContent = isRu ? "ПРОСМОТРЕНО" : "SEEN";
    }

    const icon = badge.querySelector(".as-badge-icon");

    if (isWatched) {
      badge.classList.add("as-badge-watched");
      if (icon) {
        icon.textContent = "";
        icon.appendChild(createCheckSvg());
      }
      badge.title = isRu ? "Отметить как непросмотренное" : "Mark as unwatched";
      badge.setAttribute("aria-pressed", "true");
    } else {
      badge.classList.remove("as-badge-watched");
      if (icon) {
        icon.textContent = "";
        icon.appendChild(createPlusSvg());
      }
      badge.title = isRu ? "Отметить как просмотренное" : "Mark as watched";
      badge.setAttribute("aria-pressed", "false");
    }
  }

  if (wlBadge) {
    if (isWatchLater) {
      wlBadge.classList.add("as-wl-active");
      wlBadge.title = isRu ? "Удалить из «Смотреть позже»" : "Remove from Watch Later";
      wlBadge.setAttribute("aria-pressed", "true");
    } else {
      wlBadge.classList.remove("as-wl-active");
      wlBadge.title = isRu ? "Смотреть позже" : "Watch Later";
      wlBadge.setAttribute("aria-pressed", "false");
    }
  }
}

function maybeEnrichMetadata(videoId, card) {
  const meta = extractCardMetadata(card);
  if (!meta.title) return;

  let changedWatched = false;
  let changedWl = false;

  if (watchedMap.has(videoId)) {
    const item = watchedMap.get(videoId);
    if (item && (!item.title || !item.channel)) {
      if (!item.title) item.title = meta.title;
      if (!item.channel) item.channel = meta.channel;
      changedWatched = true;
    }
  }

  if (watchLaterMap.has(videoId)) {
    const item = watchLaterMap.get(videoId);
    if (item && (!item.title || !item.channel)) {
      if (!item.title) item.title = meta.title;
      if (!item.channel) item.channel = meta.channel;
      changedWl = true;
    }
  }

  if (changedWatched) {
    chrome.storage.local.get(["watched_videos"], (res) => {
      const watched = res.watched_videos || {};
      if (watched[videoId]) {
        watched[videoId].title = meta.title;
        if (meta.channel) watched[videoId].channel = meta.channel;
        chrome.storage.local.set({ watched_videos: watched });
      }
    });
  }

  if (changedWl) {
    chrome.storage.local.get(["watch_later"], (res) => {
      const wl = res.watch_later || {};
      if (wl[videoId]) {
        wl[videoId].title = meta.title;
        if (meta.channel) wl[videoId].channel = meta.channel;
        chrome.storage.local.set({ watch_later: wl });
      }
    });
  }
}

function applyCardState(card, videoId, isWatched, isWatchLater) {
  card.dataset.alreadySeenId = videoId;
  card.dataset.alreadySeenWatched = isWatched ? "true" : "false";
  card.dataset.alreadySeenWl = isWatchLater ? "true" : "false";
  card.dataset.alreadySeenLang = settings.language;

  applyCardClasses(card, isWatched);
  renderBadge(card, isWatched, isWatchLater);
  maybeEnrichMetadata(videoId, card);
}

function processCard(card) {
  const videoId = findVideoIdInCard(card);
  if (!videoId) return;

  const isWatched = watchedMap.has(videoId);
  const isWatchLater = watchLaterMap.has(videoId);
  const previousId = card.dataset.alreadySeenId;
  const previousWatched = card.dataset.alreadySeenWatched === "true";
  const previousWl = card.dataset.alreadySeenWl === "true";
  const previousLang = card.dataset.alreadySeenLang;
  const hasBadgeGroup = Boolean(card.querySelector(".as-badge-group"));

  if (
    previousId === videoId &&
    previousWatched === isWatched &&
    previousWl === isWatchLater &&
    previousLang === settings.language &&
    hasBadgeGroup
  ) {
    applyCardClasses(card, isWatched);
    return;
  }

  applyCardState(card, videoId, isWatched, isWatchLater);
}

function processAllCards() {
  const elements = document.querySelectorAll(CARD_SELECTORS);
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.tagName.toLowerCase() === "yt-lockup-view-model") {
      const parent = el.closest(
        "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer"
      );
      if (parent) continue;
    }
    processCard(el);
  }
}

function updateCardsForVideoId(videoId) {
  const isWatched = watchedMap.has(videoId);
  const isWatchLater = watchLaterMap.has(videoId);
  const elements = document.querySelectorAll(CARD_SELECTORS);
  for (let i = 0; i < elements.length; i++) {
    const card = elements[i];
    if (card.dataset.alreadySeenId === videoId || findVideoIdInCard(card) === videoId) {
      applyCardState(card, videoId, isWatched, isWatchLater);
    }
  }
  updateChannelProgress();
  syncShortsBadge();
}

function toggleVideoWatched(videoId, source = "manual", metadata = {}) {
  if (!videoId) return;
  const willBeWatched = !watchedMap.has(videoId);

  if (willBeWatched) {
    const existing = watchedMap.get(videoId) || {};
    watchedMap.set(videoId, {
      timestamp: Date.now(),
      source: source,
      title: metadata.title || existing.title || "",
      channel: metadata.channel || existing.channel || ""
    });
  } else {
    watchedMap.delete(videoId);
  }

  updateCardsForVideoId(videoId);

  if (!isExtensionValid()) {
    queuePendingAction("toggleWatched", videoId, metadata, source);
    showReloadNotice();
    return;
  }

  try {
    chrome.storage.local.get(["watched_videos"], (result) => {
      if (chrome.runtime.lastError || !isExtensionValid()) {
        queuePendingAction("toggleWatched", videoId, metadata, source);
        showReloadNotice();
        return;
      }
      const watched = (result && result.watched_videos) || {};
      if (willBeWatched) {
        const existing = watched[videoId] || {};
        watched[videoId] = {
          timestamp: Date.now(),
          source: source,
          title: metadata.title || existing.title || "",
          channel: metadata.channel || existing.channel || ""
        };
      } else {
        delete watched[videoId];
      }
      chrome.storage.local.set({ watched_videos: watched }, () => {
        if (chrome.runtime.lastError) {
          queuePendingAction("toggleWatched", videoId, metadata, source);
          showReloadNotice();
          return;
        }
        if (willBeWatched && (!metadata.title || !metadata.channel)) {
          chrome.runtime.sendMessage({ type: "FETCH_METADATA", videoId }, (res) => {
            if (chrome.runtime.lastError || !res) return;
            if (res.success && (res.title || res.channel)) {
              chrome.storage.local.get(["watched_videos"], (wRes) => {
                if (chrome.runtime.lastError || !wRes) return;
                const w = wRes.watched_videos || {};
                if (w[videoId]) {
                  if (res.title) w[videoId].title = res.title;
                  if (res.channel) w[videoId].channel = res.channel;
                  chrome.storage.local.set({ watched_videos: w });
                }
              });
            }
          });
        }
      });
    });
  } catch (err) {
    queuePendingAction("toggleWatched", videoId, metadata, source);
    showReloadNotice();
  }
}

function toggleWatchLater(videoId, metadata = {}) {
  if (!videoId) return;
  const willBeSaved = !watchLaterMap.has(videoId);

  if (willBeSaved) {
    const existing = watchLaterMap.get(videoId) || {};
    watchLaterMap.set(videoId, {
      timestamp: Date.now(),
      title: metadata.title || existing.title || "",
      channel: metadata.channel || existing.channel || ""
    });
  } else {
    watchLaterMap.delete(videoId);
  }

  updateCardsForVideoId(videoId);

  if (!isExtensionValid()) {
    queuePendingAction("toggleWatchLater", videoId, metadata, "manual");
    showReloadNotice();
    return;
  }

  try {
    chrome.storage.local.get(["watch_later"], (result) => {
      if (chrome.runtime.lastError || !isExtensionValid()) {
        queuePendingAction("toggleWatchLater", videoId, metadata, "manual");
        showReloadNotice();
        return;
      }
      const list = (result && result.watch_later) || {};
      if (willBeSaved) {
        const existing = list[videoId] || {};
        list[videoId] = {
          timestamp: Date.now(),
          title: metadata.title || existing.title || "",
          channel: metadata.channel || existing.channel || ""
        };
      } else {
        delete list[videoId];
      }
      chrome.storage.local.set({ watch_later: list }, () => {
        if (chrome.runtime.lastError) {
          queuePendingAction("toggleWatchLater", videoId, metadata, "manual");
          showReloadNotice();
          return;
        }
        if (willBeSaved && (!metadata.title || !metadata.channel)) {
          chrome.runtime.sendMessage({ type: "FETCH_METADATA", videoId }, (res) => {
            if (chrome.runtime.lastError || !res) return;
            if (res.success && (res.title || res.channel)) {
              chrome.storage.local.get(["watch_later"], (wlRes) => {
                if (chrome.runtime.lastError || !wlRes) return;
                const wl = wlRes.watch_later || {};
                if (wl[videoId]) {
                  if (res.title) wl[videoId].title = res.title;
                  if (res.channel) wl[videoId].channel = res.channel;
                  chrome.storage.local.set({ watch_later: wl });
                }
              });
            }
          });
        }
      });
    });
  } catch (err) {
    queuePendingAction("toggleWatchLater", videoId, metadata, "manual");
    showReloadNotice();
  }
}

function getActiveVideoElement() {
  if (window.location.pathname.startsWith("/shorts")) {
    return (
      document.querySelector("ytd-reel-video-renderer[is-active] video") ||
      document.querySelector("ytd-shorts [aria-hidden='false'] video") ||
      document.querySelector("ytd-reel-video-renderer video") ||
      document.querySelector("video")
    );
  }
  return (
    document.querySelector("#movie_player video") ||
    document.querySelector("ytd-watch-flexy video") ||
    document.querySelector("video.html5-main-video") ||
    document.querySelector("video")
  );
}

function isAdPlaying() {
  return Boolean(
    document.querySelector(".ad-showing, .ad-interrupting, .html5-video-player.ad-showing")
  );
}

function checkPlaybackProgress() {
  const activeVideoId = extractVideoId(window.location.href);
  if (!activeVideoId) return;

  const isWatched = watchedMap.has(activeVideoId);

  if (!settings.autoMarkEnabled || isWatched) return;
  if (isAdPlaying()) return;

  const video = getActiveVideoElement();
  if (!video || !video.duration || isNaN(video.duration) || !isFinite(video.duration) || video.duration <= 0) return;

  const progress = video.currentTime / video.duration;
  if (progress >= settings.autoMarkThreshold) {
    const pageMeta = extractPageMetadata();
    const entry = {
      timestamp: Date.now(),
      source: "auto",
      title: pageMeta.title || "",
      channel: pageMeta.channel || ""
    };
    watchedMap.set(activeVideoId, entry);
    updateCardsForVideoId(activeVideoId);

    if (!isExtensionValid()) {
      queuePendingAction("toggleWatched", activeVideoId, entry, "auto");
      return;
    }

    try {
      chrome.storage.local.get(["watched_videos"], (result) => {
        if (chrome.runtime.lastError || !isExtensionValid()) {
          queuePendingAction("toggleWatched", activeVideoId, entry, "auto");
          return;
        }
        const watched = (result && result.watched_videos) || {};
        watched[activeVideoId] = entry;
        chrome.storage.local.set({ watched_videos: watched });
      });
    } catch (e) {
      queuePendingAction("toggleWatched", activeVideoId, entry, "auto");
    }
  }
}

function attachPlaybackTracking() {
  const video = getActiveVideoElement();
  if (!video) return;

  if (currentTrackedVideo !== video) {
    if (currentTrackedVideo) {
      currentTrackedVideo.removeEventListener("timeupdate", checkPlaybackProgress);
    }
    currentTrackedVideo = video;
    video.addEventListener("timeupdate", checkPlaybackProgress);
  }
}

function syncInlinePreviewBadge() {
  const inlinePreview = document.querySelector("ytd-inline-preview-player, #inline-preview-player");
  if (!inlinePreview) return;

  const card =
    inlinePreview.closest(
      "ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model"
    ) ||
    document.querySelector(
      "ytd-rich-item-renderer:hover, ytd-grid-video-renderer:hover, ytd-video-renderer:hover, ytd-compact-video-renderer:hover, yt-lockup-view-model:hover"
    );
  if (!card) return;

  const videoId = card.dataset.alreadySeenId || findVideoIdInCard(card);
  if (!videoId) return;

  const isWatched = watchedMap.has(videoId);
  const isWatchLater = watchLaterMap.has(videoId);

  let group = inlinePreview.querySelector(":scope > .as-badge-group");

  if (!group) {
    group = document.createElement("div");
    group.className = "as-badge-group";

    const badge = document.createElement("div");
    badge.className = "as-badge";
    badge.setAttribute("role", "button");
    badge.setAttribute("tabindex", "0");

    const iconSpan = document.createElement("span");
    iconSpan.className = "as-badge-icon";

    const labelSpan = document.createElement("span");
    labelSpan.className = "as-badge-label";

    badge.appendChild(iconSpan);
    badge.appendChild(labelSpan);

    badge.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentId = group.dataset.previewVideoId;
      if (currentId) {
        const metadata = extractCardMetadata(card);
        toggleVideoWatched(currentId, "manual", metadata);
      }
    });

    badge.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    badge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        const currentId = group.dataset.previewVideoId;
        if (currentId) {
          const metadata = extractCardMetadata(card);
          toggleVideoWatched(currentId, "manual", metadata);
        }
      }
    });

    const wlBadge = document.createElement("div");
    wlBadge.className = "as-watch-later-badge";
    wlBadge.setAttribute("role", "button");
    wlBadge.setAttribute("tabindex", "0");
    wlBadge.appendChild(createClockSvg());

    wlBadge.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentId = group.dataset.previewVideoId;
      if (currentId) {
        const metadata = extractCardMetadata(card);
        toggleWatchLater(currentId, metadata);
      }
    });

    wlBadge.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    wlBadge.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        const currentId = group.dataset.previewVideoId;
        if (currentId) {
          const metadata = extractCardMetadata(card);
          toggleWatchLater(currentId, metadata);
        }
      }
    });

    if (window.getComputedStyle(inlinePreview).position === "static") {
      inlinePreview.style.position = "relative";
    }

    group.appendChild(badge);
    group.appendChild(wlBadge);
    inlinePreview.appendChild(group);
  }

  group.dataset.previewVideoId = videoId;
  const isRu = settings.language === "ru";
  const badge = group.querySelector(".as-badge");
  const wlBadge = group.querySelector(".as-watch-later-badge");

  if (badge) {
    const label = badge.querySelector(".as-badge-label");
    if (label) {
      label.textContent = isRu ? "ПРОСМОТРЕНО" : "SEEN";
    }

    const icon = badge.querySelector(".as-badge-icon");

    if (isWatched) {
      badge.classList.add("as-badge-watched");
      if (icon) {
        icon.textContent = "";
        icon.appendChild(createCheckSvg());
      }
      badge.title = isRu ? "Отметить как непросмотренное" : "Mark as unwatched";
      badge.setAttribute("aria-pressed", "true");
    } else {
      badge.classList.remove("as-badge-watched");
      if (icon) {
        icon.textContent = "";
        icon.appendChild(createPlusSvg());
      }
      badge.title = isRu ? "Отметить как просмотренное" : "Mark as watched";
      badge.setAttribute("aria-pressed", "false");
    }
  }

  if (wlBadge) {
    if (isWatchLater) {
      wlBadge.classList.add("as-wl-active");
      wlBadge.title = isRu ? "Удалить из «Смотреть позже»" : "Remove from Watch Later";
      wlBadge.setAttribute("aria-pressed", "true");
    } else {
      wlBadge.classList.remove("as-wl-active");
      wlBadge.title = isRu ? "Смотреть позже" : "Watch Later";
      wlBadge.setAttribute("aria-pressed", "false");
    }
  }
}

function isShortsPage() {
  return window.location.pathname.startsWith("/shorts");
}

function isEngagementPanelOpen() {
  const panels = document.querySelectorAll("ytd-engagement-panel-section-list-renderer");
  for (let i = 0; i < panels.length; i++) {
    if (panels[i].getAttribute("visibility") === "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED") return true;
  }
  return false;
}

function removeShortsBadge() {
  const existing = document.getElementById("as-shorts-badge");
  if (existing) existing.remove();
}

function createShortsBadge() {
  const group = document.createElement("div");
  group.id = "as-shorts-badge";
  group.className = "as-badge-group as-shorts-badge-group";

  const toggleCurrent = (action) => {
    const currentId = extractVideoId(window.location.href);
    if (!currentId) return;
    const metadata = extractPageMetadata();
    if (action === "watched") {
      toggleVideoWatched(currentId, "manual", metadata);
    } else {
      toggleWatchLater(currentId, metadata);
    }
  };

  const bindButton = (el, action) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleCurrent(action);
    });
    el.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        toggleCurrent(action);
      }
    });
  };

  const badge = document.createElement("div");
  badge.className = "as-badge";
  badge.setAttribute("role", "button");
  badge.setAttribute("tabindex", "0");
  const iconSpan = document.createElement("span");
  iconSpan.className = "as-badge-icon";
  const labelSpan = document.createElement("span");
  labelSpan.className = "as-badge-label";
  badge.appendChild(iconSpan);
  badge.appendChild(labelSpan);
  bindButton(badge, "watched");

  const wlBadge = document.createElement("div");
  wlBadge.className = "as-watch-later-badge";
  wlBadge.setAttribute("role", "button");
  wlBadge.setAttribute("tabindex", "0");
  wlBadge.appendChild(createClockSvg());
  bindButton(wlBadge, "watchLater");

  group.appendChild(badge);
  group.appendChild(wlBadge);
  document.body.appendChild(group);
  return group;
}

function syncShortsBadge() {
  if (!isShortsPage() || !document.body) {
    removeShortsBadge();
    return;
  }

  const videoId = extractVideoId(window.location.href);
  const video = getActiveVideoElement();
  const rect = video ? video.getBoundingClientRect() : null;
  const group = document.getElementById("as-shorts-badge") || createShortsBadge();

  if (!videoId || !rect || rect.width === 0 || rect.height === 0 || isEngagementPanelOpen()) {
    group.classList.add("as-shorts-hidden");
    return;
  }

  group.classList.remove("as-shorts-hidden");
  group.style.setProperty("--as-shorts-left", `${Math.round(rect.right + 16)}px`);
  group.style.setProperty("--as-shorts-top", `${Math.round(Math.max(rect.top + 8, 64))}px`);

  const isWatched = watchedMap.has(videoId);
  const isWatchLater = watchLaterMap.has(videoId);
  const isRu = settings.language === "ru";
  const badge = group.querySelector(".as-badge");
  const wlBadge = group.querySelector(".as-watch-later-badge");

  if (badge) {
    const label = badge.querySelector(".as-badge-label");
    if (label) {
      label.textContent = isRu ? "ПРОСМОТРЕНО" : "SEEN";
    }
    const icon = badge.querySelector(".as-badge-icon");
    const wantCheck = isWatched;
    if (icon && icon.dataset.state !== (wantCheck ? "check" : "plus")) {
      icon.textContent = "";
      icon.appendChild(wantCheck ? createCheckSvg() : createPlusSvg());
      icon.dataset.state = wantCheck ? "check" : "plus";
    }
    badge.classList.toggle("as-badge-watched", isWatched);
    badge.title = isWatched
      ? (isRu ? "Отметить как непросмотренное" : "Mark as unwatched")
      : (isRu ? "Отметить как просмотренное" : "Mark as watched");
    badge.setAttribute("aria-pressed", isWatched ? "true" : "false");
  }

  if (wlBadge) {
    wlBadge.classList.toggle("as-wl-active", isWatchLater);
    wlBadge.title = isWatchLater
      ? (isRu ? "Удалить из «Смотреть позже»" : "Remove from Watch Later")
      : (isRu ? "Смотреть позже" : "Watch Later");
    wlBadge.setAttribute("aria-pressed", isWatchLater ? "true" : "false");
  }
}

function scheduleCardScan() {
  if (mutationFrameId) {
    cancelAnimationFrame(mutationFrameId);
  }
  mutationFrameId = requestAnimationFrame(() => {
    mutationFrameId = null;
    processAllCards();
    syncInlinePreviewBadge();
    syncShortsBadge();
    if (window.location.pathname.startsWith("/watch") || window.location.pathname.startsWith("/shorts")) {
      attachPlaybackTracking();
    }
    updateChannelProgress();
  });
}

function init() {
  if (!isExtensionValid()) return;
  flushPendingActions();

  chrome.storage.local.get(["watched_videos", "watch_later", "settings"], (result) => {
    const watched = result.watched_videos || {};
    watchedMap.clear();
    for (const id in watched) {
      if (Object.prototype.hasOwnProperty.call(watched, id)) {
        watchedMap.set(id, watched[id]);
      }
    }

    const watchLater = result.watch_later || {};
    watchLaterMap.clear();
    for (const id in watchLater) {
      if (Object.prototype.hasOwnProperty.call(watchLater, id)) {
        watchLaterMap.set(id, watchLater[id]);
      }
    }

    if (result.settings) {
      settings = Object.assign({}, DEFAULT_SETTINGS, result.settings);
    } else {
      settings = Object.assign({}, DEFAULT_SETTINGS);
    }

    if (typeof settings.dimOpacity === "number") {
      document.documentElement.style.setProperty("--as-dim-opacity", String(settings.dimOpacity));
    }

    processAllCards();
    attachPlaybackTracking();
    updateChannelProgress();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;

    let shouldRescan = false;

    if (changes.watched_videos) {
      const updated = changes.watched_videos.newValue || {};
      watchedMap.clear();
      for (const id in updated) {
        if (Object.prototype.hasOwnProperty.call(updated, id)) {
          watchedMap.set(id, updated[id]);
        }
      }
      shouldRescan = true;
    }

    if (changes.watch_later) {
      const updated = changes.watch_later.newValue || {};
      watchLaterMap.clear();
      for (const id in updated) {
        if (Object.prototype.hasOwnProperty.call(updated, id)) {
          watchLaterMap.set(id, updated[id]);
        }
      }
      shouldRescan = true;
    }

    if (changes.settings) {
      settings = Object.assign({}, DEFAULT_SETTINGS, changes.settings.newValue);
      if (typeof settings.dimOpacity === "number") {
        document.documentElement.style.setProperty("--as-dim-opacity", String(settings.dimOpacity));
      }
      shouldRescan = true;
    }

    if (shouldRescan) {
      processAllCards();
      syncInlinePreviewBadge();
      syncShortsBadge();
      updateChannelProgress();
    }
  });

  const observer = new MutationObserver(() => {
    scheduleCardScan();
  });

  const targetNode = document.body || document.documentElement;
  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });

  window.addEventListener("yt-navigate-finish", () => {
    attachPlaybackTracking();
    scheduleCardScan();
    checkPlaybackProgress();
  });

  window.addEventListener("yt-page-data-updated", () => {
    attachPlaybackTracking();
    scheduleCardScan();
    checkPlaybackProgress();
  });

  window.addEventListener("popstate", () => {
    attachPlaybackTracking();
    scheduleCardScan();
    checkPlaybackProgress();
  });

  const playbackIntervalId = setInterval(() => {
    if (window.location.pathname.startsWith("/watch") || window.location.pathname.startsWith("/shorts")) {
      attachPlaybackTracking();
      checkPlaybackProgress();
    }
  }, 1000);

  const shortsIntervalId = setInterval(syncShortsBadge, 400);
  window.addEventListener("resize", syncShortsBadge);

  window.__ALREADY_SEEN_TEARDOWN__ = () => {
    try {
      if (observer) observer.disconnect();
      if (playbackIntervalId) clearInterval(playbackIntervalId);
      if (shortsIntervalId) clearInterval(shortsIntervalId);
      window.removeEventListener("resize", syncShortsBadge);
      removeShortsBadge();
    } catch (e) {}
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
