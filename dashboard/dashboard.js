const TRANSLATIONS = {
  en: {
    tagline: "Video collection & watch lists",
    statWatched: "Watched:",
    statWl: "Watch Later:",
    statTotal: "Total:",
    searchPlaceholder: "Search by title or channel...",
    tabAll: "All",
    tabWatched: "Watched",
    tabWatchLater: "Watch Later",
    sortLabel: "Sort:",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    sortTitleAsc: "Title (A-Z)",
    sortTitleDesc: "Title (Z-A)",
    sortChannelAsc: "Channel (A-Z)",
    btnFetch: "Fetch Titles",
    btnExport: "Export",
    btnImport: "Import",
    btnClear: "Clear",
    dangerTitle: "Danger Zone",
    dangerDesc: "Permanently delete all saved watched and watch later history.",
    btnClearAll: "Clear entire database",
    clearStep1Badge: "Step 1 of 3",
    clearStep1Title: "Clear entire database?",
    clearStep1Text: "You are about to delete all saved videos from Already Seen. Watched and Watch Later lists, as well as your statistics, will be permanently cleared.",
    clearStep1CountLabel: "Total videos to delete:",
    clearStep1Next: "Continue (1/3)",
    clearStep2Badge: "Step 2 of 3",
    clearStep2Title: "Warning: irreversible action",
    clearStep2Text: "This action cannot be undone. All marks will disappear. We recommend downloading a backup copy before proceeding.",
    clearStep2Next: "I understand the risks (2/3)",
    clearStep3Badge: "Step 3 of 3",
    clearStep3Title: "Final confirmation",
    clearStep3Text: "To confirm permanent deletion of all data, enter the word {word} in the field below:",
    clearStep3Final: "Permanently delete all (3/3)",
    modalBackupBtn: "Download backup JSON",
    btnCancel: "Cancel",
    emptyAlready: "The database is already empty.",
    loading: "Loading videos...",
    emptyAllTitle: "No saved videos yet",
    emptyAllDesc: "Mark videos as watched (+) or save them for later (clock) while browsing YouTube.",
    emptyWatchedTitle: "No watched videos",
    emptyWatchedDesc: "Videos marked with the (+) button or watched on YouTube will appear here.",
    emptyWlTitle: "Watch Later is empty",
    emptyWlDesc: "Click the clock icon on any YouTube video thumbnail to save it here for later.",
    emptySearchTitle: "Nothing found",
    emptySearchDesc: "Try searching for a different keyword or clear your query.",
    btnEmptyYouTube: "Browse YouTube",
    markWatched: "Watched",
    markUnwatched: "Mark unwatched",
    saveWl: "Watch Later",
    removeWl: "Remove from Watch Later",
    openYouTube: "Open on YouTube",
    deleteVideo: "Delete video",
    confirmDelete: "Remove this video from your lists?",
    confirmClear: "Are you sure you want to delete all saved video history? This cannot be undone.",
    clearedAll: "All videos have been removed.",
    exported: "Exported {count} videos.",
    imported: "Imported {count} items successfully.",
    invalidJson: "Invalid backup JSON format.",
    readError: "Error reading file.",
    fetchComplete: "All titles and channels updated successfully!",
    tabStats: "Statistics",
    statCardWatched: "Watched",
    statCardWl: "Watch Later",
    statCardTotal: "Total Saved",
    statCardTime: "Estimated Time",
    subWatchedAll: "All saved videos watched (100%)",
    subWatchedProgress: "{count} of {total} watched • {remain} left",
    subWatchedEmpty: "No videos saved yet",
    subWlEmpty: "Watch later list is empty",
    subWlPending: "{count} pending to watch",
    subWlAllWatched: "All queued videos already watched",
    subTotal: "Unique videos in database",
    subTime: "Content watched",
    topChannelsTitle: "Top Channels",
    topChannelsSub: "Creators you save the most",
    uniqueChannelsBadge: "{count} channels",
    noChannelsYet: "No channel data yet",
    activityDayTitle: "Activity by Day of Week",
    activityDaySubAll: "When you mark videos most often (All-time)",
    activityDaySubWeek: "Videos marked this week",
    btnChartWeek: "This week",
    btnChartAll: "All-time",
    todayBadge: "Today",
    peakDayPrefixWeek: "Week peak: ",
    peakDayPrefix: "Peak: ",
    periodToday: "Today:",
    periodWeek: "Last 7 days:",
    periodMonth: "Last 30 days:",
    periodOlder: "Earlier:",
    hoursShort: "h",
    minsShort: "m",
    videosCountSuffix: " videos",
    daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  ru: {
    tagline: "Списки просмотренных и сохранённых видео",
    statWatched: "Просмотрено:",
    statWl: "Смотреть позже:",
    statTotal: "Всего:",
    searchPlaceholder: "Поиск по названию или каналу...",
    tabAll: "Все",
    tabWatched: "Просмотренные",
    tabWatchLater: "Смотреть позже",
    sortLabel: "Сортировка:",
    sortNewest: "Сначала новые",
    sortOldest: "Сначала старые",
    sortTitleAsc: "По названию (А-Я)",
    sortTitleDesc: "По названию (Я-А)",
    sortChannelAsc: "По каналу (А-Я)",
    btnFetch: "Подтянуть названия",
    btnExport: "Экспорт",
    btnImport: "Импорт",
    btnClear: "Очистить",
    dangerTitle: "Опасная зона",
    dangerDesc: "Безвозвратное удаление всей сохранённой истории и очередей",
    btnClearAll: "Очистить всю базу",
    clearStep1Badge: "Шаг 1 из 3",
    clearStep1Title: "Удалить всю базу данных?",
    clearStep1Text: "Вы собираетесь удалить все сохранённые видео из базы расширения Already Seen. Списки «Просмотрено» и «Смотреть позже», а также статистика будут сброшены.",
    clearStep1CountLabel: "Всего видео к удалению:",
    clearStep1Next: "Продолжить (1/3)",
    clearStep2Badge: "Шаг 2 из 3",
    clearStep2Title: "Внимание: действие необратимо!",
    clearStep2Text: "Это действие невозможно отменить. Все ваши отметки на YouTube исчезнут. Рекомендуем предварительно сохранить резервную копию.",
    clearStep2Next: "Я понимаю риски (2/3)",
    clearStep3Badge: "Шаг 3 из 3",
    clearStep3Title: "Финальное подтверждение",
    clearStep3Text: "Для окончательного подтверждения введите слово {word} в поле ниже:",
    clearStep3Final: "Окончательно удалить всё (3/3)",
    modalBackupBtn: "Скачать бэкап (Экспорт)",
    btnCancel: "Отмена",
    emptyAlready: "База данных уже пуста.",
    loading: "Загрузка видео...",
    emptyAllTitle: "Список пока пуст",
    emptyAllDesc: "Отмечайте видео как просмотренные («+») или сохраняйте на потом («Часы») на YouTube.",
    emptyWatchedTitle: "Нет просмотренных видео",
    emptyWatchedDesc: "Видео, отмеченные кнопкой «+» или просмотренные на YouTube, появятся здесь.",
    emptyWlTitle: "Список «Смотреть позже» пуст",
    emptyWlDesc: "Нажмите на кнопку с часами на любом превью видео на YouTube, чтобы сохранить его сюда.",
    emptySearchTitle: "Ничего не найдено",
    emptySearchDesc: "Попробуйте изменить поисковый запрос или сбросить фильтр.",
    btnEmptyYouTube: "Перейти на YouTube",
    markWatched: "Просмотрено",
    markUnwatched: "Снять отметку просмотра",
    saveWl: "Смотреть позже",
    removeWl: "Удалить из «Смотреть позже»",
    openYouTube: "Открыть на YouTube",
    deleteVideo: "Удалить из списка",
    confirmDelete: "Удалить это видео из ваших списков?",
    confirmClear: "Вы уверены, что хотите удалить все сохранённые видео? Это действие невозможно отменить.",
    clearedAll: "Все списки видео очищены.",
    exported: "Экспортировано {count} видео.",
    imported: "Успешно импортировано {count} записей.",
    invalidJson: "Неверный формат файла JSON.",
    readError: "Ошибка чтения файла.",
    fetchComplete: "Все названия и каналы успешно обновлены!",
    tabStats: "Статистика",
    statCardWatched: "Просмотрено",
    statCardWl: "Смотреть позже",
    statCardTotal: "Всего в базе",
    statCardTime: "Оценка времени",
    subWatchedAll: "Все сохранённые видео просмотрены (100%)",
    subWatchedProgress: "{count} из {total} просмотрено • осталось {remain}",
    subWatchedEmpty: "Нет сохранённых видео",
    subWlEmpty: "Список «Смотреть позже» пуст",
    subWlPending: "Осталось посмотреть: {count}",
    subWlAllWatched: "Все видео из очереди уже просмотрены",
    subTotal: "Уникальных роликов в истории",
    subTime: "Контента просмотрено",
    topChannelsTitle: "Топ каналов",
    topChannelsSub: "Авторы, которых вы смотрите чаще всего",
    uniqueChannelsBadge: "{count} каналов",
    noChannelsYet: "Данные о каналах пока не подтянуты",
    activityDayTitle: "Активность по дням недели",
    activityDaySubAll: "Когда вы чаще всего отмечаете видео (За всё время)",
    activityDaySubWeek: "Отметки видео на этой неделе",
    btnChartWeek: "Эта неделя",
    btnChartAll: "За всё время",
    todayBadge: "Сегодня",
    peakDayPrefixWeek: "Пик недели: ",
    peakDayPrefix: "Пик: ",
    periodToday: "Сегодня:",
    periodWeek: "За 7 дней:",
    periodMonth: "За 30 дней:",
    periodOlder: "Ранее:",
    hoursShort: "ч",
    minsShort: "мин",
    videosCountSuffix: " видео",
    daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
  }
};

const state = {
  watched: {},
  watchLater: {},
  activeTab: "all",
  searchQuery: "",
  sortBy: "newest",
  language: "ru",
  activityChartMode: "week"
};

const dom = {
  statWatchedCount: document.getElementById("statWatchedCount"),
  statWlCount: document.getElementById("statWlCount"),
  statTotalCount: document.getElementById("statTotalCount"),
  countAll: document.getElementById("countAll"),
  countWatched: document.getElementById("countWatched"),
  countWl: document.getElementById("countWl"),
  searchInput: document.getElementById("searchInput"),
  searchClear: document.getElementById("searchClear"),
  sortSelect: document.getElementById("sortSelect"),
  videoGrid: document.getElementById("videoGrid"),
  emptyState: document.getElementById("emptyState"),
  emptyTitle: document.getElementById("emptyTitle"),
  emptyDesc: document.getElementById("emptyDesc"),
  contentStatus: document.getElementById("contentStatus"),
  statusText: document.getElementById("statusText"),
  btnFetchMetadata: document.getElementById("btnFetchMetadata"),
  badgeFetchCount: document.getElementById("badgeFetchCount"),
  fetchProgressWrap: document.getElementById("fetchProgressWrap"),
  fetchProgressBar: document.getElementById("fetchProgressBar"),
  btnExport: document.getElementById("btnExport"),
  btnImport: document.getElementById("btnImport"),
  fileInput: document.getElementById("fileInput"),
  btnOpenClearModal: document.getElementById("btnOpenClearModal"),
  clearModalOverlay: document.getElementById("clearModalOverlay"),
  modalStepBadge: document.getElementById("modalStepBadge"),
  modalTitle: document.getElementById("modalTitle"),
  btnCancelClear: document.getElementById("btnCancelClear"),
  modalStep1: document.getElementById("modalStep1"),
  modalStep1Text: document.getElementById("modalStep1Text"),
  modalStep1CountLabel: document.getElementById("modalStep1CountLabel"),
  modalStep1Count: document.getElementById("modalStep1Count"),
  modalStep2: document.getElementById("modalStep2"),
  modalStep2Text: document.getElementById("modalStep2Text"),
  btnModalExportBackup: document.getElementById("btnModalExportBackup"),
  i18nModalExport: document.getElementById("i18nModalExport"),
  modalStep3: document.getElementById("modalStep3"),
  modalStep3Text: document.getElementById("modalStep3Text"),
  modalConfirmWordText: document.getElementById("modalConfirmWordText"),
  inputClearConfirm: document.getElementById("inputClearConfirm"),
  btnModalDismiss: document.getElementById("btnModalDismiss"),
  btnModalNext: document.getElementById("btnModalNext"),
  toast: document.getElementById("toast"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  langButtons: document.querySelectorAll(".lang-btn"),
  statWatchedPill: document.getElementById("statWatchedPill"),
  statWlPill: document.getElementById("statWlPill"),
  statTotalPill: document.getElementById("statTotalPill"),
  tabStats: document.getElementById("tabStats"),
  statsView: document.getElementById("statsView"),
  statsValWatched: document.getElementById("statsValWatched"),
  statsProgressWatched: document.getElementById("statsProgressWatched"),
  statsSubWatched: document.getElementById("statsSubWatched"),
  statsValWl: document.getElementById("statsValWl"),
  statsProgressWl: document.getElementById("statsProgressWl"),
  statsSubWl: document.getElementById("statsSubWl"),
  statsValTotal: document.getElementById("statsValTotal"),
  statsSubTotal: document.getElementById("statsSubTotal"),
  statsValTime: document.getElementById("statsValTime"),
  statsSubTime: document.getElementById("statsSubTime"),
  topChannelsList: document.getElementById("topChannelsList"),
  statsUniqueChannelsBadge: document.getElementById("statsUniqueChannelsBadge"),
  dayChart: document.getElementById("dayChart"),
  statsPeakDayBadge: document.getElementById("statsPeakDayBadge"),
  btnChartThisWeek: document.getElementById("btnChartThisWeek"),
  btnChartAllTime: document.getElementById("btnChartAllTime"),
  i18nActivityDaySub: document.getElementById("i18nActivityDaySub"),
  valPeriodToday: document.getElementById("valPeriodToday"),
  valPeriodWeek: document.getElementById("valPeriodWeek"),
  valPeriodMonth: document.getElementById("valPeriodMonth"),
  valPeriodOlder: document.getElementById("valPeriodOlder"),
  sortBox: document.querySelector(".sort-box"),
  searchBox: document.querySelector(".search-box")
};

let toastTimeout = null;
let isFetchingActive = false;
const checkedMissingSet = new Set();
let dataVersion = 1;
let lastGridKey = "";
let isStatsDirty = true;
let lastStatsLang = "";
let renderCancelToken = null;
let clearModalStep = 1;
const scrollPositions = {};

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 2600);
}

