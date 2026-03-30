// ── NEW TAB GATE (top of file; MV3 new-tab page disallows inline scripts; keep gate in this file) ──
(function () {
  chrome.storage.local.get({ vibeEnabled: true }, (data) => {
    if (data.vibeEnabled === false) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const t = tabs?.[0];
        if (t?.id != null) {
          chrome.tabs.update(t.id, { url: "chrome://new-tab-page" });
        }
      });
      return;
    }
    document.documentElement.classList.add("vibe-enabled");
  });
})();

// ── THEME DATA ───────────────────────────────────────────────────────
const themes = {
  twilight: {
    searchPlaceholder: "search the void..."
  },
  cleangirl: {
    searchPlaceholder: "search something..."
  },
  witchy: {
    searchPlaceholder: "seek what calls to you..."
  },
  financebro: {
    searchPlaceholder: "// search query..."
  },
  neonnocturne: {
    searchPlaceholder: "trace signal in the noise..."
  },
  librarydusk: {
    searchPlaceholder: "look up a thought worth keeping..."
  },
  oceanglass: {
    searchPlaceholder: "drift toward what matters..."
  },
  brutalredacted: {
    searchPlaceholder: "> run query"
  },
  commonroom: {
    searchPlaceholder: "ink your inquiry upon the scroll…"
  },
  starcartographer: {
    searchPlaceholder: "plot a course..."
  },
  solarpunkgarden: {
    searchPlaceholder: "grow a better question..."
  },
  zenink: {
    searchPlaceholder: "one clear query..."
  },
  retrofuturearcade: {
    searchPlaceholder: "insert query to continue..."
  },
  desertminimal: {
    searchPlaceholder: "search the quiet horizon..."
  },
  alpinefjord: {
    searchPlaceholder: "find clear air ideas..."
  },
  spacesalvage: {
    searchPlaceholder: "scan the outer belt..."
  },
  gothicmanor: {
    searchPlaceholder: "search by candlelight..."
  },
  cybersamurai: {
    searchPlaceholder: "execute precise query..."
  },
  cottagealchemy: {
    searchPlaceholder: "gather ingredients..."
  },
  cosmicwestern: {
    searchPlaceholder: "track starlight trails..."
  },
  vhsparanormal: {
    searchPlaceholder: "rewind and search..."
  },
  mechhangar: {
    searchPlaceholder: "run systems diagnostic..."
  },
  opalinecourt: {
    searchPlaceholder: "seek silver-thread answers..."
  },
  tyrellnoir: {
    searchPlaceholder: "trace one more lead through the rain..."
  },
  arrakisstone: {
    searchPlaceholder: "cross the open dune of thought..."
  },
  matrixfall: {
    searchPlaceholder: ""
  },
  rivendelleve: {
    searchPlaceholder: "consult the old maps..."
  },
  mendlpastel: {
    searchPlaceholder: "compose with confection precision..."
  },
  topiaryshadow: {
    searchPlaceholder: "trim the hedge of your doubts..."
  },
  inkversepop: {
    searchPlaceholder: "search ink-and-glass keywords..."
  },
  bridesvengeance: {
    searchPlaceholder: "name your list, begin..."
  },
  rabbitholedream: {
    searchPlaceholder: "curious little pocket-sized queries..."
  },
  ratatouille: {
    searchPlaceholder: "sniff out the perfect query..."
  },
  lanternnarnia: {
    searchPlaceholder: "step through the frost-door of ideas..."
  },
  droogclockwork: {
    searchPlaceholder: "ultra-clear query, yeah?..."
  },
  gatsbygilded: {
    searchPlaceholder: "chase the harbor glow..."
  },
  bathspirited: {
    searchPlaceholder: "rinse one name you forgot..."
  },
  swampfable: {
    searchPlaceholder: "search in layers—keep peeling..."
  },
  gothamvigil: {
    searchPlaceholder: "scan the skyline..."
  },
  kanedared: {
    searchPlaceholder: "trace one signal through the concrete"
  },
  wickiesmono: {
    searchPlaceholder: "log the watch... type the fog..."
  },
  emeraldmyth: {
    searchPlaceholder: "follow the thread of gold..."
  },
  furyroadheat: {
    searchPlaceholder: "punch it through the wasteland..."
  },
  islasplice: {
    searchPlaceholder: "query the genome fence..."
  },
  dreamhousepop: {
    searchPlaceholder: "search like everything is possible..."
  },
  discoverywhite: {
    searchPlaceholder: "open the white corridor channel..."
  },
  grandlinesea: {
    searchPlaceholder: "chart the next island..."
  },
  openingcrawl: {
    searchPlaceholder: "search the deep-sky archives..."
  },
  frozenheart: {
    searchPlaceholder: "search the long winter..."
  },
  lalaland: {
    searchPlaceholder: "search for the violet skyline..."
  },
  titanicvow: {
    searchPlaceholder: "search the horizon..."
  },
};

const THEME_NAMES = Object.keys(themes);

