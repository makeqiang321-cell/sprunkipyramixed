const fs = require('fs');
const src = fs.readFileSync('c:/Users/Administrator/Desktop/2v2.io/games/phase-16.html', 'utf8');
let t = src;

// Structural changes
t = t.replace(/lang="en"/g, 'lang="ru"');
t = t.replace(/https:\/\/2v2\.io\/games\/phase-16\.html/g, 'https://2v2.io/ru/games/phase-16.html');
// Fix en hreflang
t = t.replace('hreflang="en" href="https://2v2.io/ru/games/phase-16.html"', 'hreflang="en" href="https://2v2.io/games/phase-16.html"');
t = t.replace('hreflang="x-default" href="https://2v2.io/ru/games/phase-16.html"', 'hreflang="x-default" href="https://2v2.io/games/phase-16.html"');
// Add ru hreflang
t = t.replace('hreflang="en" href="https://2v2.io/games/phase-16.html">',
  'hreflang="en" href="https://2v2.io/games/phase-16.html">\n    <link rel="alternate" hreflang="ru" href="https://2v2.io/ru/games/phase-16.html">');

// OG
t = t.replace('"og:url" content="https://2v2.io/ru/games/phase-16.html">',
  '"og:url" content="https://2v2.io/ru/games/phase-16.html">\n    <meta property="og:locale" content="ru">');
t = t.replace('"og:title" content="Sprunki Phase 16 Dashdoshty — Rhythm Platformer"',
  '"og:title" content="Sprunki Phase 16 Dashdoshty — Ритм-Платформер"');
t = t.replace('"og:description" content="Your movement IS the music. Dash, jump, and slide through 16 rhythm zones. Free in browser."',
  '"og:description" content="Твоё движение — ЭТО музыка. Беги, прыгай и скользи через 16 ритм-зон. Бесплатно в браузере."');

// Twitter
t = t.replace('"twitter:title" content="Sprunki Phase 16 Dashdoshty — Free Online Rhythm Game"',
  '"twitter:title" content="Sprunki Phase 16 Dashdoshty — Бесплатная Онлайн Ритм-Игра"');
t = t.replace('"twitter:description" content="Your movement IS the music. Dash, jump, and slide through 16 rhythm zones."',
  '"twitter:description" content="Твоё движение — ЭТО музыка. Беги, прыгай и скользи через 16 ритм-зон."');

// Schema
t = t.replace('"inLanguage": ["en"]', '"inLanguage": ["ru"]');
t = t.replace('"name":"Home","item":"https://2v2.io"', '"name":"Главная","item":"https://2v2.io"');
t = t.replace('"name":"All Games","item":"https://2v2.io/games.html"', '"name":"Все игры","item":"https://2v2.io/games.html"');
t = t.replace('"description": "A rhythm platformer where movement creates the soundtrack. Dash, jump, and slide through 16 zones — each run produces a unique track. Free in browser."',
  '"description": "Ритм-платформер, где движение создаёт музыку. Беги, прыгай и скользи через 16 зон — каждый забег создаёт уникальный трек. Бесплатно в браузере."');

// Schema FAQ
t = t.replace('"name":"What makes Sprunki Phase 16 Dashdoshty different from other Sprunki mods?"',
  '"name":"Чем Sprunki Phase 16 Dashdoshty отличается от других модов Sprunki?"');
t = t.replace('"text":"It is the only platformer in the series. Every other phase is drag-and-drop. Phase 16 has you controlling a character in real time — movement creates the music, not the other way around."',
  '"text":"Это единственный платформер в серии. Все остальные фазы — перетаскивание. В Phase 16 вы управляете персонажем в реальном времени — движение создаёт музыку, а не наоборот."');

t = t.replace('"name":"How do dash chains work in Sprunki Phase 16 Dashdoshty?"',
  '"name":"Как работают цепочки рывков в Sprunki Phase 16 Dashdoshty?"');
