const fs = require('fs');
const src = fs.readFileSync('c:/Users/Administrator/Desktop/2v2.io/games/sprunki-phase-7.html', 'utf8');

// Helper: replace between two strings
function replaceBetween(str, start, end, replacement) {
  const idx1 = str.indexOf(start);
  if (idx1 === -1) { console.log('WARN: start not found: ' + start.substring(0,40)); return str; }
  const idx2 = str.indexOf(end, idx1 + start.length);
  if (idx2 === -1) { console.log('WARN: end not found: ' + end.substring(0,40)); return str; }
  return str.substring(0, idx1) + start + replacement + end + str.substring(idx2 + end.length);
}

let t = src;

// === HEAD ===
t = t.replace(/lang="en"/g, 'lang="ru"');

// Title
t = t.replace('<title>Play Sprunki Phase 7 Online Free | 7-Layer Music Mod on 2v2.io</title>',
  '<title>Играть в Sprunki Phase 7 Онлайн Бесплатно | 7-Слойный Музыкальный Мод на 2v2.io</title>');

// Meta description
t = t.replace('<meta name="description" content="Play Sprunki Phase 7 online free — the deepest Sprunki mod yet. 7 simultaneous layers, neon-lit horror visuals, cinematic sound engine. No download.">',
  '<meta name="description" content="Играйте в Sprunki Phase 7 онлайн бесплатно — самый глубокий мод Sprunki. 7 одновременных слоёв, неоновые хоррор-визуалы, кинематографичный звуковой движок. Без скачивания.">');

// Canonical & hreflang
t = t.replace('https://2v2.io/games/sprunki-phase-7.html', 'https://2v2.io/ru/games/sprunki-phase-7.html');
// Fix the en hreflang back
t = t.replace('hreflang="en" href="https://2v2.io/ru/games/sprunki-phase-7.html"', 'hreflang="en" href="https://2v2.io/games/sprunki-phase-7.html"');
// Fix the x-default back
t = t.replace('hreflang="x-default" href="https://2v2.io/ru/games/sprunki-phase-7.html"', 'hreflang="x-default" href="https://2v2.io/games/sprunki-phase-7.html"');
// Add ru hreflang after en hreflang
t = t.replace('hreflang="en" href="https://2v2.io/games/sprunki-phase-7.html">',
  'hreflang="en" href="https://2v2.io/games/sprunki-phase-7.html">\n    <link rel="alternate" hreflang="ru" href="https://2v2.io/ru/games/sprunki-phase-7.html">');

// OG tags
t = t.replace('"og:title" content="Sprunki Phase 7 — Free Online 7-Layer Music Mod"',
  '"og:title" content="Sprunki Phase 7 — Бесплатный Онлайн 7-Слойный Музыкальный Мод"');
t = t.replace('"og:description" content="Seven layers deep. Neon horror. Cinematic sound. The most evolved Sprunki phase. Free in browser."',
  '"og:description" content="Семь слоёв глубины. Неоновый хоррор. Кинематографичный звук. Самая развитая фаза Sprunki. Бесплатно в браузере."');
t = t.replace('property="og:url" content="https://2v2.io/ru/games/sprunki-phase-7.html">',
  'property="og:url" content="https://2v2.io/ru/games/sprunki-phase-7.html">\n    <meta property="og:locale" content="ru">');

// Twitter
t = t.replace('"twitter:title" content="Sprunki Phase 7 — 7-Layer Music Mod"',
  '"twitter:title" content="Sprunki Phase 7 — 7-Слойный Музыкальный Мод"');
t = t.replace('"twitter:description" content="The deepest phase. Seven layers. Neon horror. Free."',
  '"twitter:description" content="Самая глубокая фаза. Семь слоёв. Неоновый хоррор. Бесплатно."');

// Schema - WebPage name
t = t.replace('"name": "Sprunki Phase 7 — 7-Layer Music Mod"',
  '"name": "Sprunki Phase 7 — 7-Слойный Музыкальный Мод"');