function getStorageLocal() {
  if (typeof browser !== "undefined" && browser.storage && browser.storage.local) {
    return browser.storage.local;
  }
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    return chrome.storage.local;
  }
  return null;
}

function hasChromeStorage() {
  return Boolean(getStorageLocal());
}

function getStorageDataAsync(keys) {
  const storage = getStorageLocal();
  if (!storage) return Promise.resolve(null);
  try {
    const res = storage.get(keys);
    if (res && typeof res.then === "function") {
      return res;
    }
  } catch (e) {}
  return new Promise((resolve) => {
    try {
      storage.get(keys, (data) => {
        resolve(data || {});
      });
    } catch (e) {
      resolve({});
    }
  });
}

async function loadStorageData() {
  const storage = getStorageLocal();
  if (storage) {
    try {
      const result = await getStorageDataAsync(["watched_videos", "watch_later", "settings"]);
      if (result) {
        state.watched = result.watched_videos || {};
        state.watchLater = result.watch_later || {};
        if (result.settings && result.settings.language) {
          state.language = result.settings.language;
        }
      }
    } catch (e) {
      state.watched = {};
      state.watchLater = {};
    }
  } else {
    try {
      const watchedRaw = localStorage.getItem("as_watched_videos");
      const wlRaw = localStorage.getItem("as_watch_later");
      const langRaw = localStorage.getItem("as_language");
      state.watched = watchedRaw ? JSON.parse(watchedRaw) : {};
      state.watchLater = wlRaw ? JSON.parse(wlRaw) : {};
      if (langRaw) state.language = langRaw;
    } catch (e) {
      state.watched = {};
      state.watchLater = {};
    }
  }
  dataVersion++;
  isStatsDirty = true;
}