const VIBE_DOCUMENT_TITLE = "Vibescape | New Tab";

/** Matches popup "Inspired vibes — batch 01" (Pro). Random skips these. */
const PRO_THEME_IDS = new Set([
  "ratatouille",
  "commonroom",
  "inkversepop",
  "lanternnarnia",
  "openingcrawl",
  "rivendelleve",
  "tyrellnoir",
  "arrakisstone",
  "matrixfall",
  "bathspirited",
  "mendlpastel",
  "topiaryshadow",
  "bridesvengeance",
  "rabbitholedream",
  "wickiesmono",
  "emeraldmyth",
  "kanedared",
  "gatsbygilded",
  "swampfable",
  "grandlinesea",
  "gothamvigil",
  "discoverywhite",
  "furyroadheat",
  "islasplice",
  "dreamhousepop",
  "droogclockwork",
  "frozenheart",
  "lalaland",
  "titanicvow",
]);

const RANDOM_THEME_POOL = THEME_NAMES.filter((id) => !PRO_THEME_IDS.has(id));
const PRO_THEME_POOL = THEME_NAMES.filter((id) => PRO_THEME_IDS.has(id));

/** Shuffled ring per pool (Pro vs regular); Random advances so no consecutive repeat until full loop. */
const randomThemeCycle = {
  pro: { poolKey: "", order: [] },
  regular: { poolKey: "", order: [] },
};

function shuffleThemeCycleOrder(ids) {
  const a = ids.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
}

function getShuffledCycleOrder(poolKind, pool) {
  const st = randomThemeCycle[poolKind];
  const poolKey = pool.join("\0");
  if (st.poolKey !== poolKey || st.order.length !== pool.length) {
    st.poolKey = poolKey;
    st.order = shuffleThemeCycleOrder(pool);
  }
  return st.order;
}

function getCurrentTheme() {
  const t = document.body.dataset.theme;
  return t && themes[t] ? t : "twilight";
}

function setBodyThemeClass(theme) {
  const resolved = themes[theme] ? theme : "twilight";
  THEME_NAMES.forEach((name) => document.body.classList.remove(name));
  document.body.classList.add(resolved);
  document.body.dataset.theme = resolved;
  document.title = VIBE_DOCUMENT_TITLE;
  try {
    localStorage.setItem("vibeTheme", resolved);
  } catch (e) {
    /* ignore */
  }
}

function setupMotionPreference() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

  const sync = () => {
    const reduced = mq.matches;
    document.body.classList.toggle("motion-reduced", reduced);
    document.body.classList.toggle("motion-enabled", !reduced);
    syncMatrixRain();
  };

  sync();
  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", sync);
  } else if (typeof mq.addListener === "function") {
    mq.addListener(sync);
  }
}

