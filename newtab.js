// ── THEME DATA ───────────────────────────────────────────────────────
const themes = {
  twilight: {
    searchPlaceholder: "search the void...",
    quotes: [
      { text: "the stars are not wanted now; put out every one.", author: "— w.h. auden" },
      { text: "i have loved the stars too fondly to be fearful of the night.", author: "— sarah williams" },
      { text: "she was a girl who knew how to be happy even when she was sad.", author: "— marilyn monroe" },
      { text: "we are all just walking each other home.", author: "— ram dass" },
    ],
  },
  cleangirl: {
    searchPlaceholder: "search something...",
    quotes: [
      { text: "i'm fine. (somewhere inside that sentence is a scream.)", author: "— r.h. sin" },
      { text: "she had a galaxy in her eyes, a universe in her mind.", author: "" },
      { text: "soft life is a radical act.", author: "" },
      { text: "healing is not linear. neither is blush application.", author: "" },
    ],
  },
  witchy: {
    searchPlaceholder: "seek what calls to you...",
    quotes: [
      { text: "she is a wildness, impossible to tame.", author: "— r.h. sin" },
      { text: "magic is just science we don't understand yet.", author: "— arthur c. clarke" },
      { text: "when autumn comes, it doesn't ask.", author: "" },
      { text: "the moon will guide those who are lost.", author: "" },
    ],
  },
  financebro: {
    searchPlaceholder: "// search query...",
    quotes: [
      { text: "time in the market beats timing the market. also drink water.", author: "— warren buffett (paraphrased, kind of)" },
      { text: "the best investment you can make is in yourself. and index funds.", author: "— someone on twitter" },
      { text: "past performance is not indicative of future results. please be okay.", author: "— every prospectus ever" },
      { text: "buy the dip. also please call your mother.", author: "— anon" },
    ],
  },
  neonnocturne: {
    searchPlaceholder: "trace signal in the noise...",
    quotes: [
      { text: "the future is already here, it's just unevenly distributed.", author: "— william gibson" },
      { text: "we're all made of stardust and screenlight.", author: "— anon" },
      { text: "night is where ideas go to glow.", author: "" },
      { text: "make it neon, then make it useful.", author: "" },
    ],
  },
  librarydusk: {
    searchPlaceholder: "look up a thought worth keeping...",
    quotes: [
      { text: "a reader lives a thousand lives before he dies.", author: "— george r.r. martin" },
      { text: "books are a uniquely portable magic.", author: "— stephen king" },
      { text: "quiet is not empty. it is full of answers.", author: "" },
      { text: "leave room for slow, beautiful work.", author: "" },
    ],
  },
  oceanglass: {
    searchPlaceholder: "drift toward what matters...",
    quotes: [
      { text: "you can't cross the sea merely by standing and staring at the water.", author: "— rabindranath tagore" },
      { text: "the cure for anything is salt water: sweat, tears, or the sea.", author: "— isak dinesen" },
      { text: "breathe in. tide in. breathe out. tide out.", author: "" },
      { text: "clarity arrives in still water.", author: "" },
    ],
  },
  brutalredacted: {
    searchPlaceholder: "> run query",
    quotes: [
      { text: "perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "— antoine de saint-exupery" },
      { text: "less, but better.", author: "— dieter rams" },
      { text: "ship first. polish second.", author: "" },
      { text: "clarity is a feature.", author: "" },
    ],
  },
  housecandles: {
    searchPlaceholder: "search the stacks...",
    quotes: [
      { text: "it is our choices that show what we truly are.", author: "— albus dumbledore" },
      { text: "words are, in my not-so-humble opinion, our most inexhaustible source of magic.", author: "— albus dumbledore" },
      { text: "some halls are old enough to remember your name.", author: "" },
      { text: "study first, destiny second.", author: "" },
    ],
  },
  emberrunes: {
    searchPlaceholder: "seek old songs and hidden roads...",
    quotes: [
      { text: "not all those who wander are lost.", author: "— j.r.r. tolkien" },
      { text: "still round the corner there may wait a new road.", author: "— j.r.r. tolkien" },
      { text: "courage is often quiet and travel-worn.", author: "" },
      { text: "keep faith when the fire burns low.", author: "" },
    ],
  },
  starcartographer: {
    searchPlaceholder: "plot a course...",
    quotes: [
      { text: "we are all in the gutter, but some of us are looking at the stars.", author: "— oscar wilde" },
      { text: "across the sea of space, the stars are other suns.", author: "— carl sagan" },
      { text: "maps are promises made visible.", author: "" },
      { text: "find north, then find yourself.", author: "" },
    ],
  },
  velvetnoir: {
    searchPlaceholder: "search after midnight...",
    quotes: [
      { text: "the night is always darker before the dawn.", author: "— thomas fuller" },
      { text: "in a world of noise, elegance is a whisper.", author: "" },
      { text: "some answers only show up in low light.", author: "" },
      { text: "slow down; mystery likes patience.", author: "" },
    ],
  },
  solarpunkgarden: {
    searchPlaceholder: "grow a better question...",
    quotes: [
      { text: "the future is already here; build it kinder.", author: "" },
      { text: "what is not good for the hive is not good for the bee.", author: "— marcus aurelius" },
      { text: "utopia is a verb.", author: "" },
      { text: "small systems make resilient lives.", author: "" },
    ],
  },
  zenink: {
    searchPlaceholder: "one clear query...",
    quotes: [
      { text: "when walking, walk. when eating, eat.", author: "— zen proverb" },
      { text: "silence is a source of great strength.", author: "— lao tzu" },
      { text: "empty space is part of the painting.", author: "" },
      { text: "clarity arrives when force leaves.", author: "" },
    ],
  },
  retrofuturearcade: {
    searchPlaceholder: "insert query to continue...",
    quotes: [
      { text: "the future belongs to those who can play with it.", author: "" },
      { text: "nostalgia is just tomorrow wearing neon.", author: "" },
      { text: "high score: one focused hour.", author: "" },
      { text: "pixel by pixel, progress.", author: "" },
    ],
  },
  desertminimal: {
    searchPlaceholder: "search the quiet horizon...",
    quotes: [
      { text: "simplicity is the ultimate sophistication.", author: "— leonardo da vinci" },
      { text: "what is essential is invisible to the eye.", author: "— antoine de saint-exupery" },
      { text: "space is not empty; it is calm.", author: "" },
      { text: "the sun edits without apology.", author: "" },
    ],
  },
  alpinefjord: {
    searchPlaceholder: "find clear air ideas...",
    quotes: [
      { text: "adopt the pace of nature: her secret is patience.", author: "— ralph waldo emerson" },
      { text: "above all, keep close to nature's heart.", author: "— john muir" },
      { text: "cold water, sharp mind.", author: "" },
      { text: "let the mountain set your tempo.", author: "" },
    ],
  },
  musegallery: {
    searchPlaceholder: "curate your next thought...",
    quotes: [
      { text: "art enables us to find ourselves and lose ourselves at the same time.", author: "— thomas merton" },
      { text: "creativity takes courage.", author: "— henri matisse" },
      { text: "taste is memory plus attention.", author: "" },
      { text: "compose your day like a frame.", author: "" },
    ],
  },
  darkacademiaquill: {
    searchPlaceholder: "search the marginalia...",
    quotes: [
      { text: "there is no friend as loyal as a book.", author: "— ernest hemingway" },
      { text: "the pages are still warm from thought.", author: "" },
      { text: "write like nobody is grading you.", author: "" },
      { text: "the lamp is lit; continue.", author: "" },
    ],
  },
  spacesalvage: {
    searchPlaceholder: "scan the outer belt...",
    quotes: [
      { text: "some things in life are too important to be taken seriously.", author: "— oscar wilde" },
      { text: "patch the hull, keep flying.", author: "" },
      { text: "every map starts as a rumor.", author: "" },
      { text: "nothing elegant survives first contact.", author: "" },
    ],
  },
  regencyletter: {
    searchPlaceholder: "compose your next correspondence...",
    quotes: [
      { text: "there is no charm equal to tenderness of heart.", author: "— jane austen" },
      { text: "a well-timed letter changes everything.", author: "" },
      { text: "grace is strategy in silk gloves.", author: "" },
      { text: "manners are architecture for conversation.", author: "" },
    ],
  },
  gothicmanor: {
    searchPlaceholder: "search by candlelight...",
    quotes: [
      { text: "the world was to me a secret which i desired to divine.", author: "— mary shelley" },
      { text: "storms make excellent narrators.", author: "" },
      { text: "old houses remember your footsteps.", author: "" },
      { text: "mystery thrives where certainty sleeps.", author: "" },
    ],
  },
  cybersamurai: {
    searchPlaceholder: "execute precise query...",
    quotes: [
      { text: "the way is in training.", author: "— miyamoto musashi (adapted)" },
      { text: "discipline is the original superpower.", author: "" },
      { text: "cut noise, keep signal.", author: "" },
      { text: "move deliberately, commit cleanly.", author: "" },
    ],
  },
  cottagealchemy: {
    searchPlaceholder: "gather ingredients...",
    quotes: [
      { text: "to plant a garden is to believe in tomorrow.", author: "— audrey hepburn" },
      { text: "small rituals make big weather inside.", author: "" },
      { text: "brew patience, serve warm.", author: "" },
      { text: "every remedy begins with attention.", author: "" },
    ],
  },
  cosmicwestern: {
    searchPlaceholder: "track starlight trails...",
    quotes: [
      { text: "courage is being scared to death and saddling up anyway.", author: "— john wayne" },
      { text: "ride quiet; aim true.", author: "" },
      { text: "the horizon is just the first checkpoint.", author: "" },
      { text: "dust in your boots, galaxies overhead.", author: "" },
    ],
  },
  vhsparanormal: {
    searchPlaceholder: "rewind and search...",
    quotes: [
      { text: "we all go a little mad sometimes.", author: "— robert bloch" },
      { text: "static is just another language.", author: "" },
      { text: "if the lights flicker, listen.", author: "" },
      { text: "late-night streets keep secrets.", author: "" },
    ],
  },
  mechhangar: {
    searchPlaceholder: "run systems diagnostic...",
    quotes: [
      { text: "simplicity is prerequisite for reliability.", author: "— edsger dijkstra" },
      { text: "bolts first, bravado second.", author: "" },
      { text: "checklist complete. launch when ready.", author: "" },
      { text: "steel is just patience in another form.", author: "" },
    ],
  },
  opalinecourt: {
    searchPlaceholder: "seek silver-thread answers...",
    quotes: [
      { text: "and now that you don't have to be perfect, you can be good.", author: "— john steinbeck" },
      { text: "soft power wears a crown of light.", author: "" },
      { text: "kindness is a strategy with sparkle.", author: "" },
      { text: "grandeur can whisper.", author: "" },
    ],
  },
};

const THEME_NAMES = Object.keys(themes);

function getCurrentTheme() {
  const t = document.body.dataset.theme;
  return t && themes[t] ? t : "twilight";
}

function setBodyThemeClass(theme) {
  THEME_NAMES.forEach((name) => document.body.classList.remove(name));
  document.body.classList.add(theme);
  document.body.dataset.theme = theme;
}

function setupMotionPreference() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

  const sync = () => {
    const reduced = mq.matches;
    document.body.classList.toggle("motion-reduced", reduced);
    document.body.classList.toggle("motion-enabled", !reduced);
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
    housecandles:
      hour < 5
        ? "late study hall"
        : hour < 12
          ? "morning at the library"
          : hour < 17
            ? "afternoon in the common room"
            : "candlelit revision",
    emberrunes:
      hour < 5
        ? "campfire watch"
        : hour < 12
          ? "the road begins"
          : hour < 17
            ? "journey in daylight"
            : "evening by the hearth",
    starcartographer:
      hour < 5
        ? "charting the midnight sky"
        : hour < 12
          ? "morning coordinates"
          : hour < 17
            ? "surveying bright horizons"
            : "starlight navigation",
    velvetnoir:
      hour < 5
        ? "after-hours lounge"
        : hour < 12
          ? "soft morning blues"
          : hour < 17
            ? "golden-hour cool"
            : "midnight city mood",
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
    musegallery:
      hour < 5
        ? "studio lights on"
        : hour < 12
          ? "morning curation"
          : hour < 17
            ? "afternoon composition"
            : "gallery at dusk",
    darkacademiaquill:
      hour < 5 ? "midnight footnotes" : hour < 12 ? "morning seminar" : hour < 17 ? "library session" : "after-hours study",
    spacesalvage:
      hour < 5 ? "graveyard shift in orbit" : hour < 12 ? "morning flight checks" : hour < 17 ? "salvage run active" : "docking at dusk",
    regencyletter:
      hour < 5 ? "late correspondence" : hour < 12 ? "morning calls" : hour < 17 ? "afternoon promenade" : "evening salon",
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

// ── QUOTE ────────────────────────────────────────────────────────────
function setQuote(themeName) {
  const qs = themes[themeName]?.quotes || themes.twilight.quotes;
  const q = qs[Math.floor(Math.random() * qs.length)];
  const quoteEl = document.getElementById("quote");
  const authorEl = document.getElementById("quote-author");
  quoteEl.textContent = `"${q.text}"`;
  quoteEl.classList.remove("quote--singleline", "quote--multiline");
  quoteEl.classList.add(q.text.length > 95 ? "quote--multiline" : "quote--singleline");
  authorEl.textContent = q.author;

  // Lightweight refresh animation on quote/theme updates
  quoteEl.classList.remove("quote--refresh");
  authorEl.classList.remove("quote-author--refresh");
  void quoteEl.offsetWidth;
  quoteEl.classList.add("quote--refresh");
  authorEl.classList.add("quote-author--refresh");

  document.getElementById("search").placeholder = (themes[themeName] || themes.twilight).searchPlaceholder;
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
  if (theme !== "twilight" && theme !== "witchy") return;
  const color = theme === "witchy" ? "212, 133, 10" : "232, 213, 255";
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
});

// ── THEME SWITCHER ───────────────────────────────────────────────────
function switchTheme(theme) {
  setBodyThemeClass(theme);
  setQuote(theme);
  updateClock();
  if (theme === "twilight" || theme === "witchy") drawStars(theme);
  chrome.storage.local.set({ vibeTheme: theme });
}

// ── SEARCH ───────────────────────────────────────────────────────────
document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.value.trim()) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(e.target.value)}`;
  }
});

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
chrome.storage.local.get({ vibeTheme: "twilight" }, (data) => {
  const theme = data?.vibeTheme || "twilight";
  setupMotionPreference();
  switchTheme(theme);
});

// React instantly to popup changes (no refresh required)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.vibeTheme?.newValue) {
    switchTheme(changes.vibeTheme.newValue);
  }
});