function saveStorageData(keys, callback) {
  const storage = getStorageLocal();
  if (storage) {
    const payload = {};
    if (keys.includes("watched")) payload.watched_videos = state.watched;
    if (keys.includes("watchLater")) payload.watch_later = state.watchLater;
    try {
      const p = storage.set(payload);
      if (p && typeof p.then === "function") {
        p.then(() => { if (callback) callback(); }).catch(() => { if (callback) callback(); });
        return;
      }
    } catch (e) {}
    storage.set(payload, callback);
  } else {
    try {
      if (keys.includes("watched")) localStorage.setItem("as_watched_videos", JSON.stringify(state.watched));
      if (keys.includes("watchLater")) localStorage.setItem("as_watch_later", JSON.stringify(state.watchLater));
    } catch (e) {}
    if (callback) callback();
  }
}

function saveLanguage(lang) {
  state.language = lang;
  const storage = getStorageLocal();
  if (storage) {
    try {
      const p = storage.get(["settings"]);
      if (p && typeof p.then === "function") {
        p.then((result) => {
          const settings = Object.assign({}, result && result.settings, { language: lang });
          storage.set({ settings });
        });
        return;
      }
    } catch (e) {}
    storage.get(["settings"], (result) => {
      const settings = Object.assign({}, result && result.settings, { language: lang });
      storage.set({ settings });
    });
  } else {
    try {
      localStorage.setItem("as_language", lang);
    } catch (e) {}
  }
}

function applyLanguage(lang) {
  state.language = lang === "en" ? "en" : "ru";
  isStatsDirty = true;
  lastStatsLang = "";
  const dict = TRANSLATIONS[state.language];

  document.getElementById("i18nTagline").textContent = dict.tagline;
  document.getElementById("i18nStatWatched").textContent = dict.statWatched;
  document.getElementById("i18nStatWl").textContent = dict.statWl;
  document.getElementById("i18nStatTotal").textContent = dict.statTotal;
  document.getElementById("i18nTabAll").textContent = dict.tabAll;
  document.getElementById("i18nTabWatched").textContent = dict.tabWatched;
  document.getElementById("i18nTabWatchLater").textContent = dict.tabWatchLater;
  document.getElementById("i18nSortLabel").textContent = dict.sortLabel;
  document.getElementById("optSortNewest").textContent = dict.sortNewest;
  document.getElementById("optSortOldest").textContent = dict.sortOldest;
  document.getElementById("optSortTitleAsc").textContent = dict.sortTitleAsc;
  document.getElementById("optSortTitleDesc").textContent = dict.sortTitleDesc;
  document.getElementById("optSortChannelAsc").textContent = dict.sortChannelAsc;
  document.getElementById("i18nBtnFetch").textContent = dict.btnFetch;
  document.getElementById("i18nBtnExport").textContent = dict.btnExport;
  document.getElementById("i18nBtnImport").textContent = dict.btnImport;
  document.getElementById("btnEmptyYouTube").querySelector("span").textContent = dict.btnEmptyYouTube;
  dom.searchInput.placeholder = dict.searchPlaceholder;

  const elTabStats = document.getElementById("i18nTabStats");
  if (elTabStats) elTabStats.textContent = dict.tabStats;
  const elStatCardWatched = document.getElementById("i18nStatCardWatched");
  if (elStatCardWatched) elStatCardWatched.textContent = dict.statCardWatched;
  const elStatCardWl = document.getElementById("i18nStatCardWl");
  if (elStatCardWl) elStatCardWl.textContent = dict.statCardWl;
  const elStatCardTotal = document.getElementById("i18nStatCardTotal");
  if (elStatCardTotal) elStatCardTotal.textContent = dict.statCardTotal;
  const elStatCardTime = document.getElementById("i18nStatCardTime");
  if (elStatCardTime) elStatCardTime.textContent = dict.statCardTime;
  const elTopChannelsTitle = document.getElementById("i18nTopChannelsTitle");
  if (elTopChannelsTitle) elTopChannelsTitle.textContent = dict.topChannelsTitle;
  const elTopChannelsSub = document.getElementById("i18nTopChannelsSub");
  if (elTopChannelsSub) elTopChannelsSub.textContent = dict.topChannelsSub;
  const elActivityDayTitle = document.getElementById("i18nActivityDayTitle");
  if (elActivityDayTitle) elActivityDayTitle.textContent = dict.activityDayTitle;
  const elActivityDaySub = document.getElementById("i18nActivityDaySub");
  if (elActivityDaySub) {
    elActivityDaySub.textContent = state.activityChartMode === "week" ? dict.activityDaySubWeek : dict.activityDaySubAll;
  }
  if (dom.btnChartThisWeek) dom.btnChartThisWeek.textContent = dict.btnChartWeek;
  if (dom.btnChartAllTime) dom.btnChartAllTime.textContent = dict.btnChartAll;
  const elPeriodToday = document.getElementById("i18nPeriodToday");
  if (elPeriodToday) elPeriodToday.textContent = dict.periodToday;
  const elPeriodWeek = document.getElementById("i18nPeriodWeek");
  if (elPeriodWeek) elPeriodWeek.textContent = dict.periodWeek;
  const elPeriodMonth = document.getElementById("i18nPeriodMonth");
  if (elPeriodMonth) elPeriodMonth.textContent = dict.periodMonth;
  const elPeriodOlder = document.getElementById("i18nPeriodOlder");
  if (elPeriodOlder) elPeriodOlder.textContent = dict.periodOlder;

  const elDangerTitle = document.getElementById("i18nDangerTitle");
  if (elDangerTitle) elDangerTitle.textContent = dict.dangerTitle;
  const elDangerDesc = document.getElementById("i18nDangerDesc");
  if (elDangerDesc) elDangerDesc.textContent = dict.dangerDesc;
  const elBtnClearAll = document.getElementById("i18nBtnClearAll");
  if (elBtnClearAll) elBtnClearAll.textContent = dict.btnClearAll;

  if (dom.clearModalOverlay && dom.clearModalOverlay.style.display === "flex") {
    updateClearModalView();
  }

  dom.langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === state.language);
  });
}