t = t.replace('"text":"Consecutive dashes stack a multiplier that intensifies percussion. Short chains produce staccato rhythms. Long chains build dense layered beats. Break the chain to reset — silence between chains is a compositional tool."',
  '"text":"Последовательные рывки накапливают множитель, усиливающий перкуссию. Короткие цепочки создают стаккато-ритмы. Длинные цепочки строят плотные многослойные биты. Разорвите цепочку для сброса — тишина между цепочками это композиционный инструмент."');

t = t.replace('"name":"Which version of Phase 16 Dashdoshty should I start with?"',
  '"name":"С какой версии Phase 16 Dashdoshty стоит начать?"');
t = t.replace('"text":"Start with the core version to learn the dash mechanics. Mutated Update for new sounds and visuals. Pointy Version for tighter dash windows. Remix Edition for deeper chain mechanics."',
  '"text":"Начните с основной версии, чтобы освоить механику рывков. Mutated Update — для новых звуков и визуалов. Pointy Version — для более жёстких окон рывков. Remix Edition — для углублённой механики цепочек."');

t = t.replace('"name":"How many zones are in Sprunki Phase 16 Dashdoshty?"',
  '"name":"Сколько зон в Sprunki Phase 16 Dashdoshty?"');
t = t.replace('"text":"16 zones, each with a distinct sound palette. Zone 1 uses bass and drums. By Zone 8, synth pads and vocal chops enter. Zone 16 uses all five sound categories at full frequency range."',
  '"text":"16 зон, каждая с уникальной звуковой палитрой. Зона 1 использует бас и барабаны. К Зоне 8 добавляются синтезаторные пэды и вокальные сэмплы. Зона 16 использует все пять звуковых категорий на полном частотном диапазоне."');

t = t.replace('"name":"Do I need headphones for Phase 16 Dashdoshty?"',
  '"name":"Нужны ли наушники для Phase 16 Dashdoshty?"');
t = t.replace('"text":"Yes. The percussion layers and dash chain dynamics rely on low-end frequencies that laptop speakers flatten. Headphones reveal the full rhythmic detail of each zone."',
  '"text":"Да. Перкуссионные слои и динамика цепочек рывков зависят от низких частот, которые динамики ноутбука уплощают. Наушники раскрывают полную ритмическую детализацию каждой зоны."');

// Title & meta
t = t.replace('<title>Play Sprunki Phase 16 Dashdoshty Online Free | Rhythm Platformer | 2v2.io</title>',
  '<title>Играть в Sprunki Phase 16 Dashdoshty Онлайн Бесплатно | Ритм-Платформер | 2v2.io</title>');
t = t.replace('<meta name="description" content="Play Sprunki Phase 16 Dashdoshty online — the only Sprunki platformer. Your movement creates the music. Dash, jump, slide through 16 rhythm zones. Free in browser.">',
  '<meta name="description" content="Играйте в Sprunki Phase 16 Dashdoshty онлайн — единственный платформер Sprunki. Ваше движение создаёт музыку. Бегите, прыгайте, скользите через 16 ритм-зон. Бесплатно в браузере.">');

// Nav + Breadcrumb
t = t.replace(/>(Home|All Games)</g, (m) => m === '>Home<' ? '>Главная<' : '>Все игры<');

// Preview
t = t.replace('Run. Dash. Create Music.', 'Беги. Рывок. Создавай Музыку.');
t = t.replace('>Play Game<', '>Играть<');

// H1
t = t.replace('Sprunki Phase 16 Dashdoshty — Run. Dash. Create.', 'Sprunki Phase 16 Dashdoshty — Беги. Рывок. Создавай.');

// Meta
t = t.replace('Published: <strong>June 2025</strong>', 'Опубликовано: <strong>Июнь 2025</strong>');
t = t.replace('Last updated: <strong>July 2026</strong>', 'Обновлено: <strong>Июль 2026</strong>');
t = t.replace('By <strong>2v2.io Game Guides</strong>', 'Автор: <strong>2v2.io Game Guides</strong>');

