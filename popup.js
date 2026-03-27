/** Paste your walkthrough URL here once the video is up (Chrome footer toggle). */
const CHROME_FOOTER_HELP_VIDEO_URL = "";

document.addEventListener("DOMContentLoaded", () => {
  const powerToggle = document.getElementById("vibe-power-toggle");
  const powerLabel = document.getElementById("vibe-power-label");

  function setPowerUi(enabled) {
    const on = enabled !== false;
    if (powerToggle) {
      powerToggle.classList.toggle("power-toggle--off", !on);
      powerToggle.setAttribute("aria-checked", on ? "true" : "false");
    }
    if (powerLabel) powerLabel.textContent = on ? "on" : "off";
  }

  powerToggle?.addEventListener("click", () => {
    chrome.storage.local.get({ vibeEnabled: true }, (d) => {
      const cur = d.vibeEnabled !== false;
      const next = !cur;
      chrome.storage.local.set({ vibeEnabled: next }, () => setPowerUi(next));
    });
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || changes.vibeEnabled === undefined) return;
    setPowerUi(changes.vibeEnabled.newValue !== false);
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

  const options = document.querySelectorAll(".theme-option");
  const prevBatchBtn = document.getElementById("prev-batch");
  const nextBatchBtn = document.getElementById("next-batch");
  const batchStatus = document.getElementById("batch-status");
  const PAGE_SIZE = 5;
  const themeOptions = Array.from(options).filter((o) => !!o.dataset.theme);
  let currentPage = 0;
  const hasPager = !!prevBatchBtn && !!nextBatchBtn && !!batchStatus;

  function totalPages() {
    return Math.max(1, Math.ceil(themeOptions.length / PAGE_SIZE));
  }

  function renderPage() {
    if (!hasPager) return;
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    themeOptions.forEach((option, index) => {
      option.style.display = index >= start && index < end ? "flex" : "none";
    });

    if (batchStatus) batchStatus.textContent = `batch ${currentPage + 1} of ${totalPages()}`;
    if (prevBatchBtn) prevBatchBtn.disabled = currentPage <= 0;
    if (nextBatchBtn) nextBatchBtn.disabled = currentPage >= totalPages() - 1;
  }

  function pageForTheme(theme) {
    const idx = themeOptions.findIndex((o) => o.dataset.theme === theme);
    if (idx < 0) return 0;
    return Math.floor(idx / PAGE_SIZE);
  }

  function setActive(theme) {
    options.forEach((o) => o.classList.toggle("active", o.dataset.theme === theme));
  }

  chrome.storage.local.get({ vibeTheme: "twilight", vibeEnabled: true }, (data) => {
    setPowerUi(data?.vibeEnabled !== false);
    if (data?.vibeTheme) setActive(data.vibeTheme);
    if (hasPager) {
      currentPage = pageForTheme(data?.vibeTheme || "twilight");
      renderPage();
    }
  });

  options.forEach((option) => {
    if (!option.dataset.theme) return;
    option.addEventListener("click", () => {
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
});

