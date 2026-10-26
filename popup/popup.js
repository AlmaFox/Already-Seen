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

const TRANSLATIONS = {
  en: {
    subtitle: "YouTube Watch Tracker",
    watchedVideos: "Watched",
    watchLaterVideos: "Watch Later",
    dashboard: "Open Video Dashboard",
    dimTitle: "Dim Watched",
    dimDesc: "Fade out thumbnails of seen videos",
    opacityTitle: "Dimming Opacity",
    opacityDesc: "Lower value is more transparent",
    hideTitle: "Hide Watched",
    hideDesc: "Completely remove seen videos from view",
    autoTitle: "Auto-mark on Playback",
    autoDesc: "Mark watched when playback threshold is reached",
    thresholdTitle: "Auto-mark Threshold",
    thresholdDesc: "Required progress to mark seen",
    badgeCounterTitle: "Icon Counter",
    badgeCounterDesc: "Show watched count badge on extension icon",
    channelProgressTitle: "Channel Progress",
    channelProgressDesc: "Show watched progress bar on channel pages",
    exportBtn: "Export JSON",
    importBtn: "Import JSON",
    noVideos: "No videos to export.",
    exported: "Exported {count} videos.",
    invalidJson: "Invalid JSON backup file format.",
    imported: "Imported {count} items.",
    parseError: "Error parsing JSON file."
  },
  ru: {
    subtitle: "Трекер просмотров YouTube",
    watchedVideos: "Просмотрено",
    watchLaterVideos: "Смотреть позже",
    dashboard: "Открыть сайт со списками",
    dimTitle: "Затемнять просмотренные",
    dimDesc: "Уменьшать яркость превью просмотренных видео",
    opacityTitle: "Прозрачность затемнения",
    opacityDesc: "Меньше значение — сильнее прозрачность",
    hideTitle: "Скрывать просмотренные",
    hideDesc: "Полностью убирать просмотренные видео из ленты",
    autoTitle: "Отмечать при просмотре",
    autoDesc: "Отмечать после достижения порога воспроизведения",
    thresholdTitle: "Порог автоотметки",
    thresholdDesc: "Процент воспроизведения для отметки",
    badgeCounterTitle: "Счётчик на иконке",
    badgeCounterDesc: "Отображать количество просмотренных на значке",
    channelProgressTitle: "Прогресс на каналах",
    channelProgressDesc: "Показывать полоску просмотренных видео на страницах каналов",
    exportBtn: "Экспорт JSON",
    importBtn: "Импорт JSON",
    noVideos: "Нет видео для экспорта.",
    exported: "Экспортировано {count} видео.",
    invalidJson: "Неверный формат файла резервной копии JSON.",
    imported: "Импортировано {count} записей.",
    parseError: "Ошибка чтения файла JSON."
  }
};

let currentLang = "ru";

const totalCount = document.getElementById("totalCount");
const totalWatchLaterCount = document.getElementById("totalWatchLaterCount");
const btnOpenDashboard = document.getElementById("btnOpenDashboard");
const toggleDim = document.getElementById("toggleDim");
const rangeOpacity = document.getElementById("rangeOpacity");
const valOpacity = document.getElementById("valOpacity");
const toggleHide = document.getElementById("toggleHide");
const toggleAuto = document.getElementById("toggleAuto");
const rangeThreshold = document.getElementById("rangeThreshold");
const valThreshold = document.getElementById("valThreshold");
const toggleBadgeCounter = document.getElementById("toggleBadgeCounter");
const toggleChannelProgress = document.getElementById("toggleChannelProgress");
const btnExport = document.getElementById("btnExport");
const btnImport = document.getElementById("btnImport");
const fileInput = document.getElementById("fileInput");
const toast = document.getElementById("toast");

let toastTimeout = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function updateCounters(watchedCount, watchLaterCount) {
  if (typeof watchedCount === "number") {
    totalCount.textContent = watchedCount.toLocaleString();
  }
  if (typeof watchLaterCount === "number") {
    totalWatchLaterCount.textContent = watchLaterCount.toLocaleString();
  }
}