// Tabs
t = t.replace('>About<', '>Об игре<');
t = t.replace('>Key Features<', '>Особенности<');
t = t.replace('>How to Play<', '>Как играть<');
t = t.replace('>Tips<', '>Советы<');
t = t.replace('>Why Players Love It<', '>Почему Игроки Это Любят<');

// Headings & Content
t = t.replace('What Is Sprunki Phase 16 Dashdoshty?', 'Что Такое Sprunki Phase 16 Dashdoshty?');
t = t.replace('<strong>Sprunki Phase 16 Dashdoshty</strong> is the only platformer in the Sprunki series.',
  '<strong>Sprunki Phase 16 Dashdoshty</strong> — единственный платформер в серии Sprunki.');
t = t.replace('Every other phase is drag-and-drop music mixing. This one has you controlling a character in real time — dash fires drums, jump bends pitch, slide adds distortion. Stand still and the track goes silent. Start moving and the music builds around you. Five movement types map to five sound layers. Sixteen zones, each with a different sound palette. Two players can finish the same zone and produce completely different music because the track is whatever your movement makes it.',
  'Все остальные фазы — это сведение музыки перетаскиванием. Здесь вы управляете персонажем в реальном времени — рывок запускает барабаны, прыжок меняет высоту тона, скольжение добавляет дисторшн. Стойте на месте — трек замолкает. Начните двигаться — и музыка строится вокруг вас. Пять типов движений соответствуют пяти звуковым слоям. Шестнадцать зон, каждая с разной звуковой палитрой. Два игрока могут пройти одну и ту же зону и создать совершенно разную музыку, потому что трек — это то, что делает ваше движение.');

t = t.replace('alt="Sprunki Phase 16 Dashdoshty rhythm platformer gameplay"',
  'alt="Геймплей ритм-платформера Sprunki Phase 16 Dashdoshty"');

t = t.replace('Sprunki Phase 16 Dashdoshty Key Features', 'Ключевые Особенности Sprunki Phase 16 Dashdoshty');
t = t.replace('Movement IS the instrument', 'Движение — ЭТО инструмент');
t = t.replace('Dash fires percussion. Jump modulates pitch. Slide tears distortion through the mix. Speed shapes intensity — sprint and the track gets aggressive, slow down and it breathes. Nothing plays automatically in <strong>Sprunki Phase 16 Dashdoshty</strong>. If you stop moving, the music stops with you. Five movement types, five sound layers, one character under your control.',
  'Рывок запускает перкуссию. Прыжок модулирует высоту тона. Скольжение прорезает дисторшн сквозь микс. Скорость формирует интенсивность — бегите быстро, и трек становится агрессивным, замедляйтесь — и он дышит. Ничто не играет автоматически в <strong>Sprunki Phase 16 Dashdoshty</strong>. Если вы перестаёте двигаться, музыка останавливается вместе с вами. Пять типов движений, пять звуковых слоёв, один персонаж под вашим контролем.');

t = t.replace('16 zones, 16 sound palettes', '16 зон, 16 звуковых палитр');
t = t.replace('Zone 1 starts with bass and drum kits. By Zone 8, synth pads and vocal chops join the mix. Zone 16 throws all five sound categories at you at full frequency range. Each zone has a different node layout, a different tempo, and a different optimal path. The zones are not just harder versions of each other — they are different instruments.',
  'Зона 1 начинается с баса и ударных. К Зоне 8 в микс добавляются синтезаторные пэды и вокальные сэмплы. Зона 16 обрушивает на вас все пять звуковых категорий на полном частотном диапазоне. Каждая зона имеет свою раскладку узлов, свой темп и свой оптимальный путь. Зоны — это не просто усложнённые версии друг друга — это разные инструменты.');