// Schema inLanguage
t = t.replace('"inLanguage": ["en"]', '"inLanguage": ["ru"]');
// Schema breadcrumb
t = t.replace('"name":"Home","item":"https://2v2.io"', '"name":"Главная","item":"https://2v2.io"');
t = t.replace('"name":"All Games","item":"https://2v2.io/games.html"', '"name":"Все игры","item":"https://2v2.io/games.html"');
// Schema description
t = t.replace('"description": "Play Sprunki Phase 7 online free — 7 simultaneous layers, neon-lit horror visuals, cinematic sound engine. The deepest Sprunki mod yet. No download."',
  '"description": "Играйте в Sprunki Phase 7 онлайн бесплатно — 7 одновременных слоёв, неоновые хоррор-визуалы, кинематографичный звуковой движок. Самый глубокий мод Sprunki. Без скачивания."');
// Schema FAQ
t = t.replace('"name":"Can I play Sprunki Phase 7 on mobile?"', '"name":"Можно ли играть в Sprunki Phase 7 на мобильном?"');
t = t.replace('"text":"Yes, it runs in mobile browsers. Desktop recommended — 7 layers need screen space for precise drag-and-drop control."',
  '"text":"Да, игра работает в мобильных браузерах. Рекомендуется использовать компьютер — 7 слоёв требуют места на экране для точного перетаскивания."');
t = t.replace('"name":"Do I need musical experience to play Phase 7?"', '"name":"Нужен ли музыкальный опыт для игры в Phase 7?"');
t = t.replace('"text":"No. Drag and drop is intuitive. Teachers use it in classrooms to introduce rhythm and composition. Start with one layer: add more as you go."',
  '"text":"Нет. Перетаскивание интуитивно понятно. Учителя используют её на уроках для знакомства с ритмом и композицией. Начните с одного слоя и добавляйте по мере освоения."');
t = t.replace('"name":"Is Sprunki Phase 7 an official Incredibox game?"', '"name":"Является ли Sprunki Phase 7 официальной игрой Incredibox?"');
t = t.replace('"text":"No. It is a fan-made community mod by samerysio. Not affiliated with So Far So Good, the studio behind Incredibox."',
  '"text":"Нет. Это фанатский мод, созданный сообществом, автор — samerysio. Не связан с So Far So Good, студией, создавшей Incredibox."');
t = t.replace('"name":"Does progress save between sessions?"', '"name":"Сохраняется ли прогресс между сессиями?"');
t = t.replace('"text":"Unlocks and recordings save to browser local storage. Clearing browser data resets everything. No cloud save."',
  '"text":"Разблокировки и записи сохраняются в локальном хранилище браузера. Очистка данных браузера сбрасывает всё. Облачного сохранения нет."');
t = t.replace('"name":"Which Phase 7 variant should I start with?"', '"name":"С какого варианта Phase 7 стоит начать?"');
t = t.replace('"text":"Start with the core Phase 7 to learn the 7-layer system. Try Remastered for HD visuals and refined audio. Try The Rework for the deepest horror atmosphere."',
  '"text":"Начните с основной Phase 7, чтобы освоить 7-слойную систему. Попробуйте Remastered для HD-визуалов и улучшенного звука. Попробуйте The Rework для самой глубокой хоррор-атмосферы."');

// === BODY ===
// Nav
t = t.replace('>Home<', '>Главная<');
t = t.replace('>All Games<', '>Все игры<');

// Breadcrumb
t = t.replace(/<a class="breadcrumb-link" href="..\/index.html">Home<\/a>/g, '<a class="breadcrumb-link" href="../index.html">Главная</a>');
t = t.replace(/<a class="breadcrumb-link" href="..\/games.html">All Games<\/a>/g, '<a class="breadcrumb-link" href="../games.html">Все игры</a>');

// Preview tagline
t = t.replace('Seven layers. Infinite depth.', 'Семь слоёв. Бесконечная глубина.');

// Play button
t = t.replace('>Play Game<', '>Играть<');

// Game title h1
t = t.replace('Sprunki Phase 7 — Go Seven Deep', 'Sprunki Phase 7 — Погрузитесь на Семь Уровней');

// Meta: Published
t = t.replace('Published: <strong>November 2024</strong>', 'Опубликовано: <strong>Ноябрь 2024</strong>');
t = t.replace('Last updated: <strong>July 2026</strong>', 'Обновлено: <strong>Июль 2026</strong>');
t = t.replace('By <strong>2v2.io Game Guides</strong>', 'Автор: <strong>2v2.io Game Guides</strong>');

// Tabs
t = t.replace('>About<', '>Об игре<');
t = t.replace('>Features<', '>Особенности<');
t = t.replace('>Variants<', '>Варианты<');
t = t.replace('>How to Play<', '>Как играть<');
t = t.replace('>Tips<', '>Советы<');