function formatDate(timestamp) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString(state.language === "ru" ? "ru-RU" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getAllItems() {
  const map = new Map();

  for (const id in state.watched) {
    if (Object.prototype.hasOwnProperty.call(state.watched, id)) {
      const item = state.watched[id] || {};
      map.set(id, {
        id: id,
        title: item.title || `YouTube Video (${id})`,
        channel: item.channel || "",
        timestamp: item.timestamp || 0,
        isWatched: true,
        isWatchLater: Boolean(state.watchLater[id])
      });
    }
  }

  for (const id in state.watchLater) {
    if (Object.prototype.hasOwnProperty.call(state.watchLater, id)) {
      const item = state.watchLater[id] || {};
      if (map.has(id)) {
        const existing = map.get(id);
        existing.isWatchLater = true;
        if (!existing.channel && item.channel) existing.channel = item.channel;
        if ((!existing.title || existing.title.startsWith("YouTube Video")) && item.title) existing.title = item.title;
        if (item.timestamp && item.timestamp > existing.timestamp) existing.timestamp = item.timestamp;
      } else {
        map.set(id, {
          id: id,
          title: item.title || `YouTube Video (${id})`,
          channel: item.channel || "",
          timestamp: item.timestamp || 0,
          isWatched: false,
          isWatchLater: true
        });
      }
    }
  }

  return Array.from(map.values());
}

function getFilteredAndSortedItems() {
  const all = getAllItems();

  let filtered = all.filter((item) => {
    if (state.activeTab === "watched" && !item.isWatched) return false;
    if (state.activeTab === "watch-later" && !item.isWatchLater) return false;

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = item.title && item.title.toLowerCase().includes(q);
      const matchChannel = item.channel && item.channel.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      if (!matchTitle && !matchChannel && !matchId) return false;
    }

    return true;
  });

  filtered.sort((a, b) => {
    if (state.sortBy === "newest") {
      return (b.timestamp || 0) - (a.timestamp || 0);
    }
    if (state.sortBy === "oldest") {
      return (a.timestamp || 0) - (b.timestamp || 0);
    }
    if (state.sortBy === "title-asc") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (state.sortBy === "title-desc") {
      return (b.title || "").localeCompare(a.title || "");
    }
    if (state.sortBy === "channel-asc") {
      return (a.channel || "").localeCompare(b.channel || "");
    }
    return 0;
  });

  return filtered;
}

function updateStatsAndBadges() {
  const watchedCount = Object.keys(state.watched).length;
  const wlCount = Object.keys(state.watchLater).length;
  const allItems = getAllItems();
  const totalCount = allItems.length;

  dom.statWatchedCount.textContent = watchedCount.toLocaleString();
  dom.statWlCount.textContent = wlCount.toLocaleString();
  dom.statTotalCount.textContent = totalCount.toLocaleString();

  dom.countAll.textContent = totalCount.toLocaleString();
  dom.countWatched.textContent = watchedCount.toLocaleString();
  dom.countWl.textContent = wlCount.toLocaleString();

  updateFetchBadge();
}

function getItemsMissingMetadata() {
  const all = getAllItems();
  return all.filter((item) => {
    if (checkedMissingSet.has(item.id)) return false;
    const isGenericTitle = !item.title || item.title.startsWith("YouTube Video") || item.title.startsWith("Видео ");
    const isMissingChannel = !item.channel;
    return isGenericTitle || isMissingChannel;
  });
}

function updateFetchBadge() {
  const missing = getItemsMissingMetadata();
  if (missing.length > 0) {
    dom.badgeFetchCount.textContent = missing.length;
    dom.badgeFetchCount.style.display = "inline-block";
  } else {
    dom.badgeFetchCount.style.display = "none";
  }
}

function fallbackFetch(videoId) {
  return fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    .then((res) => {
      if (!res.ok) throw new Error("Status " + res.status);
      return res.json();
    })
    .then((data) => ({
      title: data.title || "",
      channel: data.author_name || ""
    }));
}

function fetchVideoMetadata(videoId) {
  return new Promise((resolve, reject) => {
    const runtimeApi = (typeof browser !== "undefined" && browser.runtime) ? browser.runtime : ((typeof chrome !== "undefined" && chrome.runtime) ? chrome.runtime : null);
    if (runtimeApi && runtimeApi.sendMessage) {
      try {
        const p = runtimeApi.sendMessage({ type: "FETCH_METADATA", videoId });
        if (p && typeof p.then === "function") {
          p.then((res) => {
            if (res && res.success) {
              resolve({ title: res.title, channel: res.channel });
            } else {
              fallbackFetch(videoId).then(resolve).catch(reject);
            }
          }).catch(() => {
            fallbackFetch(videoId).then(resolve).catch(reject);
          });
          return;
        }
      } catch (e) {}
      runtimeApi.sendMessage({ type: "FETCH_METADATA", videoId }, (res) => {
        const lastErr = (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.lastError);
        if (lastErr) {
          fallbackFetch(videoId).then(resolve).catch(reject);
          return;
        }
        if (res && res.success) {
          resolve({ title: res.title, channel: res.channel });
        } else {
          fallbackFetch(videoId).then(resolve).catch(reject);
        }
      });
    } else {
      fallbackFetch(videoId).then(resolve).catch(reject);
    }
  });
}

function updateCardInDOM(videoId, title, channel) {
  const card = dom.videoGrid.querySelector(`.video-card[data-id="${videoId}"]`);
  if (!card) return;
  if (title) {
    const titleLink = card.querySelector(".card-title");
    if (titleLink) titleLink.textContent = title;
    const img = card.querySelector(".card-thumb-img");
    if (img) img.alt = title;
  }
  if (channel) {
    let channelEl = card.querySelector(".card-channel");
    if (!channelEl) {
      channelEl = document.createElement("div");
      channelEl.className = "card-channel";
      const body = card.querySelector(".card-body");
      const titleLink = card.querySelector(".card-title");
      if (body && titleLink) {
        titleLink.after(channelEl);
      }
    }
    if (channelEl) channelEl.textContent = channel;
  }
}