t = t.replace('Dash chain system', 'Система цепочек рывков');
t = t.replace('Consecutive dashes in <strong>Sprunki Phase 16 Dashdoshty</strong> stack a chain multiplier that intensifies the percussion layer. Short chains give you tight staccato rhythms. Long chains build dense, layered beats. Break the chain and the beat resets. The best players break their chains on purpose — using silence between chains as a rhythmic tool.',
  'Последовательные рывки в <strong>Sprunki Phase 16 Dashdoshty</strong> накапливают множитель цепочки, усиливающий перкуссионный слой. Короткие цепочки дают плотные стаккато-ритмы. Длинные цепочки строят плотные, многослойные биты. Разорвите цепочку — и бит сбрасывается. Лучшие игроки разрывают цепочки намеренно — используя тишину между цепочками как ритмический инструмент.');

t = t.replace('Three major updates', 'Три крупных обновления');
t = t.replace('The Mutated Update replaced sound packs and character visuals. The Pointy Version tightened dash windows for players who wanted harder timing. The Remix Edition added deeper chain mechanics and enhanced animations. Each version keeps the same core rule — movement makes the music — but changes how that rule feels.',
  'Mutated Update заменил звуковые пакеты и визуалы персонажей. Pointy Version ужесточил окна рывков для игроков, которым нужен более сложный тайминг. Remix Edition добавил углублённую механику цепочек и улучшенные анимации. Каждая версия сохраняет одно и то же основное правило — движение создаёт музыку — но меняет ощущение от этого правила.');

t = t.replace('How to Play Sprunki Phase 16 Dashdoshty', 'Как Играть в Sprunki Phase 16 Dashdoshty');
t = t.replace('Move on the beat. Every zone pulses on a fixed rhythm grid — dash in sync with the pulse and the percussion lands clean. Dash off-beat and it gets muddy. Precision beats speed every time.',
  'Двигайтесь в ритм. Каждая зона пульсирует на фиксированной ритмической сетке — делайте рывок синхронно с пульсом, и перкуссия ложится чисто. Рывок не в такт — и звук становится грязным. Точность всегда побеждает скорость.');
t = t.replace('Hit the nodes. Glowing pickups scattered through each zone unlock new sound layers. Hit them all and the composition is full — basslines, vocals, effects. Skip them and the track plays thin. A complete clear means leaving nothing behind.',
  'Собирайте узлы. Светящиеся предметы, разбросанные по каждой зоне, открывают новые звуковые слои. Соберите все — и композиция полная: бас-линии, вокал, эффекты. Пропустите — и трек звучит плоско. Полное прохождение означает, что ничего не осталось позади.');
t = t.replace('Choose your path. Every zone splits into upper and lower routes during the countdown. Upper path is melody country — synth pads, vocal chops, air frequencies. Lower path belongs to percussion — kicks, snares, sub-bass. You commit to one in the opening seconds. Changing mid-run means missing nodes.',
  'Выбирайте свой путь. Каждая зона разделяется на верхний и нижний маршруты во время обратного отсчёта. Верхний путь — страна мелодий: синтезаторные пэды, вокальные сэмплы, воздушные частоты. Нижний путь принадлежит перкуссии: кики, снейры, саб-бас. Вы выбираете один в первые секунды. Смена маршрута на ходу означает пропуск узлов.');

t = t.replace('Sprunki Phase 16 Dashdoshty Tips', 'Советы по Sprunki Phase 16 Dashdoshty');
t = t.replace('<strong>Short chains sound better:</strong> Long dash chains build intensity but lose rhythmic detail. Two or three short dashes with clean breaks between them produce more interesting percussion than one sustained chain in <strong>Sprunki Phase 16 Dashdoshty</strong>.',
  '<strong>Короткие цепочки звучат лучше:</strong> Длинные цепочки рывков наращивают интенсивность, но теряют ритмическую детализацию. Два или три коротких рывка с чистыми разрывами между ними создают более интересную перкуссию, чем одна продолжительная цепочка в <strong>Sprunki Phase 16 Dashdoshty</strong>.');