function applyLanguage(lang) {
  currentLang = lang === "en" ? "en" : "ru";
  const dict = TRANSLATIONS[currentLang];

  document.getElementById("i18nSubtitle").textContent = dict.subtitle;
  document.getElementById("i18nWatchedVideos").textContent = dict.watchedVideos;
  document.getElementById("i18nWatchLaterVideos").textContent = dict.watchLaterVideos;
  document.getElementById("i18nDashboard").textContent = dict.dashboard;
  document.getElementById("i18nDimTitle").textContent = dict.dimTitle;
  document.getElementById("i18nDimDesc").textContent = dict.dimDesc;
  document.getElementById("i18nOpacityTitle").textContent = dict.opacityTitle;
  document.getElementById("i18nOpacityDesc").textContent = dict.opacityDesc;
  document.getElementById("i18nHideTitle").textContent = dict.hideTitle;
  document.getElementById("i18nHideDesc").textContent = dict.hideDesc;
  document.getElementById("i18nAutoTitle").textContent = dict.autoTitle;
  document.getElementById("i18nAutoDesc").textContent = dict.autoDesc;
  document.getElementById("i18nThresholdTitle").textContent = dict.thresholdTitle;
  document.getElementById("i18nThresholdDesc").textContent = dict.thresholdDesc;
  document.getElementById("i18nBadgeCounterTitle").textContent = dict.badgeCounterTitle;
  document.getElementById("i18nBadgeCounterDesc").textContent = dict.badgeCounterDesc;
  document.getElementById("i18nChannelProgressTitle").textContent = dict.channelProgressTitle;
  document.getElementById("i18nChannelProgressDesc").textContent = dict.channelProgressDesc;
  document.getElementById("i18nExport").textContent = dict.exportBtn;
  document.getElementById("i18nImport").textContent = dict.importBtn;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function loadState() {
  chrome.storage.local.get(["watched_videos", "watch_later", "settings"], (data) => {
    const watched = data.watched_videos || {};
    const watchLater = data.watch_later || {};
    updateCounters(Object.keys(watched).length, Object.keys(watchLater).length);

    const currentSettings = Object.assign({}, DEFAULT_SETTINGS, data.settings);

    const detectedLang = currentSettings.language || (navigator.language && navigator.language.startsWith("ru") ? "ru" : "en");
    applyLanguage(detectedLang);

    toggleDim.checked = Boolean(currentSettings.dimWatched);
    toggleHide.checked = Boolean(currentSettings.hideWatched);
    toggleAuto.checked = Boolean(currentSettings.autoMarkEnabled);
    toggleBadgeCounter.checked = currentSettings.showBadgeCounter !== false;
    toggleChannelProgress.checked = currentSettings.showChannelProgress !== false;

    const opacityPct = Math.round((currentSettings.dimOpacity || 0.35) * 100);
    rangeOpacity.value = opacityPct;
    valOpacity.textContent = `${opacityPct}%`;

    const thresholdPct = Math.round((currentSettings.autoMarkThreshold || 0.8) * 100);
    rangeThreshold.value = thresholdPct;
    valThreshold.textContent = `${thresholdPct}%`;
  });
}

function saveSettings(partial) {
  chrome.storage.local.get(["settings"], (data) => {
    const updated = Object.assign({}, DEFAULT_SETTINGS, data.settings, partial);
    chrome.storage.local.set({ settings: updated });
  });
}

btnOpenDashboard.addEventListener("click", () => {
  const url = chrome.runtime.getURL("dashboard/index.html");
  chrome.tabs.create({ url });
});

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    applyLanguage(lang);
    saveSettings({ language: lang });
  });
});

toggleDim.addEventListener("change", () => {
  saveSettings({ dimWatched: toggleDim.checked });
});

toggleHide.addEventListener("change", () => {
  saveSettings({ hideWatched: toggleHide.checked });
});

toggleAuto.addEventListener("change", () => {
  saveSettings({ autoMarkEnabled: toggleAuto.checked });
});

rangeOpacity.addEventListener("input", () => {
  valOpacity.textContent = `${rangeOpacity.value}%`;
});

rangeOpacity.addEventListener("change", () => {
  saveSettings({ dimOpacity: Number(rangeOpacity.value) / 100 });
});

rangeThreshold.addEventListener("input", () => {
  valThreshold.textContent = `${rangeThreshold.value}%`;
});

rangeThreshold.addEventListener("change", () => {
  saveSettings({ autoMarkThreshold: Number(rangeThreshold.value) / 100 });
});

