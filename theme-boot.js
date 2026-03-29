/* Apply cached theme class before the rest of the body parses (avoids FOUC). */
(function () {
  document.title = "Vibescape | New Tab";
  try {
    var t = localStorage.getItem("vibeTheme");
    if (!t || typeof t !== "string") return;
    if (!/^[a-z][a-z0-9]{0,47}$/.test(t)) return;
    document.body.classList.add(t);
    document.body.dataset.theme = t;
  } catch (e) {
    /* ignore quota / private mode */
  }
})();