t = t.replace('<strong>Try the same zone at different speeds:</strong> Sprint through Zone 3 and it sounds aggressive and raw. Play it slow and the same nodes produce a completely different atmosphere. Speed changes the texture of every sound layer.',
  '<strong>Попробуйте одну и ту же зону на разных скоростях:</strong> Пробегите Зону 3 быстро — и она звучит агрессивно и сыро. Играйте медленно — и те же узлы создают совершенно другую атмосферу. Скорость меняет текстуру каждого звукового слоя.');
t = t.replace('<strong>Record and compare runs:</strong> Hit record before a zone, play through it, save the track. Do the same zone again a week later. The difference in timing and route choices tells you what improved.',
  '<strong>Записывайте и сравнивайте забеги:</strong> Нажмите запись перед зоной, пройдите её, сохраните трек. Пройдите ту же зону через неделю. Разница в тайминге и выборе маршрута покажет, что улучшилось.');
t = t.replace('<strong>Headphones are mandatory:</strong> The dash chain percussion dynamics and zone-specific low-end are invisible on laptop speakers. Over-ear headphones reveal the full rhythmic detail of <strong>Sprunki Phase 16 Dashdoshty</strong>.',
  '<strong>Наушники обязательны:</strong> Динамика перкуссии цепочек рывков и зональные низкие частоты не слышны на динамиках ноутбука. Полноразмерные наушники раскрывают всю ритмическую детализацию <strong>Sprunki Phase 16 Dashdoshty</strong>.');

// FAQ body
t = t.replace('Sprunki Phase 16 Dashdoshty FAQ', 'Часто Задаваемые Вопросы о Sprunki Phase 16 Dashdoshty');
t = t.replace('<h3>What makes Sprunki Phase 16 Dashdoshty different from other Sprunki phases?</h3>',
  '<h3>Чем Sprunki Phase 16 Dashdoshty отличается от других фаз Sprunki?</h3>');
t = t.replace('<p>It is the only platformer. Every other phase is drag-and-drop. Phase 16 has you running, dashing, and jumping — movement creates the music instead of the other way around.</p>',
  '<p>Это единственный платформер. Все остальные фазы — перетаскивание. В Phase 16 вы бегаете, делаете рывки и прыгаете — движение создаёт музыку, а не наоборот.</p>');
t = t.replace('<h3>How do dash chains work in Sprunki Phase 16 Dashdoshty?</h3>',
  '<h3>Как работают цепочки рывков в Sprunki Phase 16 Dashdoshty?</h3>');
t = t.replace('<p>Consecutive dashes stack a multiplier that intensifies percussion. Short chains = staccato. Long chains = dense layered beats. Break the chain to reset — silence is a compositional tool.</p>',
  '<p>Последовательные рывки накапливают множитель, усиливающий перкуссию. Короткие цепочки = стаккато. Длинные цепочки = плотные многослойные биты. Разорвите цепочку для сброса — тишина это композиционный инструмент.</p>');
t = t.replace('<h3>Which version of Sprunki Phase 16 Dashdoshty should I play first?</h3>',
  '<h3>С какой версии Sprunki Phase 16 Dashdoshty стоит начать?</h3>');
t = t.replace('<p>Start with the core version to learn dash timing. Mutated Update for new sounds and visuals. Pointy Version for tighter dash windows. Remix Edition for deeper chain mechanics.</p>',
  '<p>Начните с основной версии, чтобы освоить тайминг рывков. Mutated Update — для новых звуков и визуалов. Pointy Version — для более жёстких окон рывков. Remix Edition — для углублённой механики цепочек.</p>');
t = t.replace('<h3>How many zones are in Sprunki Phase 16 Dashdoshty?</h3>',
  '<h3>Сколько зон в Sprunki Phase 16 Dashdoshty?</h3>');
t = t.replace('<p>Sixteen. Zone 1 uses bass and drums. Zone 8 adds synth and vocals. Zone 16 uses all five sound categories at full range.</p>',
  '<p>Шестнадцать. Зона 1 использует бас и барабаны. Зона 8 добавляет синтезатор и вокал. Зона 16 использует все пять звуковых категорий на полном диапазоне.</p>');