// Headings
t = t.replace('What Is Sprunki Phase 7?', 'Что Такое Sprunki Phase 7?');
t = t.replace('Most Incredibox mods give you seven slots. Phase 7 makes those seven slots <strong>matter</strong>.',
  'Большинство модов Incredibox дают вам семь слотов. Phase 7 делает эти семь слотов <strong>значимыми</strong>.');
t = t.replace('Built by <strong>samerysio</strong> on Scratch: Sprunki Phase 7 is the most technically evolved phase in the series. Not because it is the scariest — Phase 4 holds that title. Not because it introduced the dark aesthetic — Phase 3 did that. Phase 7 matters because it is the first phase where every single slot contributes something no other slot can replace. Seven layers: each one a distinct frequency range: a distinct character category: a distinct job in the mix. Fill all seven and the track does not get muddy. It gets <strong>cinematic</strong>.',
  'Создано <strong>samerysio</strong> на Scratch: Sprunki Phase 7 — это самая технически развитая фаза в серии. Не потому, что она самая страшная — это звание принадлежит Phase 4. Не потому, что она ввела тёмную эстетику — это сделала Phase 3. Phase 7 важна потому, что это первая фаза, где каждый слот вносит что-то, что не может заменить ни один другой слот. Семь слоёв: каждый — отдельный частотный диапазон: отдельная категория персонажей: отдельная роль в миксе. Заполните все семь, и трек не станет грязным. Он станет <strong>кинематографичным</strong>.');

t = t.replace('alt="Sprunki Phase 7 gameplay with neon-lit horror visuals and 7-layer mixing interface"',
  'alt="Геймплей Sprunki Phase 7 с неоновыми хоррор-визуалами и 7-слойным интерфейсом сведения"');

t = t.replace('The visual aesthetic is neon-lit horror — dark corridors lit by glowing characters: glitch effects that fracture across the stage: animations that sync to every beat and bass hit. The sound engine is the deepest in the series: cinematic synths that swell and recede: deep bass that rumbles at frequencies you feel more than hear: and horror whispers that sit underneath everything like a second track playing in reverse. Free in any browser. No download. No account. Just open and go seven deep.',
  'Визуальный стиль — неоновый хоррор: тёмные коридоры, освещённые светящимися персонажами: глитч-эффекты, расходящиеся по сцене: анимации, синхронизированные с каждым ударом и басовой нотой. Звуковой движок — самый глубокий в серии: кинематографичные синтезаторы, которые нарастают и затихают: глубокий бас, грохочущий на частотах, которые вы скорее чувствуете, чем слышите: и хоррор-шёпот, лежащий под всем, как второй трек, играющий задом наперёд. Бесплатно в любом браузере. Без скачивания. Без аккаунта. Просто откройте и погрузитесь на семь уровней.');

// vs Phase 6 heading
t = t.replace('Sprunki Phase 7 vs Phase 6 — What Is New', 'Sprunki Phase 7 против Phase 6 — Что Нового');

// Table headers vs phase6
t = t.replace('<th>Dimension</th><th>Phase 6</th><th>Phase 7</th>', '<th>Параметр</th><th>Phase 6</th><th>Phase 7</th>');

// Table rows
t = t.replace('<td><strong>Layer count</strong></td><td>Standard 7 slots: basic layering</td><td>7 discrete frequency bands: each slot has a defined sonic role</td>',
  '<td><strong>Количество слоёв</strong></td><td>Стандартные 7 слотов: базовое наслоение</td><td>7 дискретных частотных полос: каждый слот имеет определённую звуковую роль</td>');
t = t.replace('<td><strong>Sound engine</strong></td><td>Solid: functional</td><td>Cinematic: synth swells: sub-bass: stereo-width separation</td>',
  '<td><strong>Звуковой движок</strong></td><td>Надёжный: функциональный</td><td>Кинематографичный: синтезаторные волны: саб-бас: разделение стерео-ширины</td>');
t = t.replace('<td><strong>Visual identity</strong></td><td>Dark: standard horror palette</td><td>Neon-lit horror: glow effects: glitch fractures: beat-synced animations</td>',
  '<td><strong>Визуальный стиль</strong></td><td>Тёмный: стандартная хоррор-палитра</td><td>Неоновый хоррор: эффекты свечения: глитч-разрывы: анимации, синхронизированные с ритмом</td>');
