/** Paste your walkthrough URL here once the video is up (Chrome footer toggle). */
const CHROME_FOOTER_HELP_VIDEO_URL = "";

/** URL for voting on the next inspired batch (popup link; opens in a new tab). */
const INSPIRED_VIBES_VOTE_URL = "";

/** If the user is already on Chrome's new-tab surface, load Vibescape without opening another tab. */
function activateNewTabSurfaceInActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs?.[0];
    if (!tab?.id) return;
    const raw = tab.url || tab.pendingUrl || "";
    const base = raw.split(/[#?]/)[0].toLowerCase();

    const isChromeNewTabSurface =
      base === "chrome://newtab" ||
      base === "chrome://newtab/" ||
      base.startsWith("chrome://newtab/") ||
      base === "chrome://new-tab-page" ||
      base === "chrome://new-tab-page/" ||
      base.startsWith("chrome://new-tab-page/");

    const isExtensionNewTabPage = /^chrome-extension:\/\/[^/]+\/newtab\.html$/i.test(base);

    if (isChromeNewTabSurface) {
      chrome.tabs.update(tab.id, { url: "chrome://newtab" });
    } else if (isExtensionNewTabPage) {
      chrome.tabs.reload(tab.id);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const powerToggle = document.getElementById("vibe-power-toggle");
  const powerLabel = document.getElementById("vibe-power-label");
  const cursorToggle = document.getElementById("vibe-cursor-toggle");
  const cursorLabel = document.getElementById("vibe-cursor-label");

  function setPowerUi(enabled) {
    const on = enabled !== false;
    if (powerToggle) {
      powerToggle.classList.toggle("power-toggle--off", !on);
      powerToggle.setAttribute("aria-checked", on ? "true" : "false");
    }
    if (powerLabel) powerLabel.textContent = on ? "on" : "off";
  }

  function setCursorUi(customOn) {
    const on = customOn !== false;
    if (cursorToggle) {
      cursorToggle.classList.toggle("power-toggle--off", !on);
      cursorToggle.setAttribute("aria-checked", on ? "true" : "false");
    }
    if (cursorLabel) cursorLabel.textContent = "cursor";
  }

  cursorToggle?.addEventListener("click", () => {
    chrome.storage.local.get({ vibeCustomCursors: true }, (d) => {
      const cur = d.vibeCustomCursors !== false;
      const next = !cur;
      chrome.storage.local.set({ vibeCustomCursors: next }, () => setCursorUi(next));
    });
  });

  powerToggle?.addEventListener("click", () => {
    chrome.storage.local.get({ vibeEnabled: true }, (d) => {
      const cur = d.vibeEnabled !== false;
      const next = !cur;
      chrome.storage.local.set({ vibeEnabled: next }, () => {
        setPowerUi(next);
        if (next) activateNewTabSurfaceInActiveTab();
      });
    });
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.vibeEnabled !== undefined) {
      setPowerUi(changes.vibeEnabled.newValue !== false);
    }
    if (changes.vibeCustomCursors !== undefined) {
      setCursorUi(changes.vibeCustomCursors.newValue !== false);
    }
  });

  const footerVideoLink = document.getElementById("chrome-footer-video-link");
  if (footerVideoLink) {
    const url = CHROME_FOOTER_HELP_VIDEO_URL.trim();
    if (url) {
      footerVideoLink.href = url;
      footerVideoLink.target = "_blank";
    } else {
      footerVideoLink.classList.add("chrome-footer-tip__link--pending");
      footerVideoLink.title = "Add your YouTube URL to CHROME_FOOTER_HELP_VIDEO_URL in popup.js";
      footerVideoLink.addEventListener("click", (e) => e.preventDefault());
    }
  }

  const inspiredVoteLink = document.getElementById("inspired-vibes-vote-link");
  if (inspiredVoteLink) {
    const voteUrl = INSPIRED_VIBES_VOTE_URL.trim();
    if (voteUrl) {
      inspiredVoteLink.href = voteUrl;
      inspiredVoteLink.target = "_blank";
    } else {
      inspiredVoteLink.classList.add("theme-section__stories-foot__link--pending");
      inspiredVoteLink.title = "Add your URL to INSPIRED_VIBES_VOTE_URL in popup.js";
      inspiredVoteLink.addEventListener("click", (e) => e.preventDefault());
    }
  }

  const themeListEl = document.querySelector(".theme-list");
  const prevBatchBtn = document.getElementById("prev-batch");
  const nextBatchBtn = document.getElementById("next-batch");
  const batchStatus = document.getElementById("batch-status");
  const PAGE_SIZE = 5;
  let currentPage = 0;
  const hasPager = !!prevBatchBtn && !!nextBatchBtn && !!batchStatus;

  /** Keep the Chrome footer tip below the fold: viewport height matches #popup-above-fold. */
  function schedulePopupFoldViewport() {
    const scrollEl = document.querySelector(".popup-scroll");
    const fold = document.getElementById("popup-above-fold");
    if (!fold) return;
    requestAnimationFrame(() => {
      const h = Math.ceil(fold.getBoundingClientRect().height);
      if (h > 0) {
        document.documentElement.style.setProperty("--popup-fold-px", `${h}px`);
      }
      if (scrollEl) scrollEl.scrollTop = 0;
    });
  }

  function getThemeRows() {
    if (!themeListEl) return [];
    return Array.from(themeListEl.querySelectorAll(".theme-option[data-theme]"));
  }

  function totalPages() {
    const n = getThemeRows().length;
    return Math.max(1, Math.ceil(n / PAGE_SIZE));
  }

  function updateStoriesSectionPagerHint() {
    const hint = document.getElementById("stories-section-pager-hint");
    const header = document.getElementById("stories-section-header");
    if (!hint) return;
    if (!hasPager) {
      hint.hidden = true;
      if (header) header.removeAttribute("title");
      return;
    }
    const themeRows = getThemeRows();
    if (!themeRows.length) {
      hint.hidden = true;
      if (header) header.removeAttribute("title");
      return;
    }
    const firstStories = themeRows.findIndex((row) => row.closest(".theme-section--stories"));
    const fs = firstStories >= 0 ? firstStories : themeRows.length;
    const end = currentPage * PAGE_SIZE + PAGE_SIZE;
    const showHint = fs < themeRows.length && end <= fs;
    hint.hidden = !showHint;
    if (header) {
      if (showHint) {
        header.title = 'Use "next" below to open more from inspired vibes — batch 01';
      } else {
        header.removeAttribute("title");
      }
    }
  }

  function updateOriginalSectionPagerHint() {
    const hint = document.getElementById("original-section-pager-hint");
    const header = document.getElementById("original-section-header");
    if (!hint) return;
    if (!hasPager) {
      hint.hidden = true;
      if (header) header.removeAttribute("title");
      return;
    }
    const themeRows = getThemeRows();
    if (!themeRows.length) {
      hint.hidden = true;
      if (header) header.removeAttribute("title");
      return;
    }
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const anyStoriesVisible = themeRows.some(
      (row, index) =>
        index >= start && index < end && row.closest(".theme-section--stories")
    );
    const show = anyStoriesVisible && currentPage > 0;
    hint.hidden = !show;
    if (header) {
      if (show) {
        header.title = 'Use "previous" below to open more from original vibes';
      } else {
        header.removeAttribute("title");
      }
    }
  }

  function updateInspiredVoteFootVisibility() {
    const foot = document.getElementById("inspired-vibes-vote-foot");
    if (!foot) return;
    const themeRows = getThemeRows();
    const start = hasPager ? currentPage * PAGE_SIZE : 0;
    const end = hasPager ? start + PAGE_SIZE : themeRows.length;
    const anyStoriesVisible = themeRows.some((row, index) => {
      if (!row.closest(".theme-section--stories")) return false;
      if (!hasPager) return true;
      return index >= start && index < end;
    });
    foot.hidden = !anyStoriesVisible;
  }

  /** Hide entire theme sections with no visible rows so the popup stays within Chrome’s 600px cap. */
  function updateThemeSectionVisibility() {
    if (!hasPager) {
      document.querySelectorAll(".theme-section").forEach((section) => {
        section.hidden = false;
      });
      return;
    }
    document.querySelectorAll(".theme-section").forEach((section) => {
      const rows = section.querySelectorAll(".theme-option[data-theme]");
      if (!rows.length) {
        section.hidden = false;
        return;
      }
      const anyVisible = Array.from(rows).some((row) => row.style.display !== "none");
      section.hidden = !anyVisible;
    });
  }

  function renderPage() {
    if (!hasPager) return;
    const themeRows = getThemeRows();
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    themeRows.forEach((option, index) => {
      option.style.display = index >= start && index < end ? "flex" : "none";
    });

    if (batchStatus) batchStatus.textContent = `batch ${currentPage + 1} of ${totalPages()}`;
    if (prevBatchBtn) prevBatchBtn.disabled = currentPage <= 0;
    if (nextBatchBtn) nextBatchBtn.disabled = currentPage >= totalPages() - 1;
    updateThemeSectionVisibility();
    updateStoriesSectionPagerHint();
    updateOriginalSectionPagerHint();
    updateInspiredVoteFootVisibility();
    schedulePopupFoldViewport();
  }

  function pageForTheme(theme) {
    const idx = getThemeRows().findIndex((o) => o.dataset.theme === theme);
    if (idx < 0) return 0;
    return Math.floor(idx / PAGE_SIZE);
  }

  function setActive(theme) {
    document.querySelectorAll(".theme-option[data-theme]").forEach((o) => {
      o.classList.toggle("active", o.dataset.theme === theme);
    });
  }

  function validThemesSet() {
    return new Set(getThemeRows().map((r) => r.dataset.theme));
  }

  function themeRowLabel(row) {
    const nameEl = row.querySelector(".theme-name");
    const label = nameEl?.textContent?.trim();
    return label || row.dataset.theme || "theme";
  }

  function normalizeFavorites(raw) {
    if (!Array.isArray(raw)) return [];
    const ok = validThemesSet();
    return raw.filter((id) => typeof id === "string" && ok.has(id));
  }

  function injectFavoriteButtons() {
    getThemeRows().forEach((row) => {
      if (row.querySelector(".theme-fav-btn")) return;
      const theme = row.dataset.theme;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-fav-btn";
      btn.dataset.theme = theme;
      btn.textContent = "☆";
      btn.setAttribute("aria-label", `Add ${themeRowLabel(row)} to favorites`);
      btn.setAttribute("aria-pressed", "false");
      row.insertBefore(btn, row.firstChild);
    });
  }

  function applyFavoriteUi(favoritesOrdered) {
    const favSet = new Set(favoritesOrdered);
    document.querySelectorAll(".theme-fav-btn").forEach((btn) => {
      const on = favSet.has(btn.dataset.theme);
      const row = btn.closest(".theme-option");
      const label = row ? themeRowLabel(row) : btn.dataset.theme;
      btn.classList.toggle("theme-fav-btn--on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "★" : "☆";
      btn.setAttribute(
        "aria-label",
        on ? `Remove ${label} from favorites` : `Add ${label} to favorites`
      );
    });
    getThemeRows().forEach((row) => {
      row.classList.toggle("is-favorite", favSet.has(row.dataset.theme));
    });
  }

  function sortFavoritesFirst(favoritesOrdered) {
    if (!themeListEl) return;
    const bodies = themeListEl.querySelectorAll(".theme-section__body");
    if (bodies.length) {
      bodies.forEach((body) => {
        const rows = Array.from(body.querySelectorAll(".theme-option[data-theme]"));
        const favSet = new Set(favoritesOrdered);
        const favRows = favoritesOrdered.map((id) => rows.find((r) => r.dataset.theme === id)).filter(Boolean);
        const rest = rows.filter((r) => !favSet.has(r.dataset.theme));
        [...favRows, ...rest].forEach((r) => body.appendChild(r));
      });
      return;
    }
    const rows = getThemeRows();
    const favSet = new Set(favoritesOrdered);
    const favRows = favoritesOrdered.map((id) => rows.find((r) => r.dataset.theme === id)).filter(Boolean);
    const rest = rows.filter((r) => !favSet.has(r.dataset.theme));
    [...favRows, ...rest].forEach((r) => themeListEl.appendChild(r));
  }

  function toggleFavorite(themeId) {
    chrome.storage.local.get({ vibeFavoriteThemes: [] }, (d) => {
      let list = normalizeFavorites(d.vibeFavoriteThemes);
      const i = list.indexOf(themeId);
      if (i >= 0) list.splice(i, 1);
      else list.push(themeId);
      chrome.storage.local.set({ vibeFavoriteThemes: list }, () => {
        applyFavoriteUi(list);
        renderPage();
      });
    });
  }

  chrome.storage.local.get(
    {
      vibeTheme: "twilight",
      vibeEnabled: true,
      vibeCustomCursors: true,
      vibeFavoriteThemes: [],
    },
    (data) => {
      injectFavoriteButtons();
      const raw = Array.isArray(data.vibeFavoriteThemes) ? data.vibeFavoriteThemes : [];
      const favs = normalizeFavorites(raw);
      const valid = validThemesSet();
      if (favs.length !== raw.length || raw.some((id) => typeof id !== "string" || !valid.has(id))) {
        chrome.storage.local.set({ vibeFavoriteThemes: favs });
      }
      sortFavoritesFirst(favs);
      applyFavoriteUi(favs);
      setPowerUi(data?.vibeEnabled !== false);
      setCursorUi(data?.vibeCustomCursors !== false);
      if (data?.vibeTheme) setActive(data.vibeTheme);
      if (hasPager) {
        currentPage = pageForTheme(data?.vibeTheme || "twilight");
        renderPage();
      } else {
        updateThemeSectionVisibility();
        updateInspiredVoteFootVisibility();
        schedulePopupFoldViewport();
      }
    }
  );

  document.querySelectorAll(".theme-option[data-theme]").forEach((option) => {
    option.addEventListener("click", (e) => {
      const favBtn = e.target.closest(".theme-fav-btn");
      if (favBtn?.dataset.theme) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(favBtn.dataset.theme);
        return;
      }
      const theme = option.dataset.theme;
      chrome.storage.local.set({ vibeTheme: theme });
      setActive(theme);
      window.close();
    });
  });

  if (hasPager) {
    prevBatchBtn.addEventListener("click", () => {
      currentPage = Math.max(0, currentPage - 1);
      renderPage();
    });

    nextBatchBtn.addEventListener("click", () => {
      currentPage = Math.min(totalPages() - 1, currentPage + 1);
      renderPage();
    });
  }

  const foldForResize = document.getElementById("popup-above-fold");
  if (foldForResize && typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => schedulePopupFoldViewport());
    ro.observe(foldForResize);
  }
});

