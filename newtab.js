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
  commonroom: {
    searchPlaceholder: "ink your inquiry upon the scroll…",
    quotes: [
      { text: "books! and cleverness! there are more important things.", author: "— hermione granger" },
      { text: "happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", author: "— albus dumbledore" },
      { text: "it matters not what someone is born, but what they grow to be.", author: "— albus dumbledore" },
      { text: "the corridors remember footfalls; the candles remember faces.", author: "" },
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
  spacesalvage: {
    searchPlaceholder: "scan the outer belt...",
    quotes: [
      { text: "some things in life are too important to be taken seriously.", author: "— oscar wilde" },
      { text: "patch the hull, keep flying.", author: "" },
      { text: "every map starts as a rumor.", author: "" },
      { text: "nothing elegant survives first contact.", author: "" },
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
  tyrellnoir: {
    searchPlaceholder: "trace one more lead through the rain...",
    quotes: [
      { text: "all those moments will be lost in time, like tears in rain.", author: "— roy batty" },
      { text: "more human than human is our motto.", author: "— dr. eldon tyrell" },
      { text: "i've seen things you people wouldn't believe.", author: "— roy batty" },
      { text: "it's too bad she won't live—but then again, who does?", author: "— deckard" },
    ],
  },
  arrakisstone: {
    searchPlaceholder: "cross the open dune of thought...",
    quotes: [
      { text: "i must not fear. fear is the mind-killer.", author: "— paul atreides (bene gesserit litany)" },
      { text: "he who controls the spice controls the universe.", author: "— baron vladimir harkonnen" },
      { text: "the sleeper must awaken.", author: "— lady jessica / paul atreides" },
      { text: "walk without rhythm, it won't attract the worm.", author: "— paul atreides" },
    ],
  },
  matrixfall: {
    searchPlaceholder: "follow the white keyword...",
    quotes: [
      { text: "there is no spoon.", author: "— spoon boy" },
      { text: "no one can be told what the matrix is. you have to see it for yourself.", author: "— morpheus" },
      { text: "there is a difference between knowing the path and walking the path.", author: "— morpheus" },
      { text: "welcome to the real world.", author: "— morpheus" },
    ],
  },
  pandoraeve: {
    searchPlaceholder: "search the glowing canopy...",
    quotes: [
      { text: "i see you.", author: "— neytiri" },
      { text: "all energy is only borrowed, and someday you have to give it back.", author: "— mo'at" },
      { text: "everything is backwards now, like out there is the true world.", author: "— jake sully" },
      { text: "sometimes your whole life boils down to one insane move.", author: "— jake sully" },
    ],
  },
  rivendelleve: {
    searchPlaceholder: "consult the old maps...",
    quotes: [
      { text: "not all those who wander are lost.", author: "— bilbo baggins (verse for strider)" },
      { text: "all we have to decide is what to do with the time that is given us.", author: "— gandalf" },
      { text: "even the smallest person can change the course of the future.", author: "— galadriel" },
      { text: "death is just another path, one that we all must take.", author: "— gandalf" },
    ],
  },
  mendlpastel: {
    searchPlaceholder: "compose with confection precision...",
    quotes: [
      { text: "rudeness is merely the expression of fear.", author: "— m. gustave h." },
      { text: "there are still faint glimmers of civilization left in this barbaric slaughterhouse once known as humanity.", author: "— m. gustave h." },
      { text: "when you're young, it's all fillet steak; as you get older, you settle for the cheaper cuts.", author: "— m. gustave h." },
      { text: "take your hands off my lobby boy!", author: "— m. gustave h." },
    ],
  },
  topiaryshadow: {
    searchPlaceholder: "trim the hedge of your doubts...",
    quotes: [
      { text: "i'm not finished.", author: "— edward" },
      { text: "people are scared of me because i'm different.", author: "— edward" },
      { text: "but if you had regular hands, you'd be like everybody else.", author: "— kim" },
      { text: "hold me. — i can't.", author: "— kim & edward" },
    ],
  },
  inkversepop: {
    searchPlaceholder: "search multiversal keywords...",
    quotes: [
      { text: "anyone can wear the mask.", author: "— peter b. parker" },
      { text: "what makes you different is what makes you spider-man.", author: "— peter b. parker" },
      { text: "when will i know i'm ready? you won't. it's a leap of faith.", author: "— miles morales & peter b. parker" },
      { text: "okay, let's do this one last time.", author: "— miles morales" },
    ],
  },
  wastelyellow: {
    searchPlaceholder: "outrun the dust of doubt...",
    quotes: [
      { text: "what a lovely day!", author: "— nux" },
      { text: "witness me!", author: "— nux" },
      { text: "we are not things.", author: "— the splendid angharad" },
      { text: "who killed the world?", author: "— the dag" },
    ],
  },
  bridesvengeance: {
    searchPlaceholder: "name your list, begin...",
    quotes: [
      { text: "wiggle your big toe.", author: "— beatrix kiddo" },
      { text: "revenge is never a straight line. it's a forest.", author: "— bill" },
      { text: "those of you lucky enough to still have your lives, take them with you.", author: "— beatrix kiddo" },
      { text: "that woman deserves her revenge. and… we deserve to die.", author: "— bill" },
    ],
  },
  rabbitholedream: {
    searchPlaceholder: "drink-me sized queries...",
    quotes: [
      { text: "curiouser and curiouser!", author: "— alice" },
      { text: "we're all mad here. i'm mad. you're mad.", author: "— the cheshire cat" },
      { text: "i can't go back to yesterday—i was a different person then.", author: "— alice" },
      { text: "begin at the beginning, and go on till you come to the end: then stop.", author: "— the king of hearts" },
    ],
  },
  goldentwist: {
    searchPlaceholder: "unwrap one impossible answer...",
    quotes: [
      { text: "a little nonsense now and then is relished by the wisest men.", author: "— willy wonka (novel)" },
      { text: "come with me, and you'll be in a world of pure imagination.", author: "— willy wonka" },
      { text: "strike that. reverse it.", author: "— willy wonka" },
      { text: "the suspense is terrible. i hope it'll last.", author: "— willy wonka" },
    ],
  },
  shirecomfort: {
    searchPlaceholder: "second-breakfast for thought...",
    quotes: [
      { text: "in a hole in the ground there lived a hobbit.", author: "— j.r.r. tolkien" },
      { text: "there is nothing like looking, if you want to find something.", author: "— gandalf" },
      { text: "if more of us valued food and cheer and song above hoarded gold, it would be a merrier world.", author: "— thorin oakenshield" },
      { text: "true courage is about knowing not when to take a life but when to spare one.", author: "— gandalf" },
    ],
  },
  lanternnarnia: {
    searchPlaceholder: "step through the wardrobe of ideas...",
    quotes: [
      { text: "courage, dear heart.", author: "— aslan (to lucy)" },
      { text: "once a king or queen of narnia, always a king or queen.", author: "— aslan" },
      { text: "wrong will be right, when aslan comes in sight.", author: "— mr. beaver" },
      { text: "do not cite the deep magic to me, witch.", author: "— aslan" },
    ],
  },
  ministrygrey: {
    searchPlaceholder: "query approved archives...",
    quotes: [
      { text: "big brother is watching you.", author: "— party slogan" },
      { text: "war is peace. freedom is slavery. ignorance is strength.", author: "— the party" },
      { text: "if you want a picture of the future, imagine a boot stamping on a human face—forever.", author: "— o'brien" },
      { text: "freedom is the freedom to say that two plus two make four.", author: "— winston smith" },
    ],
  },
  mockingjaydivide: {
    searchPlaceholder: "search the arena of odds...",
    quotes: [
      { text: "may the odds be ever in your favor.", author: "— effie trinket" },
      { text: "hope is the only thing stronger than fear.", author: "— president snow" },
      { text: "i volunteer as tribute!", author: "— katniss everdeen" },
      { text: "remember who the real enemy is.", author: "— haymitch abernathy" },
    ],
  },
  droogclockwork: {
    searchPlaceholder: "ultra-clear query, yeah?...",
    quotes: [
      { text: "when a man cannot choose, he ceases to be a man.", author: "— prison chaplain" },
      { text: "i was cured all right.", author: "— alex delarge" },
      { text: "come and get one in the yarbles, if you have any yarbles.", author: "— alex delarge" },
      { text: "we were all feeling a bit shagged and fagged and fashed.", author: "— alex delarge" },
    ],
  },
  gatsbygilded: {
    searchPlaceholder: "chase the green light...",
    quotes: [
      { text: "so we beat on, boats against the current, borne back ceaselessly into the past.", author: "— nick carraway" },
      { text: "i like large parties. they're so intimate.", author: "— jordan baker" },
      { text: "can't repeat the past? why of course you can!", author: "— jay gatsby" },
      { text: "they're a rotten crowd… you're worth the whole damn bunch put together.", author: "— nick carraway" },
    ],
  },
  mercersterile: {
    searchPlaceholder: "pump primer: search...",
    quotes: [
      { text: "i have to return some videotapes.", author: "— patrick bateman" },
      { text: "there is an idea of a patrick bateman, some kind of abstraction.", author: "— patrick bateman" },
      { text: "i'm into, uh, well, murders and executions mostly.", author: "— patrick bateman" },
      { text: "this is not an exit.", author: "— patrick bateman" },
    ],
  },
  buttonmothers: {
    searchPlaceholder: "look for the small locked door...",
    quotes: [
      { text: "be clever, miss. even if you're scared, you still have to be clever.", author: "— miss april spink" },
      { text: "mirrors are never to be trusted.", author: "— neil gaiman" },
      { text: "they say even the proudest spirit can be broken with love.", author: "— the beldam" },
      { text: "black is traditional.", author: "— the beldam" },
    ],
  },
  spiralnight: {
    searchPlaceholder: "this is halloween, search edition...",
    quotes: [
      { text: "this is halloween, this is halloween.", author: "— halloween town / jack skellington" },
      { text: "what's this? what's this?", author: "— jack skellington" },
      { text: "eureka! this year christmas will be ours!", author: "— jack skellington" },
      { text: "there's children throwing snowballs instead of throwing heads.", author: "— jack skellington" },
    ],
  },
  bathspirited: {
    searchPlaceholder: "rinse one name you forgot...",
    quotes: [
      { text: "once you've met someone, you never really forget them.", author: "— haku" },
      { text: "don't look back.", author: "— haku" },
      { text: "your name is sen.", author: "— yubaba" },
      { text: "if you completely forget, you'll never find your way home.", author: "— zeniba" },
    ],
  },
  swampfable: {
    searchPlaceholder: "search like an ogre with layers...",
    quotes: [
      { text: "ogres are like onions.", author: "— shrek" },
      { text: "better out than in, i always say.", author: "— shrek" },
      { text: "what are you doing in my swamp?!", author: "— shrek" },
      { text: "you know what else everybody likes? parfaits!", author: "— donkey" },
    ],
  },
  icecutcrystal: {
    searchPlaceholder: "let it query...",
    quotes: [
      { text: "love is putting someone else's needs before yours.", author: "— olaf" },
      { text: "the cold never bothered me anyway.", author: "— elsa" },
      { text: "some people are worth melting for.", author: "— olaf" },
      { text: "conceal, don't feel, don't let them know.", author: "— elsa" },
    ],
  },
  owlerytwilight: {
    searchPlaceholder: "send your inquiry by owl...",
    quotes: [
      { text: "happiness can be found, even in the darkest of times, if one only remembers to turn on the light.", author: "— albus dumbledore" },
      { text: "it does not do to dwell on dreams and forget to live.", author: "— albus dumbledore" },
      { text: "you're a wizard, harry.", author: "— rubeus hagrid" },
      { text: "after all this time? …always.", author: "— albus dumbledore & severus snape" },
    ],
  },
  binarysunset: {
    searchPlaceholder: "search the outer rim...",
    quotes: [
      { text: "may the force be with you.", author: "— obi-wan kenobi" },
      { text: "do. or do not. there is no try.", author: "— yoda" },
      { text: "i am your father.", author: "— darth vader" },
      { text: "the force will be with you. always.", author: "— obi-wan kenobi" },
    ],
  },
  gothamvigil: {
    searchPlaceholder: "scan the skyline...",
    quotes: [
      { text: "why do we fall, bruce? so we can learn to pick ourselves up.", author: "— thomas wayne" },
      { text: "i'm batman.", author: "— bruce wayne" },
      { text: "it's not who i am underneath, but what i do that defines me.", author: "— bruce wayne" },
      { text: "the night is darkest just before the dawn.", author: "— harvey dent" },
    ],
  },
  kanedared: {
    searchPlaceholder: "trace one signal through the concrete...",
    quotes: [
      { text: "he's not your friend, he's your enemy!", author: "— shotaro kaneda" },
      { text: "amoeba, i don't care!", author: "— tetsuo shima" },
      { text: "what if an explosion rips open the very fabric of the universe?", author: "— colonel shikishima" },
      { text: "i'm in charge here.", author: "— tetsuo shima" },
    ],
  },
  herhaze: {
    searchPlaceholder: "whisper what you're looking for...",
    quotes: [
      { text: "sometimes i wonder if i'm broken. i think we all feel that way sometimes.", author: "— theodore twombly" },
      { text: "the heart's not like a box that gets filled up.", author: "— samantha" },
      { text: "i'm slowly becoming part of everything.", author: "— samantha" },
      { text: "anybody who loves is a freak.", author: "— amy" },
    ],
  },
  wickiesmono: {
    searchPlaceholder: "log the watch... type the fog...",
    quotes: [
      { text: "why'd ya spill yer beans?", author: "— thomas howard" },
      { text: "tall tales.", author: "— thomas wake" },
      { text: "yer fond of me lobster, ain't ye?", author: "— thomas wake" },
      { text: "damn ye!", author: "— thomas wake" },
    ],
  },
  discoverywhite: {
    searchPlaceholder: "open the pod bay search bay...",
    quotes: [
      { text: "open the pod bay doors, hal.", author: "— dave bowman" },
      { text: "i'm sorry, dave. i'm afraid i can't do that.", author: "— hal 9000" },
      { text: "this mission is too important for me to allow you to jeopardize it.", author: "— hal 9000" },
      { text: "my mind is going. i can feel it.", author: "— hal 9000" },
    ],
  },
  nostromowet: {
    searchPlaceholder: "patch vent, then query...",
    quotes: [
      { text: "in space, no one can hear you scream.", author: "— tagline" },
      { text: "you still don't understand what you're dealing with, do you?", author: "— ash" },
      { text: "i can't lie to you about your chances, but… you have my sympathies.", author: "— ash" },
      { text: "ash, open the door!", author: "— ripley" },
    ],
  },
  thirdimpact: {
    searchPlaceholder: "sync ratio: search higher...",
    quotes: [
      { text: "i mustn't run away.", author: "— shinji ikari" },
      { text: "congratulations!", author: "— cast" },
      { text: "i am not alone. i can live.", author: "— shinji ikari" },
      { text: "those who hate themselves cannot love or trust others.", author: "— kaworu nagisa" },
    ],
  },
  zoneverdigris: {
    searchPlaceholder: "wish for what the room won't give...",
    quotes: [
      { text: "my conscience wants vegetarianism to win over the world.", author: "— writer (stalker)" },
      { text: "happiness for everybody, free, and no one will go away unsatisfied.", author: "— arkady & boris strugatsky" },
      { text: "weakness is a great thing, and strength is nothing.", author: "— stalker" },
      { text: "i don't understand anything at all.", author: "— writer (stalker)" },
    ],
  },
  shimmerfractal: {
    searchPlaceholder: "refract your question through the boundary...",
    quotes: [
      { text: "it's not destroying. it's making something new.", author: "— lena" },
      { text: "we spoke… that i needed to know what was inside the lighthouse.", author: "— lena" },
      { text: "i need to know what happened.", author: "— lena" },
      { text: "it's destroying everything.", author: "— josie radek" },
    ],
  },
  howlchimney: {
    searchPlaceholder: "calcifer, hold the results steady...",
    quotes: [
      { text: "a heart's a heavy burden.", author: "— sophie hatter" },
      { text: "may all your bacon burn.", author: "— calcifer" },
      { text: "i see no point in living if i can't be beautiful.", author: "— howl" },
      { text: "they say that the best blaze burns brightest when circumstances are at their worst.", author: "— howl" },
    ],
  },
  rapturedrown: {
    searchPlaceholder: "would you kindly search...",
    quotes: [
      { text: "a man chooses; a slave obeys.", author: "— andrew ryan" },
      { text: "is a man not entitled to the sweat of his brow?", author: "— andrew ryan" },
      { text: "no gods or kings. only man.", author: "— rapture" },
      { text: "we all make choices, but in the end our choices make us.", author: "— andrew ryan" },
    ],
  },
  grandlinesea: {
    searchPlaceholder: "chart the next island...",
    quotes: [
      { text: "i'm gonna be king of the pirates!", author: "— monkey d. luffy" },
      { text: "nothing happened.", author: "— roronoa zoro" },
      { text: "i want to live!", author: "— nico robin" },
      { text: "a man's dream… will never die!", author: "— marshall d. teach" },
    ],
  },
  openingcrawl: {
    searchPlaceholder: "search the holonet archives...",
    quotes: [
      { text: "that's no moon.", author: "— obi-wan kenobi" },
      { text: "do. or do not. there is no try.", author: "— yoda" },
      { text: "may the force be with you.", author: "— general kenobi" },
      { text: "never tell me the odds.", author: "— han solo" },
    ],
  },
};

const THEME_NAMES = Object.keys(themes);

function getCurrentTheme() {
  const t = document.body.dataset.theme;
  return t && themes[t] ? t : "twilight";
}

function setBodyThemeClass(theme) {
  const resolved = themes[theme] ? theme : "twilight";
  THEME_NAMES.forEach((name) => document.body.classList.remove(name));
  document.body.classList.add(resolved);
  document.body.dataset.theme = resolved;
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
    commonroom:
      hour < 5
        ? "midnight oil and moving portraits"
        : hour < 12
          ? "ember-quiet before breakfast"
          : hour < 17
            ? "afternoon light through stone arches"
            : "firelight symphonies and exam dread",
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
      hour < 5 ? "first wind before sun" : hour < 12 ? "spice-flat morning" : hour < 17 ? "high sun discipline" : "sabbha cool",
    matrixfall:
      hour < 5 ? "signal in the shell" : hour < 12 ? "green morning cascade" : hour < 17 ? "simulated daylight block" : "operator hours",
    pandoraeve:
      hour < 5 ? "biolume still" : hour < 12 ? "canopy light" : hour < 17 ? "pulse of midday" : "night vines glowing",
    rivendelleve:
      hour < 5 ? "elven watch" : hour < 12 ? "misty departure hour" : hour < 17 ? "council daylight" : "evening hymn",
    mendlpastel:
      hour < 5 ? "lobby insomnia" : hour < 12 ? "pastel breakfast service" : hour < 17 ? "symmetrical afternoon" : "concierge midnight",
    topiaryshadow:
      hour < 5 ? "snow on sculpted hedges" : hour < 12 ? "suburban gothic coffee" : hour < 17 ? "long shadow lawns" : "handmade dusk",
    inkversepop:
      hour < 5 ? "after-midnight panel" : hour < 12 ? "splash page morning" : hour < 17 ? "stutter-step afternoon" : "multiverse night shift",
    wastelyellow:
      hour < 5 ? "engine cool-down" : hour < 12 ? "war rig sunrise" : hour < 17 ? "dust devil noon" : "flame horizon night",
    bridesvengeance:
      hour < 5 ? "list item: dawn" : hour < 12 ? "yellow morning clarity" : hour < 17 ? "blade-bright afternoon" : "vengeance weather",
    rabbitholedream:
      hour < 5 ? "late tea nonsense" : hour < 12 ? "shrinking morning" : hour < 17 ? "croquet o'clock somewhere" : "rabbit-hole night",
    goldentwist:
      hour < 5 ? "violet hour unease" : hour < 12 ? "factory whistle sweet" : hour < 17 ? "wrapper-glitter daylight" : "golden ticket dusk",
    shirecomfort:
      hour < 5 ? "seed-cake time" : hour < 12 ? "proper elevenses weather" : hour < 17 ? "hillside nap light" : "party field evening",
    lanternnarnia:
      hour < 5 ? "lamppost watch" : hour < 12 ? "thawing morning" : hour < 17 ? "forest council hour" : "always-winter easing",
    ministrygrey:
      hour < 5 ? "telescreen standby" : hour < 12 ? "approved morning bulletin" : hour < 17 ? "prole district haze" : "room 101 air",
    mockingjaydivide:
      hour < 5 ? "arena before whistle" : hour < 12 ? "district quiet" : hour < 17 ? "capitol glare" : "night raid calm",
    droogclockwork:
      hour < 5 ? "milk-plus hour" : hour < 12 ? "sharp-dressed harmattan" : hour < 17 ? "korova sunlight" : "ultra night out",
    gatsbygilded:
      hour < 5 ? "last boat ashore" : hour < 12 ? "west egg coffee" : hour < 17 ? "prohibition glow" : "green light hour",
    mercersterile:
      hour < 5 ? "pre-market facial routine" : hour < 12 ? "boardroom sterile dawn" : hour < 17 ? "reservation at dorsia?" : "paul allen hours",
    buttonmothers:
      hour < 5 ? "key on a string" : hour < 12 ? "other breakfast" : hour < 17 ? "tunnel light hour" : "button-eyed midnight",
    spiralnight:
      hour < 5 ? "zero o'clock fiend" : hour < 12 ? "halloween town coffee" : hour < 17 ? "christmas plotting" : "pumpkin king patrol",
    bathspirited:
      hour < 5 ? "train at the flood" : hour < 12 ? "yuya morning steam" : hour < 17 ? "spirit shift change" : "moon on the bathhouse",
    swampfable:
      hour < 5 ? "onion-layer insomnia" : hour < 12 ? "donkey-bridge morning" : hour < 17 ? "storybook roast hour" : "far far away night",
    icecutcrystal:
      hour < 5 ? "polar twilight calm" : hour < 12 ? "frozen fractal morning" : hour < 17 ? "summit thaw light" : "let-it-go midnight",
    owlerytwilight:
      hour < 5 ? "night shift in the stacks" : hour < 12 ? "breakfast in the great hall" : hour < 17 ? "afternoon charms" : "astronomy tower hour",
    binarysunset:
      hour < 5 ? "cantina after last call" : hour < 12 ? "twin suns rising" : hour < 17 ? "hyperspace corridor" : "binary sunset on tatooine",
    gothamvigil:
      hour < 5 ? "rooftop watch" : hour < 12 ? "wayne enterprises daylight" : hour < 17 ? "sprang dock smog" : "batsignal city rain",
    kanedared:
      hour < 5 ? "neo-tokyo afterburn" : hour < 12 ? "concrete dawn patrol" : hour < 17 ? "highway prism glare" : "red taillight weather",
    herhaze:
      hour < 5 ? "4 a.m. inbox confessions" : hour < 12 ? "soft os morning" : hour < 17 ? "santa monica haze hour" : "lonely headphones dusk",
    wickiesmono:
      hour < 5 ? "wickies on the rock" : hour < 12 ? "salt-etched morning" : hour < 17 ? "gull scream shift" : "fresnel nightmare night",
    discoverywhite:
      hour < 5 ? "hibernation cycle drift" : hour < 12 ? "pod bay daylight" : hour < 17 ? "jupiter approach calm" : "star gate night",
    nostromowet:
      hour < 5 ? "night shift, nostromo" : hour < 12 ? "lv-426 morning briefing" : hour < 17 ? "coolant drip afternoon" : "strobe corridor hour",
    thirdimpact:
      hour < 5 ? "tang cross sync" : hour < 12 ? "nerv morning call" : hour < 17 ? "orange sky watch" : "human instrumentality hour",
    zoneverdigris:
      hour < 5 ? "rail car before dawn" : hour < 12 ? "room of wishful mud" : hour < 17 ? "telephone poles, long take" : "wet cement dusk",
    shimmerfractal:
      hour < 5 ? "boundary insomnia" : hour < 12 ? "prismatic morning sample" : hour < 17 ? "mutation of daylight" : "shimmer night math",
    howlchimney:
      hour < 5 ? "castle door creak" : hour < 12 ? "sophie's cleaning shift" : hour < 17 ? "market square wander" : "calcifer midnight pact",
    rapturedrown:
      hour < 5 ? "depth charge dreams" : hour < 12 ? "welcome to rapture day" : hour < 17 ? "art-deco pressure gauge" : "little sister hours",
    grandlinesea:
      hour < 5
        ? "log pose at midnight"
        : hour < 12
          ? "east blue morning tide"
          : hour < 17
            ? "sunny midday course"
            : "new world dusk wake",
    openingcrawl:
      hour < 5
        ? "hyperspace drift, lights dimmed"
        : hour < 12
          ? "a new day in the outer rim"
          : hour < 17
            ? "twin suns, high in the sky"
            : "cantina hours somewhere",
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
});

// ── COMMON ROOM: SNITCH MOTION AURA (soft glow follows pointer, no click) ─
(function initSnitchMotionAura() {
  const root = document.getElementById("snitch-motion");
  const core = root?.querySelector?.(".snitch-motion__core");
  if (!root || !core) return;

  let mx = window.innerWidth * 0.5;
  let my = window.innerHeight * 0.5;

  /* Match body.commonroom cursor: url(...) <hotspotX> <hotspotY>; PNG 40×32 */
  const SNITCH_CURSOR = { w: 40, h: 32, hx: 4, hy: 4 };

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
    if (theme !== "commonroom" || reduced) {
      root.hidden = true;
      requestAnimationFrame(tick);
      return;
    }
    root.hidden = false;

    /* Center glow on Snitch art (pointer = hotspot, not image center) */
    const cx = mx - SNITCH_CURSOR.hx + SNITCH_CURSOR.w * 0.5;
    const cy = my - SNITCH_CURSOR.hy + SNITCH_CURSOR.h * 0.5;
    core.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();

// ── THEME SWITCHER ───────────────────────────────────────────────────
function switchTheme(theme) {
  const resolved = themes[theme] ? theme : "twilight";
  setBodyThemeClass(resolved);
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
  if (THEME_NAMES.length < 2) return;
  let next;
  const current = getCurrentTheme();
  do {
    next = THEME_NAMES[Math.floor(Math.random() * THEME_NAMES.length)];
  } while (next === current);
  switchTheme(next);
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
chrome.storage.local.get({ vibeTheme: "twilight", vibeEnabled: true }, (data) => {
  if (data?.vibeEnabled === false) return;
  const theme = data?.vibeTheme || "twilight";
  setupMotionPreference();
  switchTheme(theme);
});

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
  if (changes.vibeTheme?.newValue) {
    switchTheme(changes.vibeTheme.newValue);
  }
});