toggleBadgeCounter.addEventListener("change", () => {
  saveSettings({ showBadgeCounter: toggleBadgeCounter.checked });
});

toggleChannelProgress.addEventListener("change", () => {
  saveSettings({ showChannelProgress: toggleChannelProgress.checked });
});

btnExport.addEventListener("click", () => {
  const dict = TRANSLATIONS[currentLang];
  chrome.storage.local.get(["watched_videos", "watch_later"], (data) => {
    const watched = data.watched_videos || {};
    const watchLater = data.watch_later || {};
    const watchedCount = Object.keys(watched).length;
    const wlCount = Object.keys(watchLater).length;

    if (watchedCount === 0 && wlCount === 0) {
      showToast(dict.noVideos);
      return;
    }

    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      watched_videos: watched,
      watch_later: watchLater
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `already-seen-backup-${dateStr}.json`;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(dict.exported.replace("{count}", watchedCount + wlCount));
  });
});

btnImport.addEventListener("click", () => {
  fileInput.value = "";
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const dict = TRANSLATIONS[currentLang];
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      let importedCount = 0;

      chrome.storage.local.get(["watched_videos", "watch_later"], (data) => {
        const watched = data.watched_videos || {};
        const watchLater = data.watch_later || {};

        if (parsed && typeof parsed === "object" && (parsed.watched_videos || parsed.watch_later)) {
          if (parsed.watched_videos && typeof parsed.watched_videos === "object") {
            for (const [id, value] of Object.entries(parsed.watched_videos)) {
              if (typeof id === "string" && id.length === 11) {
                if (!watched[id]) importedCount++;
                watched[id] = {
                  timestamp: value && value.timestamp ? value.timestamp : Date.now(),
                  source: value && value.source ? value.source : "manual",
                  title: value && value.title ? value.title : "",
                  channel: value && value.channel ? value.channel : ""
                };
              }
            }
          }
          if (parsed.watch_later && typeof parsed.watch_later === "object") {
            for (const [id, value] of Object.entries(parsed.watch_later)) {
              if (typeof id === "string" && id.length === 11) {
                if (!watchLater[id]) importedCount++;
                watchLater[id] = {
                  timestamp: value && value.timestamp ? value.timestamp : Date.now(),
                  title: value && value.title ? value.title : "",
                  channel: value && value.channel ? value.channel : ""
                };
              }
            }
          }
        } else if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (typeof item === "string" && item.length === 11) {
              if (!watched[item]) importedCount++;
              watched[item] = { timestamp: Date.now(), source: "manual" };
            } else if (item && typeof item === "object" && item.id) {
              if (!watched[item.id]) importedCount++;
              watched[item.id] = {
                timestamp: item.timestamp || Date.now(),
                source: item.source || "manual",
                title: item.title || "",
                channel: item.channel || ""
              };
            }
          }
        } else if (parsed && typeof parsed === "object") {
          for (const [id, value] of Object.entries(parsed)) {
            if (typeof id === "string" && id.length === 11) {
              if (!watched[id]) importedCount++;
              watched[id] = {
                timestamp: value && value.timestamp ? value.timestamp : Date.now(),
                source: value && value.source ? value.source : "manual",
                title: value && value.title ? value.title : "",
                channel: value && value.channel ? value.channel : ""
              };
            }
          }
        } else {
          showToast(dict.invalidJson);
          return;
        }

        chrome.storage.local.set({ watched_videos: watched, watch_later: watchLater }, () => {
          updateCounters(Object.keys(watched).length, Object.keys(watchLater).length);
          showToast(dict.imported.replace("{count}", importedCount));
        });
      });
    } catch (err) {
      showToast(dict.parseError);
    }
  };
  reader.readAsText(file);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local") return;
  if (changes.watched_videos) {
    const watched = changes.watched_videos.newValue || {};
    updateCounters(Object.keys(watched).length, undefined);
  }
  if (changes.watch_later) {
    const watchLater = changes.watch_later.newValue || {};
    updateCounters(undefined, Object.keys(watchLater).length);
  }
  if (changes.settings && changes.settings.newValue && changes.settings.newValue.language) {
    applyLanguage(changes.settings.newValue.language);
  }
});

document.addEventListener("DOMContentLoaded", loadState);