async function startMetadataFetch(isManual = false) {
  if (isFetchingActive) return;
  const missing = getItemsMissingMetadata();
  if (missing.length === 0) {
    if (isManual) {
      showToast(TRANSLATIONS[state.language].fetchComplete);
    }
    return;
  }

  isFetchingActive = true;
  dom.btnFetchMetadata.disabled = true;
  const icon = dom.btnFetchMetadata.querySelector(".fetch-icon");
  if (icon) icon.classList.add("spin");
  dom.fetchProgressWrap.style.display = "block";
  dom.fetchProgressBar.style.width = "0%";

  const total = missing.length;
  let done = 0;
  let hasChanges = false;
  const concurrency = 3;
  let index = 0;

  async function worker() {
    while (index < missing.length) {
      const current = missing[index++];
      try {
        const meta = await fetchVideoMetadata(current.id);
        checkedMissingSet.add(current.id);
        if (meta && (meta.title || meta.channel)) {
          let updated = false;
          if (state.watched[current.id]) {
            if (meta.title) state.watched[current.id].title = meta.title;
            if (meta.channel) state.watched[current.id].channel = meta.channel;
            updated = true;
          }
          if (state.watchLater[current.id]) {
            if (meta.title) state.watchLater[current.id].title = meta.title;
            if (meta.channel) state.watchLater[current.id].channel = meta.channel;
            updated = true;
          }
          if (updated) {
            hasChanges = true;
            updateCardInDOM(current.id, meta.title, meta.channel);
          }
        }
      } catch (err) {
        checkedMissingSet.add(current.id);
      }
      done++;
      const pct = Math.round((done / total) * 100);
      dom.fetchProgressBar.style.width = `${pct}%`;
      updateFetchBadge();
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(concurrency, total); i++) {
    workers.push(worker());
  }
  await Promise.all(workers);

  if (hasChanges) {
    dataVersion++;
    isStatsDirty = true;
    saveStorageData(["watched", "watchLater"], () => {
      render();
    });
  }

  isFetchingActive = false;
  dom.btnFetchMetadata.disabled = false;
  if (icon) icon.classList.remove("spin");
  setTimeout(() => {
    dom.fetchProgressWrap.style.display = "none";
    dom.fetchProgressBar.style.width = "0%";
  }, 1000);

  updateFetchBadge();
  if (isManual || done > 0) {
    showToast(TRANSLATIONS[state.language].fetchComplete);
  }
}

function createCardElement(item) {
  const dict = TRANSLATIONS[state.language];
  const card = document.createElement("article");
  card.className = "video-card";
  card.dataset.id = item.id;

  const thumbWrap = document.createElement("div");
  thumbWrap.className = "card-thumb-wrap";

  const img = document.createElement("img");
  img.className = "card-thumb-img";
  img.alt = item.title;
  img.loading = "lazy";
  img.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
  img.onerror = () => {
    img.src = `https://i.ytimg.com/vi/${item.id}/mqdefault.jpg`;
  };
  thumbWrap.appendChild(img);

  const badges = document.createElement("div");
  badges.className = "thumb-badges";

  if (item.isWatched) {
    const bWatched = document.createElement("span");
    bWatched.className = "thumb-badge badge-watched";
    bWatched.textContent = "✓ " + dict.markWatched;
    badges.appendChild(bWatched);
  }

  if (item.isWatchLater) {
    const bWl = document.createElement("span");
    bWl.className = "thumb-badge badge-wl";
    bWl.textContent = "⏳ " + dict.saveWl;
    badges.appendChild(bWl);
  }

  thumbWrap.appendChild(badges);

  const overlay = document.createElement("a");
  overlay.className = "thumb-overlay";
  overlay.href = `https://www.youtube.com/watch?v=${item.id}`;
  overlay.target = "_blank";
  overlay.rel = "noopener noreferrer";

  const playBtn = document.createElement("div");
  playBtn.className = "play-icon-btn";
  playBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><polygon points="6,4 20,12 6,20"></polygon></svg>';
  overlay.appendChild(playBtn);
  thumbWrap.appendChild(overlay);

  card.appendChild(thumbWrap);

  const body = document.createElement("div");
  body.className = "card-body";

  const titleLink = document.createElement("a");
  titleLink.className = "card-title";
  titleLink.href = `https://www.youtube.com/watch?v=${item.id}`;
  titleLink.target = "_blank";
  titleLink.rel = "noopener noreferrer";
  titleLink.textContent = item.title;
  body.appendChild(titleLink);

  if (item.channel) {
    const channel = document.createElement("div");
    channel.className = "card-channel";
    channel.textContent = item.channel;
    body.appendChild(channel);
  }

  if (item.timestamp) {
    const date = document.createElement("div");
    date.className = "card-date";
    date.textContent = formatDate(item.timestamp);
    body.appendChild(date);
  }

  card.appendChild(body);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const btnWatched = document.createElement("button");
  btnWatched.type = "button";
  btnWatched.className = "action-btn" + (item.isWatched ? " active-watched" : "");
  btnWatched.title = item.isWatched ? dict.markUnwatched : dict.markWatched;
  btnWatched.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  const spanWatched = document.createElement("span");
  spanWatched.textContent = item.isWatched ? dict.markWatched : "+";
  btnWatched.appendChild(spanWatched);
  btnWatched.addEventListener("click", () => {
    toggleWatched(item.id, item.title, item.channel);
  });

  const btnWl = document.createElement("button");
  btnWl.type = "button";
  btnWl.className = "action-btn" + (item.isWatchLater ? " active-wl" : "");
  btnWl.title = item.isWatchLater ? dict.removeWl : dict.saveWl;
  btnWl.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 14"></polyline></svg>';
  const spanWl = document.createElement("span");
  spanWl.textContent = item.isWatchLater ? dict.saveWl : "+";
  btnWl.appendChild(spanWl);
  btnWl.addEventListener("click", () => {
    toggleWatchLater(item.id, item.title, item.channel);
  });

  const btnExternal = document.createElement("a");
  btnExternal.className = "action-btn";
  btnExternal.href = `https://www.youtube.com/watch?v=${item.id}`;
  btnExternal.target = "_blank";
  btnExternal.rel = "noopener noreferrer";
  btnExternal.title = dict.openYouTube;
  btnExternal.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';

  const btnDelete = document.createElement("button");
  btnDelete.type = "button";
  btnDelete.className = "action-btn btn-trash";
  btnDelete.title = dict.deleteVideo;
  btnDelete.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
  btnDelete.addEventListener("click", () => {
    deleteItem(item.id);
  });

  actions.appendChild(btnWatched);
  actions.appendChild(btnWl);
  actions.appendChild(btnExternal);
  actions.appendChild(btnDelete);
  card.appendChild(actions);

  return card;
}

function switchTab(tabName) {
  if (state.activeTab === tabName) return;
  scrollPositions[state.activeTab] = window.scrollY;
  dom.tabButtons = document.querySelectorAll(".tab-btn");
  dom.tabButtons.forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  state.activeTab = tabName;
  render();
  const savedScroll = scrollPositions[tabName] || 0;
  window.scrollTo({ top: savedScroll, behavior: "instant" });
}

function renderStats() {
  const dict = TRANSLATIONS[state.language];
  const allItems = getAllItems();
  const totalCount = allItems.length;
  const watchedCount = Object.keys(state.watched).length;
  const wlCount = Object.keys(state.watchLater).length;
  const unwatchedCount = allItems.filter((i) => !i.isWatched).length;
  const wlUnwatchedCount = allItems.filter((i) => i.isWatchLater && !i.isWatched).length;

  dom.statsValWatched.textContent = watchedCount.toLocaleString();
  const watchedProgressPct = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;
  dom.statsProgressWatched.style.width = `${Math.min(100, watchedProgressPct)}%`;

  if (unwatchedCount === 0 && totalCount > 0) {
    dom.statsSubWatched.textContent = dict.subWatchedAll;
  } else if (totalCount > 0) {
    dom.statsSubWatched.textContent = dict.subWatchedProgress
      .replace("{count}", watchedCount)
      .replace("{total}", totalCount)
      .replace("{remain}", unwatchedCount);
  } else {
    dom.statsSubWatched.textContent = dict.subWatchedEmpty;
  }

  dom.statsValWl.textContent = wlCount.toLocaleString();
  const wlProgressPct = totalCount > 0 ? Math.round((wlCount / totalCount) * 100) : 0;
  dom.statsProgressWl.style.width = `${Math.min(100, wlProgressPct)}%`;

  if (wlCount === 0) {
    dom.statsSubWl.textContent = dict.subWlEmpty;
  } else if (wlUnwatchedCount > 0) {
    dom.statsSubWl.textContent = dict.subWlPending.replace("{count}", wlUnwatchedCount);
  } else {
    dom.statsSubWl.textContent = dict.subWlAllWatched;
  }

  dom.statsValTotal.textContent = totalCount.toLocaleString();
  dom.statsSubTotal.textContent = dict.subTotal;

  const estMinutes = watchedCount * 14;
  const estHours = Math.floor(estMinutes / 60);
  const estRemMin = estMinutes % 60;
  let timeStr = "";
  if (estHours > 0) {
    timeStr = `~${estHours} ${dict.hoursShort} ${estRemMin} ${dict.minsShort}`;
  } else {
    timeStr = `~${estRemMin} ${dict.minsShort}`;
  }
  dom.statsValTime.textContent = timeStr;
  dom.statsSubTime.textContent = dict.subTime;

  const channelMap = new Map();
  for (let i = 0; i < allItems.length; i++) {
    const ch = allItems[i].channel;
    if (ch && ch.trim()) {
      channelMap.set(ch, (channelMap.get(ch) || 0) + 1);
    }
  }

  const sortedChannels = Array.from(channelMap.entries()).sort((a, b) => b[1] - a[1]);
  dom.statsUniqueChannelsBadge.textContent = dict.uniqueChannelsBadge.replace("{count}", channelMap.size);

  dom.topChannelsList.innerHTML = "";
  if (sortedChannels.length === 0) {
    const emptyCh = document.createElement("div");
    emptyCh.className = "channel-empty";
    emptyCh.textContent = dict.noChannelsYet;
    dom.topChannelsList.appendChild(emptyCh);
  } else {
    const topChannels = sortedChannels.slice(0, 6);
    const maxChCount = topChannels[0][1] || 1;
    for (let i = 0; i < topChannels.length; i++) {
      const rank = i + 1;
      const [chName, count] = topChannels[i];
      const row = document.createElement("div");
      row.className = "channel-row";

      const rankBadge = document.createElement("span");
      rankBadge.className = `channel-rank${rank <= 3 ? ` rank-${rank}` : ""}`;
      rankBadge.textContent = rank;

      const info = document.createElement("div");
      info.className = "channel-info";

      const head = document.createElement("div");
      head.className = "channel-head";

      const nameEl = document.createElement("span");
      nameEl.className = "channel-name";
      nameEl.textContent = chName;

      const countEl = document.createElement("span");
      countEl.className = "channel-count";
      countEl.textContent = `${count}${dict.videosCountSuffix}`;

      head.appendChild(nameEl);
      head.appendChild(countEl);

      const barWrap = document.createElement("div");
      barWrap.className = "channel-bar-wrap";

      const bar = document.createElement("div");
      bar.className = "channel-bar";
      const pct = Math.round((count / maxChCount) * 100);
      bar.style.width = `${pct}%`;

      barWrap.appendChild(bar);
      info.appendChild(head);
      info.appendChild(barWrap);

      row.appendChild(rankBadge);
      row.appendChild(info);

      row.addEventListener("click", () => {
        state.searchQuery = chName.toLowerCase();
        dom.searchInput.value = chName;
        dom.searchClear.classList.add("show");
        switchTab("all");
      });

      dom.topChannelsList.appendChild(row);
    }
  }

  const isWeekMode = state.activityChartMode === "week";
  const nowObj = new Date();
  const currentDayIdx = (nowObj.getDay() + 6) % 7;
  const startOfWeek = new Date(nowObj);
  startOfWeek.setDate(nowObj.getDate() - currentDayIdx);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  if (dom.btnChartThisWeek && dom.btnChartAllTime) {
    dom.btnChartThisWeek.classList.toggle("active", isWeekMode);
    dom.btnChartAllTime.classList.toggle("active", !isWeekMode);
  }
  if (dom.i18nActivityDaySub) {
    dom.i18nActivityDaySub.textContent = isWeekMode ? dict.activityDaySubWeek : dict.activityDaySubAll;
  }

  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < allItems.length; i++) {
    const ts = allItems[i].timestamp;
    if (ts && ts > 0) {
      if (isWeekMode) {
        if (ts >= startOfWeek.getTime() && ts < endOfWeek.getTime()) {
          const day = new Date(ts).getDay();
          const idx = (day + 6) % 7;
          dayCounts[idx]++;
        }
      } else {
        const day = new Date(ts).getDay();
        const idx = (day + 6) % 7;
        dayCounts[idx]++;
      }
    }
  }

  let maxDayCount = Math.max(...dayCounts);
  if (maxDayCount === 0) maxDayCount = 1;
  const peakDayIdx = dayCounts.indexOf(Math.max(...dayCounts));
  const peakDayName = dict.daysOfWeek[peakDayIdx];
  if (isWeekMode && Math.max(...dayCounts) === 0) {
    dom.statsPeakDayBadge.textContent = `${dict.peakDayPrefixWeek}—`;
  } else {
    dom.statsPeakDayBadge.textContent = `${isWeekMode ? dict.peakDayPrefixWeek : dict.peakDayPrefix}${peakDayName}`;
  }

  dom.dayChart.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const isToday = isWeekMode && i === currentDayIdx;
    const isPeak = dayCounts[i] > 0 && i === peakDayIdx;
    const col = document.createElement("div");
    col.className = `day-col${isPeak ? " peak-day" : ""}${isToday ? " today-col" : ""}`;

    const val = document.createElement("span");
    val.className = "day-val";
    val.textContent = dayCounts[i];

    const barWrap = document.createElement("div");
    barWrap.className = "day-bar-wrap";

    const bar = document.createElement("div");
    bar.className = "day-bar";
    const barHeight = Math.max(Math.round((dayCounts[i] / maxDayCount) * 100), 4);
    bar.style.height = `${dayCounts[i] > 0 ? barHeight : 4}%`;

    barWrap.appendChild(bar);

    const label = document.createElement("span");
    label.className = "day-label";
    label.textContent = dict.daysOfWeek[i];

    col.appendChild(val);
    col.appendChild(barWrap);
    col.appendChild(label);

    if (isToday) {
      const todayBadge = document.createElement("span");
      todayBadge.className = "day-today-badge";
      todayBadge.textContent = dict.todayBadge;
      col.appendChild(todayBadge);
    }

    dom.dayChart.appendChild(col);
  }

  const now = Date.now();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const weekAgo = now - 7 * 86400000;
  const monthAgo = now - 30 * 86400000;

  let todayCount = 0;
  let weekCount = 0;
  let monthCount = 0;
  let olderCount = 0;

  for (let i = 0; i < allItems.length; i++) {
    const ts = allItems[i].timestamp || 0;
    if (ts >= todayStart) todayCount++;
    if (ts >= weekAgo) weekCount++;
    if (ts >= monthAgo) monthCount++;
    if (ts < monthAgo && ts > 0) olderCount++;
  }

  dom.valPeriodToday.textContent = todayCount;
  dom.valPeriodWeek.textContent = weekCount;
  dom.valPeriodMonth.textContent = monthCount;
  dom.valPeriodOlder.textContent = olderCount;
}

