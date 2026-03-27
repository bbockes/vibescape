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
};

// ── CLOCK ────────────────────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}`;

  const hour = now.getHours();
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
  };

  const currentTheme = document.body.className || "twilight";
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
  document.getElementById("quote").textContent = `"${q.text}"`;
  document.getElementById("quote-author").textContent = q.author;
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
  requestAnimationFrame(() => drawStars(document.body.className));
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
  document.body.className = theme;
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
  if (document.body.className !== "witchy") return;
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
  switchTheme(theme);
});

// React instantly to popup changes (no refresh required)
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.vibeTheme?.newValue) {
    switchTheme(changes.vibeTheme.newValue);
  }
});