// ── CLOCK ────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const hour24 = now.getHours();
  const h12 = hour24 % 12 || 12;
  const h = String(h12).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}`;

  const hour = hour24;
  const greetings = {
    twilight:
      hour < 5
        ? "still awake, i see"
        : hour < 12
          ? "good morning, starlight"
          : hour < 17
            ? "drifting through the afternoon"
            : "good evening, dreamer",
    cleangirl:
      hour < 5
        ? "couldn't sleep either"
        : hour < 12
          ? "good morning"
          : hour < 17
            ? "good afternoon"
            : "good evening",
    witchy:
      hour < 5
        ? "the witching hour"
        : hour < 12
          ? "blessed morning"
          : hour < 17
            ? "the day turns"
            : "dusk descends",
    financebro:
      hour < 5
        ? `markets open in ${9 - hour}h`
        : hour < 12
          ? "pre-market grind"
          : hour < 17
            ? "market hours"
            : "after-hours",
    neonnocturne:
      hour < 5
        ? "after-hours energy"
        : hour < 12
          ? "signal check"
          : hour < 17
            ? "daylight debug"
            : "night mode active",
    librarydusk:
      hour < 5
        ? "one more chapter"
        : hour < 12
          ? "quiet morning pages"
          : hour < 17
            ? "afternoon study hall"
            : "evening reading light",
    oceanglass:
      hour < 5
        ? "tide is low, mind is clear"
        : hour < 12
          ? "gentle morning current"
          : hour < 17
            ? "drifting through daylight"
            : "sunset over calm water",
    brutalredacted:
      hour < 5
        ? "build mode: focused"
        : hour < 12
          ? "clear intent"
          : hour < 17
            ? "deep work block"
            : "shutdown checklist",
    commonroom:
      hour < 5
        ? "midnight oil and candlelit portraits"
        : hour < 12
          ? "ember-quiet before breakfast"
          : hour < 17
            ? "afternoon light through stone arches"
            : "firelight symphonies and exam dread",
    starcartographer:
      hour < 5
        ? "charting the midnight sky"
        : hour < 12
          ? "morning coordinates"
          : hour < 17
            ? "surveying bright horizons"
            : "starlight navigation",
    solarpunkgarden:
      hour < 5
        ? "pre-dawn greenhouse"
        : hour < 12
          ? "sunrise systems check"
          : hour < 17
            ? "afternoon growth cycle"
            : "sunset community hour",
    zenink:
      hour < 5
        ? "quiet dawn practice"
        : hour < 12
          ? "clear morning breath"
          : hour < 17
            ? "steady afternoon brush"
            : "evening stillness",
    retrofuturearcade:
      hour < 5
        ? "night mode bonus round"
        : hour < 12
          ? "press start"
          : hour < 17
            ? "combo chain active"
            : "continue? yes",
    desertminimal:
      hour < 5
        ? "cool desert dawn"
        : hour < 12
          ? "clean morning light"
          : hour < 17
            ? "high noon focus"
            : "warm dusk quiet",
    alpinefjord:
      hour < 5
        ? "northern dawn watch"
        : hour < 12
          ? "fresh mountain start"
          : hour < 17
            ? "clear-air momentum"
            : "fjord twilight calm",
    spacesalvage:
      hour < 5 ? "graveyard shift in orbit" : hour < 12 ? "morning flight checks" : hour < 17 ? "salvage run active" : "docking at dusk",
    gothicmanor:
      hour < 5 ? "the corridor creaks" : hour < 12 ? "foggy morning wings" : hour < 17 ? "long shadow hour" : "thunder at twilight",
    cybersamurai:
      hour < 5 ? "silent dojo mode" : hour < 12 ? "morning kata" : hour < 17 ? "precision block" : "night protocol",
    cottagealchemy:
      hour < 5 ? "dawn tea steeping" : hour < 12 ? "garden morning" : hour < 17 ? "herb-drying hour" : "fireside tonic",
    cosmicwestern:
      hour < 5 ? "campfire under stars" : hour < 12 ? "sun-up saddle" : hour < 17 ? "high noon trail" : "sunset roundup",
    vhsparanormal:
      hour < 5 ? "after-midnight signal" : hour < 12 ? "faded morning tape" : hour < 17 ? "strange daytime static" : "prime-time haunting",
    mechhangar:
      hour < 5 ? "maintenance night shift" : hour < 12 ? "systems green" : hour < 17 ? "hangar operations" : "shutdown sequence",
    opalinecourt:
      hour < 5 ? "moonlit court" : hour < 12 ? "morning audience" : hour < 17 ? "afternoon gala prep" : "evening procession",
    tyrellnoir:
      hour < 5 ? "rain at four a.m." : hour < 12 ? "chrome dawn" : hour < 17 ? "hazy afternoon heat" : "neon runoff night",
    arrakisstone:
      hour < 5 ? "first wind before sun" : hour < 12 ? "salt-flat morning" : hour < 17 ? "high sun discipline" : "siesta cool",
    matrixfall:
      hour < 5 ? "signal in the noise" : hour < 12 ? "green morning cascade" : hour < 17 ? "simulated daylight block" : "operator hours",
    rivendelleve:
      hour < 5 ? "forest watch" : hour < 12 ? "misty departure hour" : hour < 17 ? "council daylight" : "evening hymn",
    mendlpastel:
      hour < 5 ? "lobby insomnia" : hour < 12 ? "pastel breakfast service" : hour < 17 ? "symmetrical afternoon" : "evening turn-down, lobby quiet",
    topiaryshadow:
      hour < 5 ? "snow on sculpted hedges" : hour < 12 ? "suburban gothic coffee" : hour < 17 ? "long shadow lawns" : "handmade dusk",
    inkversepop:
      hour < 5 ? "after-midnight panel" : hour < 12 ? "splash page morning" : hour < 17 ? "stutter-step afternoon" : "late press night shift",
    bridesvengeance:
      hour < 5 ? "list item: dead hour" : hour < 12 ? "yellow morning clarity" : hour < 17 ? "blade-bright afternoon" : "vengeance weather",
    rabbitholedream:
      hour < 5 ? "late tea nonsense" : hour < 12 ? "shrinking morning" : hour < 17 ? "croquet o'clock somewhere" : "teacup-down-the-hall night",
    ratatouille:
      hour < 5
        ? "chef's table after midnight"
        : hour < 12
          ? "paris kitchen prep light"
          : hour < 17
            ? "service window glow"
            : "dinner hour at the old bistro",
    lanternnarnia:
      hour < 5 ? "lamppost watch" : hour < 12 ? "thawing morning" : hour < 17 ? "forest council hour" : "long-winter easing",
    droogclockwork:
      hour < 5 ? "sharp-orange hour" : hour < 12 ? "sharp-dressed harmattan" : hour < 17 ? "midtown milk-bar sun" : "ultra night out",
    gatsbygilded:
      hour < 5 ? "last boat ashore" : hour < 12 ? "north-shore coffee" : hour < 17 ? "roaring-twenties glow" : "harbor-glow hour",
    bathspirited:
      hour < 5 ? "train at the flood" : hour < 12 ? "vapor morning steam" : hour < 17 ? "spirit shift change" : "moon on the bathhouse",
    swampfable:
      hour < 5 ? "onion-layer insomnia" : hour < 12 ? "rope-bridge morning" : hour < 17 ? "storybook roast hour" : "far green hills night",
    gothamvigil:
      hour < 5 ? "rooftop watch" : hour < 12 ? "tower-row daylight" : hour < 17 ? "river-dock smog" : "rooftop-beacon rain",
    kanedared:
      hour < 5 ? "neon harbor afterburn" : hour < 12 ? "concrete dawn patrol" : hour < 17 ? "highway prism glare" : "red taillight weather",
    wickiesmono:
      hour < 5 ? "beacon on the rock" : hour < 12 ? "salt-etched morning" : hour < 17 ? "gull scream shift" : "fresnel nightmare night",
    emeraldmyth:
      hour < 5 ? "twister dreams, still spinning" : hour < 12 ? "gold-path morning" : hour < 17 ? "emerald haze" : "red-shoe dusk",
    furyroadheat:
      hour < 5 ? "pre-dawn convoy hour" : hour < 12 ? "chrome-rig dawn run" : hour < 17 ? "chrome glare noon" : "flame-axe night",
    islasplice:
      hour < 5 ? "exhibit yard quiet" : hour < 12 ? "main hall opens" : hour < 17 ? "fence integrity check" : "when exhibits ruled the night",
    dreamhousepop:
      hour < 5 ? "after-party malibu glow" : hour < 12 ? "perfectly plastic morning" : hour < 17 ? "beach montage sunlight" : "magenta-mold night out",
    discoverywhite:
      hour < 5 ? "sleep-cycle drift" : hour < 12 ? "white-corridor daylight" : hour < 17 ? "outer-planet calm" : "threshold night",
    grandlinesea:
      hour < 5
        ? "compass steady at midnight"
        : hour < 12
          ? "early-sea morning tide"
          : hour < 17
            ? "bright-hull midday course"
            : "open-ocean dusk wake",
    openingcrawl:
      hour < 5
        ? "jump drift, lights dimmed"
        : hour < 12
          ? "a new day past the rim"
          : hour < 17
            ? "twin dawn, high in the sky"
            : "back-room hours somewhere",
    frozenheart:
      hour < 5 ? "frost hall at blue hour" : hour < 12 ? "morning thaw and cocoa" : hour < 17 ? "snowlight on the fjord" : "northern lights, warm hearth",
    lalaland:
      hour < 5 ? "after the last set" : hour < 12 ? "ridge-line dawn, hazy pink" : hour < 17 ? "traffic jam, jazz in the car" : "planetarium night, stars close",
    titanicvow:
      hour < 5 ? "watch in the crow's nest" : hour < 12 ? "atlantic morning glitter" : hour < 17 ? "deck chairs, full steam" : "midnight ocean, heart full",
  };

  const currentTheme = getCurrentTheme();
  document.getElementById("greeting").textContent = greetings[currentTheme] || greetings.twilight;

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const dateStr = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`;
  document.getElementById("dateline").textContent =
    currentTheme === "financebro" ? `// ${dateStr.toUpperCase()} — Q${Math.ceil((now.getMonth() + 1) / 3)}` : dateStr;
}