function render() {
  updateStatsAndBadges();
  dom.searchClear.classList.toggle("show", dom.searchInput.value.length > 0);

  if (state.activeTab === "stats") {
    if (renderCancelToken) {
      renderCancelToken.cancelled = true;
      renderCancelToken = null;
    }
    dom.videoGrid.style.display = "none";
    dom.emptyState.style.display = "none";
    dom.contentStatus.style.display = "none";
    dom.statsView.style.display = "block";
    if (dom.sortBox) dom.sortBox.style.display = "none";
    if (isStatsDirty || lastStatsLang !== state.language) {
      renderStats();
      isStatsDirty = false;
      lastStatsLang = state.language;
    }
    return;
  }

  dom.statsView.style.display = "none";
  if (dom.sortBox) dom.sortBox.style.display = "flex";

  const currentGridKey = `${state.activeTab}|${state.searchQuery}|${state.sortBy}|${state.language}|${dataVersion}`;

  if (currentGridKey === lastGridKey && dom.videoGrid.children.length > 0) {
    dom.emptyState.style.display = "none";
    dom.contentStatus.style.display = "none";
    dom.videoGrid.style.display = "grid";
    return;
  }

  if (renderCancelToken) {
    renderCancelToken.cancelled = true;
    renderCancelToken = null;
  }

  const items = getFilteredAndSortedItems();
  dom.contentStatus.style.display = "none";

  if (items.length === 0) {
    dom.videoGrid.innerHTML = "";
    lastGridKey = currentGridKey;
    dom.videoGrid.style.display = "none";
    dom.emptyState.style.display = "block";

    const dict = TRANSLATIONS[state.language];
    if (state.searchQuery) {
      dom.emptyTitle.textContent = dict.emptySearchTitle;
      dom.emptyDesc.textContent = dict.emptySearchDesc;
    } else if (state.activeTab === "watched") {
      dom.emptyTitle.textContent = dict.emptyWatchedTitle;
      dom.emptyDesc.textContent = dict.emptyWatchedDesc;
    } else if (state.activeTab === "watch-later") {
      dom.emptyTitle.textContent = dict.emptyWlTitle;
      dom.emptyDesc.textContent = dict.emptyWlDesc;
    } else {
      dom.emptyTitle.textContent = dict.emptyAllTitle;
      dom.emptyDesc.textContent = dict.emptyAllDesc;
    }
    return;
  }

  dom.emptyState.style.display = "none";
  dom.videoGrid.style.display = "grid";
  dom.videoGrid.innerHTML = "";
  lastGridKey = currentGridKey;

  const initialBatchSize = 36;
  const chunkSize = 48;
  const initialItems = items.slice(0, initialBatchSize);
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < initialItems.length; i++) {
    fragment.appendChild(createCardElement(initialItems[i]));
  }
  dom.videoGrid.appendChild(fragment);

  if (items.length > initialBatchSize) {
    const token = { cancelled: false };
    renderCancelToken = token;
    let currentIndex = initialBatchSize;

    function renderNextChunk() {
      if (token.cancelled) return;
      const chunkFragment = document.createDocumentFragment();
      const nextEnd = Math.min(currentIndex + chunkSize, items.length);
      for (let i = currentIndex; i < nextEnd; i++) {
        chunkFragment.appendChild(createCardElement(items[i]));
      }
      dom.videoGrid.appendChild(chunkFragment);
      currentIndex = nextEnd;
      if (currentIndex < items.length && !token.cancelled) {
        requestAnimationFrame(renderNextChunk);
      } else if (renderCancelToken === token) {
        renderCancelToken = null;
      }
    }

    requestAnimationFrame(renderNextChunk);
  }
}