t = t.replace('<td><strong>Character design</strong></td><td>Mutated: darker variants</td><td>Monsters: parasites: corrupted versions: neon-skinned forms</td>',
  '<td><strong>Дизайн персонажей</strong></td><td>Мутировавшие: более тёмные варианты</td><td>Монстры: паразиты: искажённые версии: неоновые формы</td>');
t = t.replace('<td><strong>Variants</strong></td><td>2-3 versions</td><td>5+ versions: Remastered: Reimagined: The Rework: IMB Definitive</td>',
  '<td><strong>Варианты</strong></td><td>2-3 версии</td><td>5+ версий: Remastered: Reimagined: The Rework: IMB Definitive</td>');
t = t.replace('<td><strong>Community use</strong></td><td>Gaming: music creation</td><td>Classroom rhythm tool: DJ sandbox: music education</td>',
  '<td><strong>Использование сообществом</strong></td><td>Игры: создание музыки</td><td>Инструмент для уроков ритма: DJ-песочница: музыкальное образование</td>');

t = t.replace('Phase 6 built the foundation. Phase 7 tuned every frequency. If Phase 6 is a good mix: Phase 7 is a mastered track.',
  'Phase 6 построила фундамент. Phase 7 настроила каждую частоту. Если Phase 6 — это хороший микс, то Phase 7 — это готовый мастеринг-трек.');

// Features heading
t = t.replace('Sprunki Phase 7 Features', 'Особенности Sprunki Phase 7');

// Feature cards
t = t.replace('7-Layer Discrete Mixing — Every Slot Has a Job', '7-Слойное Дискретное Сведение — У Каждого Слота Своя Роль');
t = t.replace('This is not seven identical slots. Each of the seven positions on the stage occupies a specific frequency band — low: low-mid: mid: high-mid: high: air: sub. Place a character in the wrong slot and the mix fights itself. Place them correctly and the track opens up into full cinematic width. No other Sprunki phase has this level of audio engineering built into the drag-and-drop interface.',
  'Это не семь одинаковых слотов. Каждая из семи позиций на сцене занимает определённую частотную полосу — низкие: нижняя середина: середина: верхняя середина: высокие: воздух: саб. Поместите персонажа не в тот слот, и микс будет бороться сам с собой. Разместите правильно, и трек раскроется в полную кинематографичную ширину. Ни одна другая фаза Sprunki не имеет такого уровня звукорежиссуры, встроенного в интерфейс перетаскивания.');

t = t.replace('Neon Horror Visual Identity', 'Визуальный Стиль Неоновый Хоррор');
t = t.replace('Phase 4 is dark horror. Phase 7 is neon horror — black backgrounds sliced by glowing character outlines: glitch fractures that spider across the stage: animations that sync to every kick drum and bass drop. The visual engine is the most responsive in the series. Characters do not just animate — they react. To the beat. To each other. To the intensity of the mix.',
  'Phase 4 — это тёмный хоррор. Phase 7 — это неоновый хоррор: чёрные фоны, прорезанные светящимися контурами персонажей: глитч-разрывы, расползающиеся по сцене: анимации, синхронизированные с каждым ударом бочки и басовым дропом. Визуальный движок — самый отзывчивый в серии. Персонажи не просто анимируются — они реагируют. На ритм. Друг на друга. На интенсивность микса.');

t = t.replace('Cinematic Sound Engine — Deep Bass: Sweeping Synths', 'Кинематографичный Звуковой Движок — Глубокий Бас: Объемлющие Синтезаторы');
t = t.replace('The audio in Phase 7 was built for headphones. Sub-bass frequencies that laptop speakers miss entirely. Synth pads that sweep across the stereo field left to right and back. Horror whispers panned to the edges so they feel like they are coming from behind you. The sound engine was designed to reward good listening setups — and to punish bad ones by hiding half the mix.',
  'Звук в Phase 7 создан для наушников. Саб-басовые частоты, которые динамики ноутбука полностью пропускают. Синтезаторные пэды, скользящие по стерео-полю слева направо и обратно. Хоррор-шёпот, панорамированный по краям, чтобы казалось, что он исходит из-за спины. Звуковой движок спроектирован так, чтобы вознаграждать хорошие аудиосистемы — и наказывать плохие, скрывая половину микса.');