setInterval(updateClock, 1000);
updateClock();

// ── MATRIX: TYPED PLACEHOLDER (Typed.js, lib/typed.umd.js) ───────────
let matrixTypedAnim = null;
let matrixTypedPlaceholderTimeout = null;
/** One Typed run per tab; new tab = new document (resets). */
let matrixTypedOneShotUsedThisTab = false;
/** True while the code-rain intro rAF is running (see MATRIX CODE RAIN). */
let matrixRainPlaying = false;
const MATRIX_TYPED_PLACEHOLDER_AFTER_INTRO_MS = 5000;

/** Three lines, then backspace the third; final entry is empty so nothing stays in the field. */
const MATRIX_TYPED_STRINGS = [
  "Wake up, Neo...",
  "The Matrix has you...",
  "Follow the white rabbit.",
  "",
];
const MATRIX_TYPED_FINAL_PLACEHOLDER = "";

function clearMatrixTypedPlaceholderDelay() {
  if (matrixTypedPlaceholderTimeout == null) return;
  clearTimeout(matrixTypedPlaceholderTimeout);
  matrixTypedPlaceholderTimeout = null;
}

function destroyMatrixTypedAnim() {
  if (!matrixTypedAnim) return;
  try {
    matrixTypedAnim.destroy();
  } catch (_) {
    /* ignore */
  }
  matrixTypedAnim = null;
}