function toggleWatched(id, title, channel) {
  dataVersion++;
  isStatsDirty = true;
  if (state.watched[id]) {
    delete state.watched[id];
  } else {
    state.watched[id] = {
      timestamp: Date.now(),
      source: "dashboard",
      title: title || "",
      channel: channel || ""
    };
  }
  saveStorageData(["watched"], () => {
    render();
  });
}

function toggleWatchLater(id, title, channel) {
  dataVersion++;
  isStatsDirty = true;
  if (state.watchLater[id]) {
    delete state.watchLater[id];
  } else {
    state.watchLater[id] = {
      timestamp: Date.now(),
      title: title || "",
      channel: channel || ""
    };
  }
  saveStorageData(["watchLater"], () => {
    render();
  });
}

function deleteItem(id) {
  const dict = TRANSLATIONS[state.language];
  const confirmed = window.confirm(dict.confirmDelete);
  if (!confirmed) return;

  delete state.watched[id];
  delete state.watchLater[id];
  dataVersion++;
  isStatsDirty = true;

  saveStorageData(["watched", "watchLater"], () => {
    render();
  });
}

function exportBackupJSON() {
  const dict = TRANSLATIONS[state.language];
  const total = getAllItems().length;
  if (total === 0) {
    showToast(dict.emptyAllTitle);
    return;
  }

  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    watched_videos: state.watched,
    watch_later: state.watchLater
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `already-seen-backup-${dateStr}.json`;

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(dict.exported.replace("{count}", total));
}

function openClearModal() {
  const total = getAllItems().length;
  const dict = TRANSLATIONS[state.language];
  if (total === 0) {
    showToast(dict.emptyAlready);
    return;
  }
  clearModalStep = 1;
  updateClearModalView();
  dom.clearModalOverlay.style.display = "flex";
}

function closeClearModal() {
  dom.clearModalOverlay.style.display = "none";
  clearModalStep = 1;
  dom.inputClearConfirm.value = "";
}

function updateClearModalView() {
  const dict = TRANSLATIONS[state.language];
  const total = getAllItems().length;
  const confirmWord = state.language === "ru" ? "УДАЛИТЬ" : "DELETE";

  dom.modalStep1.style.display = clearModalStep === 1 ? "flex" : "none";
  dom.modalStep2.style.display = clearModalStep === 2 ? "flex" : "none";
  dom.modalStep3.style.display = clearModalStep === 3 ? "flex" : "none";

  if (clearModalStep === 1) {
    dom.modalStepBadge.textContent = dict.clearStep1Badge;
    dom.modalTitle.textContent = dict.clearStep1Title;
    dom.modalStep1Text.textContent = dict.clearStep1Text;
    dom.modalStep1CountLabel.textContent = dict.clearStep1CountLabel;
    dom.modalStep1Count.textContent = total.toLocaleString();
    dom.btnModalNext.textContent = dict.clearStep1Next;
    dom.btnModalNext.disabled = false;
  } else if (clearModalStep === 2) {
    dom.modalStepBadge.textContent = dict.clearStep2Badge;
    dom.modalTitle.textContent = dict.clearStep2Title;
    dom.modalStep2Text.textContent = dict.clearStep2Text;
    dom.i18nModalExport.textContent = dict.modalBackupBtn;
    dom.btnModalNext.textContent = dict.clearStep2Next;
    dom.btnModalNext.disabled = false;
  } else if (clearModalStep === 3) {
    dom.modalStepBadge.textContent = dict.clearStep3Badge;
    dom.modalTitle.textContent = dict.clearStep3Title;
    dom.modalConfirmWordText.textContent = confirmWord;
    dom.inputClearConfirm.placeholder = confirmWord;
    dom.inputClearConfirm.value = "";
    dom.btnModalNext.textContent = dict.clearStep3Final;
    dom.btnModalNext.disabled = true;
    setTimeout(() => {
      dom.inputClearConfirm.focus();
    }, 50);
  }

  dom.btnModalDismiss.textContent = dict.btnCancel;
}