t = t.replace('Monsters: Parasites: Corrupted — The Darkest Roster Yet', 'Монстры: Паразиты: Искажённые — Самый Тёмный Состав');
t = t.replace('Phase 7 does not pull punches on character design. Monsters with distorted proportions. Parasite characters that latch onto adjacent slots and alter their sound. Corrupted versions of familiar faces — recognizable but wrong. Neon-skinned forms that glow brighter as the mix intensifies. Each character category has a distinct visual language and sound profile. The roster is the largest and most varied of any phase.',
  'Phase 7 не сдерживается в дизайне персонажей. Монстры с искажёнными пропорциями. Персонажи-паразиты, которые прикрепляются к соседним слотам и изменяют их звук. Искажённые версии знакомых лиц — узнаваемые, но неправильные. Неоновые формы, которые светятся ярче по мере усиления микса. Каждая категория персонажей имеет свой визуальный язык и звуковой профиль. Состав — самый большой и разнообразный среди всех фаз.');

t = t.replace('Five Variants — One Core Engine', 'Пять Вариантов — Один Основной Движок');
t = t.replace('The Phase 7 ecosystem spans five major versions. Remastered upgrades the visuals to HD and refines the audio. Reimagined pushes the atmosphere darker with remixed sound packs. The Rework dives fully into horror with deep bass and distorted textures. IMB Definitive adds an expanded roster and hidden lore. Each variant keeps the 7-layer engine: each swaps the characters and sound library. Start with the core: branch into variants once you know the system.',
  'Экосистема Phase 7 включает пять основных версий. Remastered улучшает визуалы до HD и дорабатывает звук. Reimagined делает атмосферу темнее с ремикшированными звуковыми пакетами. The Rework полностью погружается в хоррор с глубоким басом и искажёнными текстурами. IMB Definitive добавляет расширенный состав и скрытый лор. Каждый вариант сохраняет 7-слойный движок, но меняет персонажей и звуковую библиотеку. Начните с основы, затем переходите к вариантам, когда освоите систему.');

t = t.replace('No Download: No Account — Free in Browser', 'Без Скачивания: Без Аккаунта — Бесплатно в Браузере');
t = t.replace('Runs in any browser. Free. No payment. No sign-up. Desktop with headphones strongly recommended — the cinematic sound engine hides its best frequencies from laptop speakers. Tablet works. Phone works but 7-layer mixing on a small screen is challenging.',
  'Работает в любом браузере. Бесплатно. Без оплаты. Без регистрации. Настоятельно рекомендуется компьютер с наушниками — кинематографичный звуковой движок скрывает свои лучшие частоты от динамиков ноутбука. Планшет работает. Телефон работает, но 7-слойное сведение на маленьком экране затруднительно.');

// Variants heading
t = t.replace('Which Phase 7 Variant Should You Play?', 'Какой Вариант Phase 7 Выбрать?');
t = t.replace('<th>Variant</th><th>Best For</th><th>Key Difference</th>', '<th>Вариант</th><th>Лучше всего для</th><th>Ключевое отличие</th>');
t = t.replace('<td><strong>Phase 7 (Core)</strong></td><td>First-time players</td><td>Learn the 7-layer system with the standard roster</td>',
  '<td><strong>Phase 7 (Core)</strong></td><td>Новичков</td><td>Изучение 7-слойной системы со стандартным составом</td>');
t = t.replace('<td><strong>Remastered</strong></td><td>Visual quality seekers</td><td>HD graphics: refined audio: optimized performance</td>',
  '<td><strong>Remastered</strong></td><td>Ценителей качества графики</td><td>HD-графика: улучшенный звук: оптимизированная производительность</td>');
t = t.replace('<td><strong>Reimagined</strong></td><td>Atmosphere seekers</td><td>Darker palette: remixed sound packs: more cinematic</td>',
  '<td><strong>Reimagined</strong></td><td>Ценителей атмосферы</td><td>Более тёмная палитра: ремикшированные звуковые пакеты: более кинематографично</td>');
t = t.replace('<td><strong>The Rework</strong></td><td>Horror fans</td><td>Deepest bass: most distorted textures: full horror immersion</td>',
  '<td><strong>The Rework</strong></td><td>Фанатов хоррора</td><td>Самый глубокий бас: самые искажённые текстуры: полное погружение в хоррор</td>');