t = t.replace('<h3>Do I need headphones for Sprunki Phase 16 Dashdoshty?</h3>',
  '<h3>Нужны ли наушники для Sprunki Phase 16 Dashdoshty?</h3>');
t = t.replace('<p>Yes. Dash chain dynamics and zone-specific low-end are lost on laptop speakers. Headphones reveal the full rhythmic detail of every zone.</p>',
  '<p>Да. Динамика цепочек рывков и зональные низкие частоты теряются на динамиках ноутбука. Наушники раскрывают полную ритмическую детализацию каждой зоны.</p>');

t = t.replace('Why Players Love Sprunki Phase 16 Dashdoshty', 'Почему Игроки Любят Sprunki Phase 16 Dashdoshty');
t = t.replace('The community does not compare clear times — they compare whose run sounded better. That shift from speed to sound quality turns every zone into a creative challenge. Two players can take the same zone and walk away with completely different tracks. Short dashes, long chains, upper paths, lower routes — the music is whatever your movement makes it. It is the only Sprunki phase where you are not just building a beat. You are running through it.',
  'Сообщество сравнивает не время прохождения — а чей забег звучал лучше. Этот сдвиг от скорости к качеству звука превращает каждую зону в творческое испытание. Два игрока могут пройти одну и ту же зону и уйти с совершенно разными треками. Короткие рывки, длинные цепочки, верхние пути, нижние маршруты — музыка это то, что делает ваше движение. Это единственная фаза Sprunki, где вы не просто строите бит. Вы пробегаете сквозь него.');

// Related
t = t.replace('Related Sprunki Games', 'Похожие Игры Sprunki');
t = t.replace('>Play Sprunki Phase 4 — Full Horror<', '>Играть в Sprunki Phase 4 — Полный Хоррор<');
t = t.replace('>Play Sprunki Phase 7 — 7-Layer Mixing<', '>Играть в Sprunki Phase 7 — 7-Слойное Сведение<');
t = t.replace('>Play Sprunki Pyramixed Phase 3<', '>Играть в Sprunki Pyramixed Phase 3<');
t = t.replace('>Play Sprunki Corruptbox<', '>Играть в Sprunki Corruptbox<');

// Comments
t = t.replace('<h2 class="comments-heading">Comments</h2>', '<h2 class="comments-heading">Комментарии</h2>');
t = t.replace(/Be the first to review/g, 'Будьте первым, кто оставит отзыв');
t = t.replace('placeholder="Your Name"', 'placeholder="Ваше Имя"');
t = t.replace('placeholder="Your Comment"', 'placeholder="Ваш Комментарий"');
t = t.replace('>Post Comment<', '>Опубликовать<');

// Footer
t = t.replace('<p class="footer-about">Play Sprunki games on 2v2.io. Discover fan-made Incredibox mods, rhythm platformers, and browser-based music adventures.</p>',
  '<p class="footer-about">Играйте в игры Sprunki на 2v2.io. Откройте для себя фанатские моды Incredibox, ритм-платформеры и браузерные музыкальные приключения.</p>');
t = t.replace('<h3 class="footer-heading">Contact Us</h3>', '<h3 class="footer-heading">Свяжитесь с Нами</h3>');
t = t.replace('All rights reserved.', 'Все права защищены.');
t = t.replace('>Privacy Policy<', '>Политика конфиденциальности<');
t = t.replace('>Terms of Service<', '>Условия использования<');
t = t.replace('>About Us<', '>О нас<');
t = t.replace('>Contact Us<', '>Свяжитесь с нами<');
t = t.replace('>Copyright Notice<', '>Авторские права<');

// Alt text
t = t.replace('alt="Sprunki Phase 16 Dashdoshty rhythm platformer"', 'alt="Sprunki Phase 16 Dashdoshty ритм-платформер"');

fs.writeFileSync('c:/Users/Administrator/Desktop/2v2.io/ru/games/phase-16.html', t, 'utf8');
console.log('Done: ru/games/phase-16.html');