function handleClearNext() {
  const dict = TRANSLATIONS[state.language];
  if (clearModalStep === 1) {
    clearModalStep = 2;
    updateClearModalView();
  } else if (clearModalStep === 2) {
    clearModalStep = 3;
    updateClearModalView();
  } else if (clearModalStep === 3) {
    const val = dom.inputClearConfirm.value.trim().toUpperCase();
    if (val === "УДАЛИТЬ" || val === "DELETE") {
      closeClearModal();
      state.watched = {};
      state.watchLater = {};
      dataVersion++;
      isStatsDirty = true;
      saveStorageData(["watched", "watchLater"], () => {
        render();
        showToast(dict.clearedAll);
      });
    }
  }
}

function setupEventListeners() {
  dom.searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    dom.searchClear.classList.toggle("show", state.searchQuery.length > 0);
    scrollPositions[state.activeTab] = 0;
    render();
  });

  dom.searchClear.addEventListener("click", () => {
    dom.searchInput.value = "";
    state.searchQuery = "";
    dom.searchClear.classList.remove("show");
    scrollPositions[state.activeTab] = 0;
    render();
    dom.searchInput.focus();
  });

  dom.sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    scrollPositions[state.activeTab] = 0;
    render();
  });

  dom.tabButtons = document.querySelectorAll(".tab-btn");
  dom.tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.tab);
    });
  });

  if (dom.statWatchedPill) {
    dom.statWatchedPill.addEventListener("click", () => switchTab("watched"));
  }
  if (dom.statWlPill) {
    dom.statWlPill.addEventListener("click", () => switchTab("watch-later"));
  }
  if (dom.statTotalPill) {
    dom.statTotalPill.addEventListener("click", () => switchTab("stats"));
  }

  if (dom.btnChartThisWeek) {
    dom.btnChartThisWeek.addEventListener("click", () => {
      if (state.activityChartMode !== "week") {
        state.activityChartMode = "week";
        isStatsDirty = true;
        render();
      }
    });
  }
  if (dom.btnChartAllTime) {
    dom.btnChartAllTime.addEventListener("click", () => {
      if (state.activityChartMode !== "all") {
        state.activityChartMode = "all";
        isStatsDirty = true;
        render();
      }
    });
  }

  dom.langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      applyLanguage(lang);
      saveLanguage(lang);
      render();
    });
  });

  dom.btnFetchMetadata.addEventListener("click", () => {
    startMetadataFetch(true);
  });

  dom.btnExport.addEventListener("click", exportBackupJSON);
  if (dom.btnModalExportBackup) {
    dom.btnModalExportBackup.addEventListener("click", exportBackupJSON);
  }

  if (dom.btnOpenClearModal) {
    dom.btnOpenClearModal.addEventListener("click", openClearModal);
  }
  if (dom.btnCancelClear) {
    dom.btnCancelClear.addEventListener("click", closeClearModal);
  }
  if (dom.btnModalDismiss) {
    dom.btnModalDismiss.addEventListener("click", closeClearModal);
  }
  if (dom.btnModalNext) {
    dom.btnModalNext.addEventListener("click", handleClearNext);
  }

  if (dom.clearModalOverlay) {
    dom.clearModalOverlay.addEventListener("click", (e) => {
      if (e.target === dom.clearModalOverlay) {
        closeClearModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dom.clearModalOverlay && dom.clearModalOverlay.style.display === "flex") {
      closeClearModal();
    }
  });

  if (dom.inputClearConfirm) {
    dom.inputClearConfirm.addEventListener("input", (e) => {
      const val = e.target.value.trim().toUpperCase();
      const matches = val === "УДАЛИТЬ" || val === "DELETE";
      if (dom.btnModalNext) {
        dom.btnModalNext.disabled = !matches;
      }
    });

    dom.inputClearConfirm.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && dom.btnModalNext && !dom.btnModalNext.disabled) {
        handleClearNext();
      }
    });
  }

  dom.btnImport.addEventListener("click", () => {
    dom.fileInput.value = "";
    dom.fileInput.click();
  });

  dom.fileInput.addEventListener("change", (event) => {
    const dict = TRANSLATIONS[state.language];
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        let importedCount = 0;

        if (parsed && typeof parsed === "object" && (parsed.watched_videos || parsed.watch_later)) {
          if (parsed.watched_videos && typeof parsed.watched_videos === "object") {
            for (const [id, value] of Object.entries(parsed.watched_videos)) {
              if (typeof id === "string" && id.length === 11) {
                if (!state.watched[id]) importedCount++;
                state.watched[id] = {
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
                if (!state.watchLater[id]) importedCount++;
                state.watchLater[id] = {
                  timestamp: value && value.timestamp ? value.timestamp : Date.now(),
                  title: value && value.title ? value.title : "",
                  channel: value && value.channel ? value.channel : ""
                };
              }
            }
          }
        } else if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          for (const [id, value] of Object.entries(parsed)) {
            if (typeof id === "string" && id.length === 11) {
              if (!state.watched[id]) importedCount++;
              state.watched[id] = {
                timestamp: value && value.timestamp ? value.timestamp : Date.now(),
                source: value && value.source ? value.source : "manual",
                title: value && value.title ? value.title : "",
                channel: value && value.channel ? value.channel : ""
              };
            }
          }
        } else if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (typeof item === "string" && item.length === 11) {
              if (!state.watched[item]) importedCount++;
              state.watched[item] = { timestamp: Date.now(), source: "manual" };
            } else if (item && typeof item === "object" && item.id) {
              if (!state.watched[item.id]) importedCount++;
              state.watched[item.id] = {
                timestamp: item.timestamp || Date.now(),
                source: item.source || "manual",
                title: item.title || "",
                channel: item.channel || ""
              };
            }
          }
        } else {
          showToast(dict.invalidJson);
          return;
        }

        dataVersion++;
        isStatsDirty = true;
        saveStorageData(["watched", "watchLater"], () => {
          render();
          showToast(dict.imported.replace("{count}", importedCount));
          startMetadataFetch(false);
        });
      } catch (err) {
        showToast(dict.readError);
      }
    };
    reader.readAsText(file);
  });

  const storageArea = (typeof browser !== "undefined" && browser.storage) ? browser.storage : ((typeof chrome !== "undefined" && chrome.storage) ? chrome.storage : null);
  if (storageArea && storageArea.onChanged) {
    storageArea.onChanged.addListener((changes, areaName) => {
      if (areaName !== "local") return;

      let changed = false;
      if (changes.watched_videos) {
        state.watched = changes.watched_videos.newValue || {};
        changed = true;
      }
      if (changes.watch_later) {
        state.watchLater = changes.watch_later.newValue || {};
        changed = true;
      }
      if (changes.settings && changes.settings.newValue && changes.settings.newValue.language) {
        state.language = changes.settings.newValue.language;
        applyLanguage(state.language);
        changed = true;
      }

      if (changed) {
        dataVersion++;
        isStatsDirty = true;
        render();
        if (!isFetchingActive && getItemsMissingMetadata().length > 0) {
          startMetadataFetch(false);
        }
      }
    });
  }

  window.addEventListener("focus", () => {
    if (Object.keys(state.watched).length === 0 && Object.keys(state.watchLater).length === 0) {
      loadStorageData().then(() => {
        applyLanguage(state.language);
        render();
      });
    }
  });
}

async function init() {
  setupEventListeners();
  await loadStorageData();
  applyLanguage(state.language);
  render();
  if (getItemsMissingMetadata().length > 0) {
    startMetadataFetch(false);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