t = t.replace('<td><strong>IMB Edition DEFINITIVE</strong></td><td>Completionists</td><td>Expanded roster: enhanced library: hidden lore to uncover</td>',
  '<td><strong>IMB Edition DEFINITIVE</strong></td><td>Коллекционеров</td><td>Расширенный состав: улучшенная библиотека: скрытый лор для раскрытия</td>');

// How to Play heading
t = t.replace('How to Play Sprunki Phase 7', 'Как Играть в Sprunki Phase 7');

// How to play steps
t = t.replace('<strong>Start with the low end — Slot 1 and 2:</strong> Place a beat character in Slot 1 (sub frequencies) and a bass character in Slot 2 (low-mid). These two slots are the foundation. If they clash: the entire mix collapses. Pick characters that complement each other — a tight kick paired with a rumbling bassline. Let them loop four times before adding anything. Listen for frequency overlap. If you hear mud: swap one.',
  '<strong>Начните с низких частот — Слот 1 и 2:</strong> Поместите персонажа ритма в Слот 1 (саб-частоты) и басового персонажа в Слот 2 (нижняя середина). Эти два слота — фундамент. Если они конфликтуют, весь микс рушится. Выбирайте персонажей, которые дополняют друг друга — плотный кик в паре с рокочущей бас-линией. Дайте им прозвучать четыре цикла, прежде чем добавлять что-либо. Слушайте на предмет частотного наложения. Если слышите грязь — замените один.');

t = t.replace('<strong>Build upward through the frequency spectrum:</strong> Slot 3 = mid-range melody. Slot 4 = high-mid synth or effect. Slot 5 = high-frequency detail (percussion tops: shimmers: glitch ticks). Slot 6 = air (reverb tails: ambient drones: stereo-width pads). Each slot occupies a specific frequency band. Do not put a bass character in Slot 5 — the mix will fight itself. The 7-layer system rewards discipline.',
  '<strong>Стройте вверх по частотному спектру:</strong> Слот 3 = мелодия средних частот. Слот 4 = синтезатор или эффект верхней середины. Слот 5 = высокочастотные детали (верхушки перкуссии: шорохи: глитч-тики). Слот 6 = воздух (хвосты реверберации: эмбиентные дроны: пэды стерео-ширины). Каждый слот занимает определённую частотную полосу. Не ставьте басового персонажа в Слот 5 — микс будет бороться сам с собой. 7-слойная система вознаграждает дисциплину.');

t = t.replace('<strong>Slot 7 is the wildcard — use it last:</strong> The seventh slot has no fixed frequency assignment. It is the flex slot: vocals: horror whispers: a second melody: an effect that glues everything together. The wildcard is what separates a competent Phase 7 mix from a great one. Save it for last. Fill Slots 1-6 first: then ask what is missing. That is what goes in Slot 7.',
  '<strong>Слот 7 — джокер — используйте его последним:</strong> Седьмой слот не имеет фиксированного частотного назначения. Это гибкий слот: вокал: хоррор-шёпот: вторая мелодия: эффект, склеивающий всё воедино. Джокер — это то, что отличает компетентный микс Phase 7 от великого. Оставьте его напоследок. Сначала заполните Слоты 1-6, затем спросите, чего не хватает. Это и пойдёт в Слот 7.');

t = t.replace('<strong>Listen on headphones before you share:</strong> Phase 7\'s sub-bass: stereo sweeps: and edge-panned whispers are invisible on laptop speakers. A mix that sounds thin on speakers might be full on headphones — and a mix that sounds full on speakers might be muddy on headphones. Reference your track on both before sharing.',
  '<strong>Слушайте в наушниках перед тем, как делиться:</strong> Саб-бас, стерео-свипы и панорамированный по краям шёпот Phase 7 не слышны на динамиках ноутбука. Микс, который звучит плоско на динамиках, может быть полным в наушниках — а микс, который звучит полно на динамиках, может быть грязным в наушниках. Проверьте свой трек на обоих перед публикацией.');

// Tips heading
t = t.replace('Sprunki Phase 7 Tips', 'Советы по Sprunki Phase 7');