/** Tear down Typed after the sequence ends so it cannot restart (Typed can re-call begin() after backspace). */
function finalizeMatrixTypedPlaceholder(typedInstance) {
  matrixTypedAnim = null;
  queueMicrotask(() => {
    try {
      if (typedInstance && typeof typedInstance.destroy === "function") typedInstance.destroy();
    } catch (_) {
      /* ignore */
    }
    const el = document.getElementById("search");
    if (el && getCurrentTheme() === "matrixfall") {
      el.placeholder = MATRIX_TYPED_FINAL_PLACEHOLDER;
    }
  });
}

function scheduleMatrixTypedAfterIntroDelay() {
  clearMatrixTypedPlaceholderDelay();
  if (getCurrentTheme() !== "matrixfall" || document.body.classList.contains("motion-reduced")) return;
  if (typeof Typed === "undefined") return;
  if (matrixTypedOneShotUsedThisTab) return;
  matrixTypedPlaceholderTimeout = setTimeout(() => {
    matrixTypedPlaceholderTimeout = null;
    startMatrixTypedPlaceholder();
  }, MATRIX_TYPED_PLACEHOLDER_AFTER_INTRO_MS);
}

function startMatrixTypedPlaceholder() {
  const input = document.getElementById("search");
  if (!input || getCurrentTheme() !== "matrixfall" || typeof Typed === "undefined") return;
  if (matrixTypedAnim || matrixTypedOneShotUsedThisTab) return;
  matrixTypedOneShotUsedThisTab = true;
  input.setAttribute("placeholder", "");
  matrixTypedAnim = new Typed(".auto-type", {
    strings: MATRIX_TYPED_STRINGS,
    typeSpeed: 100,
    backSpeed: 30,
    backDelay: 1400,
    showCursor: false,
    attr: "placeholder",
    loop: false,
    loopCount: 1,
    smartBackspace: false,
    onComplete: (typedInstance) => {
      finalizeMatrixTypedPlaceholder(typedInstance);
    },
  });
}

function applySearchPlaceholder(themeName) {
  const input = document.getElementById("search");
  if (!input) return;
  clearMatrixTypedPlaceholderDelay();
  destroyMatrixTypedAnim();
  const resolved = themes[themeName] ? themeName : "twilight";
  const reduced = document.body.classList.contains("motion-reduced");

  if (resolved === "matrixfall" && typeof Typed !== "undefined") {
    if (matrixTypedOneShotUsedThisTab) {
      input.placeholder = MATRIX_TYPED_FINAL_PLACEHOLDER;
      return;
    }
    input.setAttribute("placeholder", "");
    if (reduced || !matrixRainPlaying) {
      scheduleMatrixTypedAfterIntroDelay();
    }
  } else {
    input.placeholder = (themes[resolved] || themes.twilight).searchPlaceholder;
  }
}

(function bindMatrixTypedSearchFocus() {
  const input = document.getElementById("search");
  if (!input) return;
  input.addEventListener("focus", () => {
    if (getCurrentTheme() !== "matrixfall") return;
    clearMatrixTypedPlaceholderDelay();
    if (matrixTypedAnim) destroyMatrixTypedAnim();
    input.setAttribute("placeholder", "");
  });
  input.addEventListener("blur", () => {
    if (input.value.trim()) return;
    if (getCurrentTheme() !== "matrixfall") return;
    clearMatrixTypedPlaceholderDelay();
    destroyMatrixTypedAnim();
    if (matrixTypedOneShotUsedThisTab) {
      input.placeholder = MATRIX_TYPED_FINAL_PLACEHOLDER;
    } else {
      input.setAttribute("placeholder", "");
      scheduleMatrixTypedAfterIntroDelay();
    }
  });
})();

// ── QUOTE (disabled — no third-party quoted text for shipping) ───────
function setQuote(themeName) {
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("quote-author");
  if (quoteEl) quoteEl.textContent = "";
  if (authorEl) authorEl.textContent = "";
  applySearchPlaceholder(themeName);
}

