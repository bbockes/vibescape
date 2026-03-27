(() => {
  const STYLE_ID = "vibescape-theme-style";
  const ATTR = "data-vibescape-theme";

  function getCss() {
    // CSS-only approach: no overlays, no fixed layers capturing input.
    // If we ever add pseudo-elements, keep pointer-events: none.
    return `
/* Vibescape: minimal, non-blocking theme layer */
:root[${ATTR}] {
  --vs-bg: #0d0a1a;
  --vs-fg: #e8d5ff;
  --vs-muted: rgba(232, 213, 255, 0.65);
  --vs-surface: rgba(255, 255, 255, 0.06);
  --vs-border: rgba(155, 89, 255, 0.35);
  --vs-accent: #9b59ff;
  --vs-accent-2: #c89dff;
  --vs-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  --vs-radius: 12px;
  --vs-font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  --vs-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

:root[${ATTR}="twilight"] {
  --vs-bg: #0d0a1a;
  --vs-fg: #e8d5ff;
  --vs-muted: rgba(232, 213, 255, 0.65);
  --vs-surface: rgba(155, 89, 255, 0.08);
  --vs-border: rgba(155, 89, 255, 0.35);
  --vs-accent: #9b59ff;
  --vs-accent-2: #c89dff;
  color-scheme: dark;
}

:root[${ATTR}="cleangirl"] {
  --vs-bg: #f5f2ee;
  --vs-fg: #2a2520;
  --vs-muted: rgba(42, 37, 32, 0.58);
  --vs-surface: rgba(42, 37, 32, 0.05);
  --vs-border: rgba(42, 37, 32, 0.18);
  --vs-accent: #8a7e74;
  --vs-accent-2: #2a2520;
  --vs-shadow: 0 16px 50px rgba(42, 37, 32, 0.12);
  color-scheme: light;
}

:root[${ATTR}="witchy"] {
  --vs-bg: #150e08;
  --vs-fg: #f2c77a;
  --vs-muted: rgba(242, 199, 122, 0.65);
  --vs-surface: rgba(212, 133, 10, 0.08);
  --vs-border: rgba(212, 133, 10, 0.35);
  --vs-accent: #d4850a;
  --vs-accent-2: #ff6b00;
  color-scheme: dark;
}

:root[${ATTR}="financebro"] {
  --vs-bg: #fafafa;
  --vs-fg: #0a0a0a;
  --vs-muted: rgba(10, 10, 10, 0.55);
  --vs-surface: rgba(10, 10, 10, 0.04);
  --vs-border: rgba(10, 10, 10, 0.18);
  --vs-accent: #0a0a0a;
  --vs-accent-2: #444;
  --vs-shadow: 8px 8px 0 rgba(10, 10, 10, 0.22);
  color-scheme: light;
}

/* Page background and base text */
html:root[${ATTR}], body:root[${ATTR}] {
  background: var(--vs-bg) !important;
  color: var(--vs-fg) !important;
}

/* Gentle background texture without blocking clicks */
html:root[${ATTR}="twilight"] {
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 80%, #1a0533 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%, #0a1a3a 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 50% 50%, #2d0845 0%, transparent 70%) !important;
  background-attachment: fixed !important;
}
html:root[${ATTR}="cleangirl"] {
  background-image:
    radial-gradient(ellipse 100% 50% at 0% 100%, #e8e0d8 0%, transparent 50%),
    radial-gradient(ellipse 60% 60% at 100% 0%, #ede8e2 0%, transparent 50%) !important;
  background-attachment: fixed !important;
}
html:root[${ATTR}="witchy"] {
  background-image:
    radial-gradient(ellipse 70% 50% at 50% 100%, #3d1a00 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 80% 30%, #1a0d00 0%, transparent 50%),
    radial-gradient(ellipse 60% 60% at 20% 20%, #0f1a05 0%, transparent 50%) !important;
  background-attachment: fixed !important;
}
html:root[${ATTR}="financebro"] {
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(0,0,0,0.06) 59px, rgba(0,0,0,0.06) 60px),
    repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(0,0,0,0.06) 59px, rgba(0,0,0,0.06) 60px) !important;
  background-attachment: fixed !important;
}

/* Don’t wreck page layout: keep changes scoped to visual styling */
:root[${ATTR}] body {
  font-family: var(--vs-font) !important;
}

/* Links and selection */
:root[${ATTR}] a, :root[${ATTR}] a:visited {
  color: var(--vs-accent-2) !important;
}
:root[${ATTR}] a:hover {
  color: var(--vs-accent) !important;
}
:root[${ATTR}] ::selection {
  background: color-mix(in srgb, var(--vs-accent) 35%, transparent) !important;
}

/* Common surfaces (inputs/buttons/cards-ish elements) */
:root[${ATTR}] input,
:root[${ATTR}] textarea,
:root[${ATTR}] select {
  background: var(--vs-surface) !important;
  color: var(--vs-fg) !important;
  border-color: var(--vs-border) !important;
  border-radius: 10px !important;
}
:root[${ATTR}] input::placeholder,
:root[${ATTR}] textarea::placeholder {
  color: var(--vs-muted) !important;
}
:root[${ATTR}] button,
:root[${ATTR}] [role="button"],
:root[${ATTR}] input[type="button"],
:root[${ATTR}] input[type="submit"] {
  background: var(--vs-surface) !important;
  color: var(--vs-fg) !important;
  border: 1px solid var(--vs-border) !important;
  border-radius: 999px !important;
  box-shadow: none !important;
}
:root[${ATTR}] button:hover,
:root[${ATTR}] [role="button"]:hover,
:root[${ATTR}] input[type="button"]:hover,
:root[${ATTR}] input[type="submit"]:hover {
  border-color: color-mix(in srgb, var(--vs-border) 55%, var(--vs-accent)) !important;
}

/* Focus rings: keep accessibility, make it pretty */
:root[${ATTR}] :focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vs-accent) 65%, white) !important;
  outline-offset: 2px !important;
}

/* Panels-ish: apply softly to common containers without nuking layouts */
:root[${ATTR}] :is(main, header, nav, section, article, aside, footer, form, dialog, [role="dialog"]) {
  color: var(--vs-fg) !important;
}
`;
  }

  function ensureStyleEl() {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      el.textContent = getCss();
      (document.head || document.documentElement).appendChild(el);
    }
    return el;
  }

  function applyTheme(theme) {
    if (!theme) return;
    ensureStyleEl();
    document.documentElement.setAttribute(ATTR, theme);
  }

  function clearTheme() {
    document.documentElement.removeAttribute(ATTR);
    const el = document.getElementById(STYLE_ID);
    if (el) el.remove();
  }

  function loadAndApply() {
    chrome.storage.local.get({ vibeTheme: "twilight", vibeEnabled: true }, (data) => {
      if (!data?.vibeEnabled) clearTheme();
      else applyTheme(data?.vibeTheme || "twilight");
    });
  }

  // Initial apply ASAP; storage callback will finalize.
  applyTheme("twilight");
  loadAndApply();

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.vibeEnabled) {
      if (changes.vibeEnabled.newValue) loadAndApply();
      else clearTheme();
    }
    if (changes.vibeTheme) {
      chrome.storage.local.get({ vibeEnabled: true }, (data) => {
        if (data?.vibeEnabled) applyTheme(changes.vibeTheme.newValue);
      });
    }
  });
})();