// Tips
t = t.replace('<strong>Treat frequency placement as a puzzle:</strong> The 7-layer system is not a suggestion. Put a melody in the bass slot and it gets swallowed. Put a beat in the air slot and it sounds hollow. Spend your first session just experimenting with slot placement — put the same character in different slots and hear how the mix changes. Understanding the frequency map is the single biggest skill gap between Phase 7 beginners and veterans.',
  '<strong>Относитесь к частотному размещению как к головоломке:</strong> 7-слойная система — не предложение. Поставьте мелодию в басовый слот, и она потеряется. Поставьте ритм в воздушный слот, и он зазвучит пусто. Проведите первую сессию, просто экспериментируя с размещением по слотам — помещайте одного и того же персонажа в разные слоты и слушайте, как меняется микс. Понимание частотной карты — это самый большой разрыв в навыках между новичками и ветеранами Phase 7.');

t = t.replace('<strong>Three well-placed characters beat seven random ones:</strong> Phase 7 rewards precision over quantity. A bass in Slot 2 + a melody in Slot 3 + a wildcard vocal in Slot 7 — with four empty slots — sounds cleaner and more cinematic than seven characters crammed into the wrong frequencies. Empty slots are not a failure. They are headroom.',
  '<strong>Три правильно размещённых персонажа лучше семи случайных:</strong> Phase 7 вознаграждает точность, а не количество. Бас в Слоте 2 + мелодия в Слоте 3 + вокал-джокер в Слоте 7 — с четырьмя пустыми слотами — звучит чище и кинематографичнее, чем семь персонажей, втиснутых в неправильные частоты. Пустые слоты — не провал. Это запас по громкости.');

t = t.replace('<strong>Use the wildcard slot to fix a weak mix:</strong> If your track feels thin: put a sub-bass rumble in Slot 7 to fill the low end. If it feels muddy: put a high-frequency detail in Slot 7 to add clarity. If it feels flat: put a stereo-width pad in Slot 7 to open up the soundstage. The wildcard is your mix doctor.',
  '<strong>Используйте слот-джокер для исправления слабого микса:</strong> Если ваш трек звучит плоско: добавьте саб-басовый гул в Слот 7, чтобы заполнить низ. Если звучит грязно: добавьте высокочастотную деталь в Слот 7 для ясности. Если звучит плоско: добавьте пэд стерео-ширины в Слот 7, чтобы раскрыть звуковую сцену. Джокер — ваш звуковой доктор.');

t = t.replace('<strong>Reference Phase 6 tracks to hear the difference:</strong> Build the same arrangement in Phase 6 and Phase 7. Use the same character types in the same order. The difference in clarity: depth: and stereo separation is the best argument for why Phase 7 exists. Teachers use this exercise in classrooms to demonstrate frequency mixing concepts.',
  '<strong>Сравните с треками Phase 6, чтобы услышать разницу:</strong> Постройте одинаковую аранжировку в Phase 6 и Phase 7. Используйте те же типы персонажей в том же порядке. Разница в ясности, глубине и стерео-разделении — лучший аргумент в пользу существования Phase 7. Учителя используют это упражнение на уроках для демонстрации концепций частотного сведения.');

// FAQ heading
t = t.replace('Frequently Asked Questions', 'Часто Задаваемые Вопросы');

// FAQ body
t = t.replace('<h3>Can I play Sprunki Phase 7 on mobile?</h3>', '<h3>Можно ли играть в Sprunki Phase 7 на мобильном?</h3>');
t = t.replace('<p>Yes: it runs in mobile browsers. Desktop with headphones strongly recommended — 7 layers need screen space for precise placement and proper speakers to reveal the full frequency range.</p>',
  '<p>Да, игра работает в мобильных браузерах. Настоятельно рекомендуется компьютер с наушниками — 7 слоёв требуют места на экране для точного размещения и хороших динамиков, чтобы раскрыть полный частотный диапазон.</p>');

t = t.replace('<h3>Do I need musical experience to play Phase 7?</h3>', '<h3>Нужен ли музыкальный опыт для игры в Phase 7?</h3>');
t = t.replace('<p>No. The drag-and-drop interface works the same as every Sprunki mod. Music teachers use Phase 7 in classrooms to introduce rhythm and frequency concepts — it is designed to be approachable. Start with two slots: add more as you get comfortable.</p>',
  '<p>Нет. Интерфейс перетаскивания работает так же, как и в любом моде Sprunki. Учителя музыки используют Phase 7 на уроках для знакомства с ритмом и частотными концепциями — игра спроектирована доступной. Начните с двух слотов и добавляйте по мере освоения.</p>');