// ── STARS ────────────────────────────────────────────────────────────
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function generateStars(count) {
  stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function drawStars(theme) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (theme !== "twilight" && theme !== "witchy" && theme !== "openingcrawl") return;
  const color =
    theme === "witchy" ? "212, 133, 10" : theme === "openingcrawl" ? "235, 242, 255" : "232, 213, 255";
  const t = Date.now() * 0.001;
  stars.forEach((s) => {
    const o = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 200 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${o * 0.9})`;
    ctx.fill();
  });
  requestAnimationFrame(() => drawStars(getCurrentTheme()));
}

resizeCanvas();
generateStars(180);
drawStars("twilight");
window.addEventListener("resize", () => {
  resizeCanvas();
  generateStars(180);
  resizeMatrixRainCanvas();
});

// ── MATRIX CODE RAIN (matrixfall): dense one-shot intro, fades to black ─
const matrixRainCanvas = document.getElementById("matrix-rain");
let matrixRainCtx = null;
let matrixRainIntroRaf = 0;
let matrixRainY = [];
/** Per-column: if true, glyphs skew toward digits (not all columns). */
let matrixRainColDigitHeavy = [];
/** Readable “screen character” size; column/line spacing follows on resize. */
let matrixRainFontPx = 20;
let matrixRainColStep = 12;
let matrixRainLineStep = 18;
let matrixRainFallStep = 7;
/** Glyphs drawn up the column each tick; set in resize from viewport height (~full-screen trail). */
let matrixRainStackDepth = 12;
const MATRIX_RAIN_STEP_MS = 95;
const MATRIX_INTRO_DURATION_MS = 6500;
/**
 * Glyphs from reference stills: katakana seen on screen + Latin capitals, digits, symbols.
 */
const MATRIX_RAIN_GLYPHS =
  "ハホチトニユヲミヌレメサシヱフルナキケコテレヨモツワン" +
  "MVUTERCXHIYBDWLAO" +
  "0123456789" +
  "*:><=+|\"";
/** Alternating “electric” greens — varies per column + row for CRT-style flicker. */
const MATRIX_RAIN_GLOW_GREENS = [
  [48, 255, 72],
  [0, 255, 110],
  [72, 255, 58],
  [32, 255, 140],
  [88, 255, 92],
  [16, 255, 98],
];
const MATRIX_RAIN_DIGITS = "0123456789";
/** ~1 in 3 columns leans digit-heavy (like the “mostly numbers” reference); others stay mixed. */
const MATRIX_RAIN_DIGIT_HEAVY_COL_CHANCE = 0.36;
const MATRIX_RAIN_DIGIT_PICK_IN_HEAVY_COL = 0.72;

let matrixRainLastStep = 0;
let matrixRainIntroStart = 0;
let matrixFallIntroRanThisPage = false;

function resizeMatrixRainCanvas() {
  if (!matrixRainCanvas) return;
  matrixRainCanvas.width = window.innerWidth;
  matrixRainCanvas.height = window.innerHeight;
  const bw = matrixRainCanvas.width;
  /* Smaller cells + fewer columns vs search-bar sizing — lighter rain on the page. */
  matrixRainFontPx = Math.round(Math.max(13, Math.min(20, bw * 0.013)));
  matrixRainColStep = Math.max(7, Math.round(matrixRainFontPx * 0.52));
  matrixRainLineStep = Math.max(10, Math.round(matrixRainFontPx * 0.78));
  matrixRainFallStep = Math.max(4, Math.round(matrixRainFontPx * 0.28));
  const cols = Math.floor(bw / matrixRainColStep) + 1;
  const h = matrixRainCanvas.height;
  matrixRainStackDepth = Math.min(40, Math.max(10, Math.ceil(h / matrixRainLineStep) + 5));
  if (matrixRainY.length !== cols || matrixRainColDigitHeavy.length !== cols) {
    const prev = matrixRainY;
    const prevHeavy = matrixRainColDigitHeavy;
    matrixRainY = Array.from({ length: cols }, (_, i) =>
      prev[i] !== undefined ? prev[i] : Math.random() * h * 1.5 - h * 0.45
    );
    matrixRainColDigitHeavy = Array.from({ length: cols }, (_, i) =>
      prevHeavy[i] !== undefined ? prevHeavy[i] : Math.random() < MATRIX_RAIN_DIGIT_HEAVY_COL_CHANCE
    );
  }
}

function pickMatrixRainGlyph(colIndex) {
  if (
    matrixRainColDigitHeavy[colIndex] &&
    Math.random() < MATRIX_RAIN_DIGIT_PICK_IN_HEAVY_COL
  ) {
    return MATRIX_RAIN_DIGITS[Math.floor(Math.random() * MATRIX_RAIN_DIGITS.length)];
  }
  return MATRIX_RAIN_GLYPHS[Math.floor(Math.random() * MATRIX_RAIN_GLYPHS.length)];
}

function matrixRainIntroLoop(ts) {
  const theme = getCurrentTheme();
  const reduced = document.body.classList.contains("motion-reduced");
  if (theme !== "matrixfall" || reduced || !matrixRainCanvas || !matrixRainCtx) {
    matrixRainIntroRaf = 0;
    matrixRainPlaying = false;
    return;
  }

  if (!matrixRainIntroStart) matrixRainIntroStart = ts;
  const elapsed = ts - matrixRainIntroStart;
  const t = Math.min(1, elapsed / MATRIX_INTRO_DURATION_MS);

  const w = matrixRainCanvas.width;
  const h = matrixRainCanvas.height;

  const trailAlpha = 0.05 + t * 0.34;
  matrixRainCtx.fillStyle = `rgba(0, 3, 1, ${trailAlpha})`;
  matrixRainCtx.fillRect(0, 0, w, h);

  const greenMul = Math.max(0, (1 - t) * (1 - t));

  if (greenMul > 0.03 && ts - matrixRainLastStep >= MATRIX_RAIN_STEP_MS) {
    matrixRainLastStep = ts;
    matrixRainCtx.font = `${matrixRainFontPx}px 'Courier New', Courier, 'MS Gothic', 'Hiragino Kaku Gothic ProN', monospace`;
    matrixRainCtx.textBaseline = "top";

    matrixRainY.forEach((y, ind) => {
      const x = ind * matrixRainColStep;
      for (let k = 0; k < matrixRainStackDepth; k++) {
        const yy = y - k * matrixRainLineStep;
        if (yy < -matrixRainLineStep * 2) continue;
        const ch = pickMatrixRainGlyph(ind);
        const dim = Math.max(0.06, 1 - (k / Math.max(1, matrixRainStackDepth - 1)) * 0.88);
        const a = greenMul * dim * (0.38 + Math.random() * 0.48);
        const head = k === 0;
        if (head) {
          const ha = greenMul * (0.62 + Math.random() * 0.34);
          matrixRainCtx.shadowColor = `rgba(255, 255, 255, ${Math.min(0.98, ha * 0.95)})`;
          matrixRainCtx.shadowBlur = 6 + Math.random() * 9;
          matrixRainCtx.shadowOffsetX = 0;
          matrixRainCtx.shadowOffsetY = 0;
          matrixRainCtx.fillStyle = `rgba(248, 255, 252, ${ha})`;
        } else {
          const [gr, gg, gb] = MATRIX_RAIN_GLOW_GREENS[(k + ind) % MATRIX_RAIN_GLOW_GREENS.length];
          matrixRainCtx.shadowColor = `rgba(${gr},${gg},${gb},${Math.min(0.98, a * 1.2 + 0.22)})`;
          matrixRainCtx.shadowBlur = 2.5 + dim * 18;
          matrixRainCtx.shadowOffsetX = 0;
          matrixRainCtx.shadowOffsetY = 0;
          matrixRainCtx.fillStyle = `rgba(${gr},${gg},${gb},${a})`;
        }
        matrixRainCtx.fillText(ch, x, yy);
      }
      if (y > h + 80 + Math.random() * 3500) matrixRainY[ind] = -60 * Math.random();
      else matrixRainY[ind] = y + matrixRainFallStep;
    });
    matrixRainCtx.shadowBlur = 0;
    matrixRainCtx.shadowColor = "transparent";
  }

  if (t >= 1) {
    matrixRainPlaying = false;
    matrixRainCtx.fillStyle = "#000301";
    matrixRainCtx.fillRect(0, 0, w, h);
    matrixRainCanvas.style.visibility = "hidden";
    matrixRainIntroRaf = 0;
    scheduleMatrixTypedAfterIntroDelay();
    return;
  }

  matrixRainIntroRaf = requestAnimationFrame(matrixRainIntroLoop);
}

function stopMatrixRainIntro() {
  if (matrixRainIntroRaf) cancelAnimationFrame(matrixRainIntroRaf);
  matrixRainIntroRaf = 0;
  matrixRainPlaying = false;
}

function startMatrixRainIntro() {
  if (!matrixRainCanvas) return;
  stopMatrixRainIntro();
  matrixRainPlaying = true;
  matrixRainCanvas.style.visibility = "visible";
  matrixRainCtx = matrixRainCanvas.getContext("2d");
  resizeMatrixRainCanvas();
  matrixRainIntroStart = 0;
  matrixRainLastStep = 0;
  matrixRainCtx.fillStyle = "#000301";
  matrixRainCtx.fillRect(0, 0, matrixRainCanvas.width, matrixRainCanvas.height);
  matrixRainIntroRaf = requestAnimationFrame(matrixRainIntroLoop);
}

function syncMatrixRain() {
  const theme = getCurrentTheme();
  const reduced = document.body.classList.contains("motion-reduced");
  if (theme !== "matrixfall" || reduced) {
    stopMatrixRainIntro();
    return;
  }
  if (matrixFallIntroRanThisPage) return;
  matrixFallIntroRanThisPage = true;
  startMatrixRainIntro();
}

// ── COMMON ROOM: SNITCH MOTION AURA (soft glow follows pointer, no click) ─
(function initSnitchMotionAura() {
  const root = document.getElementById("snitch-motion");
  const core = root?.querySelector?.(".snitch-motion__core");
  if (!root || !core) return;

  let mx = window.innerWidth * 0.5;
  let my = window.innerHeight * 0.5;

  /* Match newtab.html body.commonroom cursor: url(...) <hx> <hy> (128×128 processed wand). */
  const COMMONROOM_CURSOR_HOTSPOT = { hx: 64, hy: 64 };
  /* Wand tip sits near top-left of the PNG; nudge in px from image top-left if art isn’t flush. */
  const WAND_TIP_FROM_IMAGE_TL = { x: 6, y: 8 };

  window.addEventListener(
    "mousemove",
    (e) => {
      if (getCurrentTheme() !== "commonroom") return;
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );

  function tick() {
    const theme = getCurrentTheme();
    const reduced = document.body.classList.contains("motion-reduced");
    const noCustomCursor = document.documentElement.classList.contains("vibe-no-custom-cursors");
    if (theme !== "commonroom" || reduced || noCustomCursor) {
      root.hidden = true;
      requestAnimationFrame(tick);
      return;
    }
    root.hidden = false;

    /* Glow center = wand tip: screen pos of image TL + offset (hotspot aligns mx,my with hx,hy in image). */
    const cx = mx - COMMONROOM_CURSOR_HOTSPOT.hx + WAND_TIP_FROM_IMAGE_TL.x;
    const cy = my - COMMONROOM_CURSOR_HOTSPOT.hy + WAND_TIP_FROM_IMAGE_TL.y;
    core.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// ── GILDED JAZZ THEME: harbor-light cursor aura (#0b815a) ─
(function initGildedHarborLightAura() {
  const root = document.getElementById("green-light-motion");
  const core = root?.querySelector?.(".green-light-motion__core");
  if (!root || !core) return;

  let mx = window.innerWidth * 0.5;
  let my = window.innerHeight * 0.5;

  window.addEventListener(
    "mousemove",
    (e) => {
      if (getCurrentTheme() !== "gatsbygilded") return;
      mx = e.clientX;
      my = e.clientY;
    },
    { passive: true }
  );

  function tick() {
    const theme = getCurrentTheme();
    const reduced = document.body.classList.contains("motion-reduced");
    const noCustomCursor = document.documentElement.classList.contains("vibe-no-custom-cursors");
    if (theme !== "gatsbygilded" || reduced || noCustomCursor) {
      root.hidden = true;
      requestAnimationFrame(tick);
      return;
    }
    root.hidden = false;

    core.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

function applyCustomCursorPreference(customCursorsEnabled) {
  document.documentElement.classList.toggle(
    "vibe-no-custom-cursors",
    customCursorsEnabled === false
  );
}

// ── THEME SWITCHER ───────────────────────────────────────────────────
function switchTheme(theme) {
  const resolved = themes[theme] ? theme : "twilight";
  setBodyThemeClass(resolved);
  syncMatrixRain();
  setQuote(resolved);
  updateClock();
  if (resolved === "twilight" || resolved === "witchy" || resolved === "openingcrawl") drawStars(resolved);
  chrome.storage.local.set({ vibeTheme: resolved });
}

// ── SEARCH ───────────────────────────────────────────────────────────
function runGoogleSearch() {
  const input = document.getElementById("search");
  const q = input.value.trim();
  if (!q) {
    input.focus();
    return;
  }
  window.location.href = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    runGoogleSearch();
  }
});

document.getElementById("search-go")?.addEventListener("click", () => runGoogleSearch());
document.getElementById("search-mag")?.addEventListener("click", () => runGoogleSearch());

function randomTheme() {
  const current = getCurrentTheme();
  const isPro = PRO_THEME_IDS.has(current);
  const pool = isPro ? PRO_THEME_POOL : RANDOM_THEME_POOL;
  if (pool.length < 1) return;
  if (pool.length === 1) {
    if (pool[0] !== current) switchTheme(pool[0]);
    return;
  }
  const order = getShuffledCycleOrder(isPro ? "pro" : "regular", pool);
  const idx = order.indexOf(current);
  if (idx === -1) {
    switchTheme(order[0]);
    return;
  }
  switchTheme(order[(idx + 1) % order.length]);
}

document.getElementById("random-vibe")?.addEventListener("click", () => randomTheme());

// ── WITCHY PARTICLES ─────────────────────────────────────────────────
const witchyEmojis = ["🍂", "🍁", "✨", "🌙", "🕯️", "🌿", "⭐"];
setInterval(() => {
  if (getCurrentTheme() !== "witchy") return;
  const el = document.createElement("div");
  el.className = "particle";
  el.textContent = witchyEmojis[Math.floor(Math.random() * witchyEmojis.length)];
  el.style.left = `${Math.random() * 100}vw`;
  el.style.bottom = "0";
  el.style.animationDuration = `${4 + Math.random() * 4}s`;
  el.style.fontSize = `${0.7 + Math.random() * 0.8}rem`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 8000);
}, 1200);

// ── INIT ─────────────────────────────────────────────────────────────
chrome.storage.local.get(
  { vibeTheme: "twilight", vibeEnabled: true, vibeCustomCursors: true },
  (data) => {
    if (data?.vibeEnabled === false) return;
    applyCustomCursorPreference(data?.vibeCustomCursors !== false);
    const theme = data?.vibeTheme || "twilight";
    setupMotionPreference();
    switchTheme(theme);
  }
);

// React instantly to popup changes (no refresh required)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.vibeEnabled?.newValue === false) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const t = tabs?.[0];
      if (t?.id != null) chrome.tabs.update(t.id, { url: "chrome://new-tab-page" });
    });
    return;
  }
  if (changes.vibeCustomCursors !== undefined) {
    applyCustomCursorPreference(changes.vibeCustomCursors.newValue !== false);
  }
  if (changes.vibeTheme?.newValue) {
    switchTheme(changes.vibeTheme.newValue);
  }
});

