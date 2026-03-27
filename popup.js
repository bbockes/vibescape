const options = document.querySelectorAll(".theme-option");

function setActive(theme) {
  options.forEach((o) => o.classList.toggle("active", o.dataset.theme === theme));
}

chrome.storage.local.get({ vibeTheme: "twilight" }, (data) => {
  if (data?.vibeTheme) setActive(data.vibeTheme);
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