t = t.replace('<h3>Is Sprunki Phase 7 an official Incredibox game?</h3>', '<h3>Является ли Sprunki Phase 7 официальной игрой Incredibox?</h3>');
t = t.replace('<p>No. It is a fan-made community mod by samerysio. Not affiliated with So Far So Good: the studio behind the original Incredibox. All Sprunki phases are community-created.</p>',
  '<p>Нет. Это фанатский мод, созданный сообществом, автор — samerysio. Не связан с So Far So Good, студией, создавшей оригинальный Incredibox. Все фазы Sprunki созданы сообществом.</p>');

t = t.replace('<h3>Which variant should I start with?</h3>', '<h3>С какого варианта стоит начать?</h3>');
t = t.replace('<p>Core Phase 7 to learn the 7-layer system. Remastered for better visuals. The Rework for the deepest horror experience. IMB Definitive for the largest roster. Start with core: branch once you understand the frequency map.</p>',
  '<p>Основная Phase 7 — чтобы изучить 7-слойную систему. Remastered — для лучшей графики. The Rework — для самого глубокого хоррор-опыта. IMB Definitive — для самого большого состава. Начните с основы, затем переходите к вариантам, когда поймёте частотную карту.</p>');

t = t.replace('<h3>Does progress save between sessions?</h3>', '<h3>Сохраняется ли прогресс между сессиями?</h3>');
t = t.replace('<p>Unlocks and recordings save to browser local storage. Clearing browser data resets everything. No cloud save. Screenshot your best arrangements before clearing cache.</p>',
  '<p>Разблокировки и записи сохраняются в локальном хранилище браузера. Очистка данных браузера сбрасывает всё. Облачного сохранения нет. Делайте скриншоты ваших лучших аранжировок перед очисткой кэша.</p>');

// Related games heading
t = t.replace('Related Sprunki Games', 'Похожие Игры Sprunki');

// Related links
t = t.replace('>Play Sprunki Phase 4 Online<', '>Играть в Sprunki Phase 4 Онлайн<');
t = t.replace('>Play Sprunki Phase 3<', '>Играть в Sprunki Phase 3<');
t = t.replace('>Play Sprunki Pyramixed 2<', '>Играть в Sprunki Pyramixed 2<');
t = t.replace('>Play Sprunki Corruptbox<', '>Играть в Sprunki Corruptbox<');

// Comments section
t = t.replace('<h2 class="comments-heading">Comments</h2>', '<h2 class="comments-heading">Комментарии</h2>');
t = t.replace('Be the first to review', 'Будьте первым, кто оставит отзыв');
t = t.replace('placeholder="Your Name"', 'placeholder="Ваше Имя"');
t = t.replace('placeholder="Your Comment"', 'placeholder="Ваш Комментарий"');
t = t.replace('>Post Comment<', '>Опубликовать<');

// Footer
t = t.replace('<p class="footer-about">Play Sprunki games on 2v2.io. Discover fan-made Incredibox mods: horror music experiences: and browser-based rhythm adventures.</p>',
  '<p class="footer-about">Играйте в игры Sprunki на 2v2.io. Откройте для себя фанатские моды Incredibox: хоррор-музыкальные опыты и браузерные ритм-приключения.</p>');
t = t.replace('<h3 class="footer-heading">Contact Us</h3>', '<h3 class="footer-heading">Свяжитесь с Нами</h3>');
t = t.replace('All rights reserved.', 'Все права защищены.');
t = t.replace('>Privacy Policy<', '>Политика конфиденциальности<');
t = t.replace('>Terms of Service<', '>Условия использования<');
t = t.replace('>About Us<', '>О нас<');
t = t.replace('>Contact Us<', '>Свяжитесь с нами<');
t = t.replace('>Copyright Notice<', '>Авторские права<');

// Fix Comment form JS string
t = t.replace("rv.textContent='Be the first to review'", "rv.textContent='Будьте первым, кто оставит отзыв'");

// Fix alt text on game cover
t = t.replace('alt="Sprunki Phase 7 7-layer music game"', 'alt="Sprunki Phase 7 7-слойная музыкальная игра"');

fs.writeFileSync('c:/Users/Administrator/Desktop/2v2.io/ru/games/sprunki-phase-7.html', t, 'utf8');
console.log('Done: ru/games/sprunki-phase-7.html');
