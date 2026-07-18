const fs = require('fs');
const src = fs.readFileSync('c:/Users/Administrator/Desktop/2v2.io/games/sprunki-pvz.html', 'utf8');
let t = src;

// Structural
t = t.replace(/lang="en"/g, 'lang="ru"');
t = t.replace(/https:\/\/2v2\.io\/games\/sprunki-pvz\.html/g, 'https://2v2.io/ru/games/sprunki-pvz.html');
t = t.replace('hreflang="en" href="https://2v2.io/ru/games/sprunki-pvz.html"', 'hreflang="en" href="https://2v2.io/games/sprunki-pvz.html"');
t = t.replace('hreflang="x-default" href="https://2v2.io/ru/games/sprunki-pvz.html"', 'hreflang="x-default" href="https://2v2.io/games/sprunki-pvz.html"');
t = t.replace('hreflang="en" href="https://2v2.io/games/sprunki-pvz.html">',
  'hreflang="en" href="https://2v2.io/games/sprunki-pvz.html">\n    <link rel="alternate" hreflang="ru" href="https://2v2.io/ru/games/sprunki-pvz.html">');
t = t.replace('"og:url" content="https://2v2.io/ru/games/sprunki-pvz.html">',
  '"og:url" content="https://2v2.io/ru/games/sprunki-pvz.html">\n    <meta property="og:locale" content="ru">');
t = t.replace('"og:title" content="Sprunki PvZ — Plants vs Zombies Music Mod"',
  '"og:title" content="Sprunki PvZ — Plants vs Zombies Музыкальный Мод"');
t = t.replace('"og:description" content="Mix plant melodies with zombie beats. Hidden combos, PvZ characters, free in browser."',
  '"og:description" content="Смешивайте мелодии растений с битами зомби. Скрытые комбо, персонажи PvZ, бесплатно в браузере."');
t = t.replace('"twitter:title" content="Sprunki PvZ — Plants vs Zombies Music Mod"',
  '"twitter:title" content="Sprunki PvZ — Plants vs Zombies Музыкальный Мод"');
t = t.replace('"twitter:description" content="Plants bring melodies. Zombies bring beats. Free in browser."',
  '"twitter:description" content="Растения приносят мелодии. Зомби приносят биты. Бесплатно в браузере."');
t = t.replace('"inLanguage": ["en"]', '"inLanguage": ["ru"]');
t = t.replace('"name":"Home","item":"https://2v2.io"', '"name":"Главная","item":"https://2v2.io"');
t = t.replace('"name":"All Games","item":"https://2v2.io/games.html"', '"name":"Все игры","item":"https://2v2.io/games.html"');
t = t.replace('"description": "A Plants vs Zombies Incredibox mod. Mix plant melodies with zombie beats, unlock hidden combos, and create PvZ-themed music tracks. Free in browser."',
  '"description": "Мод Incredibox Plants vs Zombies. Смешивайте мелодии растений с битами зомби, открывайте скрытые комбо и создавайте музыку в стиле PvZ. Бесплатно в браузере."');

// Schema FAQ
t = t.replace('"name":"How do I unlock the cursed plant in Sprunki PvZ?"','"name":"Как разблокировать проклятое растение в Sprunki PvZ?"');
t = t.replace('"text":"The community has confirmed it exists but no consistent unlock method has been found. Players report success with unusual icon combinations, leaving slots empty, and rapid-swapping characters."',
  '"text":"Сообщество подтвердило его существование, но последовательного метода разблокировки не найдено. Игроки сообщают об успехе с необычными комбинациями иконок, оставлением слотов пустыми и быстрой заменой персонажей."');
t = t.replace('"name":"What is the plant-zombie sound split in Sprunki PvZ?"','"name":"Как разделены звуки растений и зомби в Sprunki PvZ?"');
t = t.replace('"text":"Plants play melody — synths, chimes, cheerful keys. Zombies handle rhythm — distorted kicks, growling bass, off-beat percussion. Balance both sides for a complete mix."',
  '"text":"Растения играют мелодию — синтезаторы, перезвоны, весёлые клавиши. Зомби отвечают за ритм — искажённые кики, рычащий бас, нестандартная перкуссия. Балансируйте обе стороны для полного микса."');
t = t.replace('"name":"Which combos trigger hidden animations in Sprunki PvZ?"','"name":"Какие комбо запускают скрытые анимации в Sprunki PvZ?"');
t = t.replace('"text":"Sunflower next to Dancing Zombie fires bonus animations and unlocks new sound layers. Glowing borders and pulsing icons signal a trigger is close."',
  '"text":"Sunflower рядом с Dancing Zombie запускает бонусные анимации и открывает новые звуковые слои. Светящиеся границы и пульсирующие иконки сигнализируют, что триггер близко."');
t = t.replace('"name":"How many characters are in Sprunki PvZ?"','"name":"Сколько персонажей в Sprunki PvZ?"');
t = t.replace('"text":"Over 20 PvZ-themed characters including Peashooter, Sunflower, and Dancing Zombie. Each is a musical instrument with a PvZ skin."',
  '"text":"Более 20 персонажей в стиле PvZ, включая Peashooter, Sunflower и Dancing Zombie. Каждый — музыкальный инструмент в обёртке PvZ."');
t = t.replace('"name":"Does Sprunki PvZ work on mobile?"','"name":"Работает ли Sprunki PvZ на мобильных устройствах?"');
t = t.replace('"text":"Yes, it loads in mobile browsers. Desktop gives the best drag-and-drop experience. Tablet works well with the larger screen."',
  '"text":"Да, загружается в мобильных браузерах. Компьютер даёт лучший опыт перетаскивания. Планшет работает хорошо благодаря большему экрану."');

// Title/meta
t = t.replace('<title>Play Sprunki PvZ Online Free | Plants vs Zombies Music Mod | 2v2.io</title>',
  '<title>Играть в Sprunki PvZ Онлайн Бесплатно | Plants vs Zombies Музыкальный Мод | 2v2.io</title>');
t = t.replace('<meta name="description" content="Play Sprunki PvZ online — the Plants vs Zombies Incredibox mod. Mix plant melodies with zombie beats, unlock hidden combos, and create PvZ-themed tracks. Free in browser.">',
  '<meta name="description" content="Играйте в Sprunki PvZ онлайн — мод Incredibox Plants vs Zombies. Смешивайте мелодии растений с битами зомби, открывайте скрытые комбо и создавайте треки в стиле PvZ. Бесплатно в браузере.">');

// Nav + Breadcrumb
t = t.replace(/>(Home|All Games)</g, (m) => m === '>Home<' ? '>Главная<' : '>Все игры<');

// Preview
t = t.replace('Plants. Zombies. Music.', 'Растения. Зомби. Музыка.');
t = t.replace('>Play Game<', '>Играть<');

// H1 already fine ("Plants vs Zombies" is a proper name)

// Meta
t = t.replace('Published: <strong>November 2024</strong>', 'Опубликовано: <strong>Ноябрь 2024</strong>');
t = t.replace('Last updated: <strong>July 2026</strong>', 'Обновлено: <strong>Июль 2026</strong>');
t = t.replace('By <strong>2v2.io Game Guides</strong>', 'Автор: <strong>2v2.io Game Guides</strong>');

// Tabs
t = t.replace('>About<', '>Об игре<');
t = t.replace('>Key Features<', '>Особенности<');
t = t.replace('>How to Play<', '>Как играть<');
t = t.replace('>Tips<', '>Советы<');
t = t.replace('>Why Players Love It<', '>Почему Игроки Это Любят<');

// Content
t = t.replace('What Is Sprunki PvZ?', 'Что Такое Sprunki PvZ?');
t = t.replace('<strong>Sprunki PvZ</strong> is the only Plants vs Zombies crossover in the Sprunki Incredibox mod universe.',
  '<strong>Sprunki PvZ</strong> — единственный кроссовер Plants vs Zombies во вселенной модов Sprunki Incredibox.');
t = t.replace('Every plant character plays melody — synths, chimes, cheerful keys that bounce and sparkle. Every zombie handles rhythm — distorted kicks, growling subs, snares that hit slightly off-grid. The contrast between the two sides IS the sound. A track with only plants feels too sweet. A track with only zombies is noise. Together they balance into something neither could make alone. Over 20 PvZ-themed characters, hidden combos that trigger bonus animations, and a cursed plant the community is still trying to figure out.',
  'Каждый персонаж-растение играет мелодию — синтезаторы, перезвоны, весёлые клавиши, которые прыгают и сверкают. Каждый зомби отвечает за ритм — искажённые кики, рычащие сабы, снейры, бьющие слегка не в сетку. Контраст между двумя сторонами — ЭТО и есть звук. Трек только с растениями слишком сладкий. Трек только с зомби — это шум. Вместе они балансируются во что-то, что ни одна сторона не могла бы создать в одиночку. Более 20 персонажей в стиле PvZ, скрытые комбо, запускающие бонусные анимации, и проклятое растение, которое сообщество всё ещё пытается разгадать.');
t = t.replace('alt="Sprunki PvZ gameplay with plant and zombie characters"',
  'alt="Геймплей Sprunki PvZ с персонажами растений и зомби"');

t = t.replace('Sprunki PvZ Key Features', 'Ключевые Особенности Sprunki PvZ');
t = t.replace('Plant-zombie sound split', 'Разделение звуков растений и зомби');
t = t.replace('Plants = melody. Zombies = rhythm. Peashooter becomes a synth line, Sunflower layers harmonies, Dancing Zombie adds groove. Every character in <strong>Sprunki PvZ</strong> occupies a distinct frequency role. Balance both sides to build a complete mix.',
  'Растения = мелодия. Зомби = ритм. Peashooter становится синтезаторной линией, Sunflower наслаивает гармонии, Dancing Zombie добавляет грув. Каждый персонаж в <strong>Sprunki PvZ</strong> занимает отдельную частотную роль. Балансируйте обе стороны для создания полного микса.');
t = t.replace('Hidden character combos', 'Скрытые комбинации персонажей');
t = t.replace('Place Sunflower next to Dancing Zombie and bonus animations fire, new sound layers unlock. A cursed plant is hidden in the <strong>Sprunki PvZ</strong> roster — confirmed by the community but no consistent unlock method found yet.',
  'Поместите Sunflower рядом с Dancing Zombie — и запускаются бонусные анимации, открываются новые звуковые слои. Проклятое растение скрыто в составе <strong>Sprunki PvZ</strong> — подтверждено сообществом, но последовательный метод разблокировки пока не найден.');
t = t.replace('20+ PvZ-themed characters', '20+ персонажей в стиле PvZ');
t = t.replace('Peashooter, Sunflower, Dancing Zombie, and over a dozen more — each built as a musical instrument first, a PvZ reference second. Same icon on different <strong>Sprunki PvZ</strong> characters produces different sounds.',
  'Peashooter, Sunflower, Dancing Zombie и ещё более дюжины — каждый создан как музыкальный инструмент в первую очередь, а отсылка к PvZ — во вторую. Одна и та же иконка на разных персонажах <strong>Sprunki PvZ</strong> даёт разные звуки.');
t = t.replace('Drag-and-drop mixing', 'Сведение перетаскиванием');
t = t.replace('Intuitive Incredibox interface with a PvZ skin. Drag characters onto the stage, layer beats and melodies, mute or solo any layer with three icons per character.',
  'Интуитивный интерфейс Incredibox в стиле PvZ. Перетаскивайте персонажей на сцену, наслаивайте биты и мелодии, заглушайте или солируйте любой слой тремя иконками на персонажа.');

t = t.replace('How to Play Sprunki PvZ', 'Как Играть в Sprunki PvZ');
t = t.replace('Start with a zombie beat', 'Начните с зомби-бита');
t = t.replace('Pick Dancing Zombie — zombies handle drums, bass, and rhythm. Let it loop. If it does not groove, swap it. The low end is your foundation in <strong>Sprunki PvZ</strong>.',
  'Выберите Dancing Zombie — зомби отвечают за барабаны, бас и ритм. Дайте ему прозвучать. Если нет грува — замените. Низкие частоты — ваш фундамент в <strong>Sprunki PvZ</strong>.');
t = t.replace('Add a plant melody', 'Добавьте растительную мелодию');
t = t.replace('Try Peashooter for a synth line, then the same icon on Sunflower — it sounds different. Plants bring synths, chimes, and arpeggios to your <strong>Sprunki PvZ</strong> track.',
  'Попробуйте Peashooter для синтезаторной линии, затем ту же иконку на Sunflower — звучит по-другому. Растения приносят синтезаторы, перезвоны и арпеджио в ваш трек <strong>Sprunki PvZ</strong>.');
t = t.replace('Trigger a combo', 'Активируйте комбо');
t = t.replace('Place Sunflower next to Dancing Zombie. Glowing borders and pulsing icons mean a hidden animation is about to fire in <strong>Sprunki PvZ</strong>.',
  'Поместите Sunflower рядом с Dancing Zombie. Светящиеся границы и пульсирующие иконки означают, что скрытая анимация вот-вот запустится в <strong>Sprunki PvZ</strong>.');

t = t.replace('Sprunki PvZ Tips', 'Советы по Sprunki PvZ');
t = t.replace('Build your Sprunki PvZ track from the bottom up', 'Стройте трек Sprunki PvZ снизу вверх');
t = t.replace('Start with one zombie beat, add one plant melody, listen four bars, then add another layer. Stacking too many <strong>Sprunki PvZ</strong> characters at once turns a clean mix muddy.',
  'Начните с одного зомби-бита, добавьте одну растительную мелодию, послушайте четыре такта, затем добавьте ещё слой. Слишком много персонажей <strong>Sprunki PvZ</strong> одновременно превращают чистый микс в грязь.');
t = t.replace('Swap icons between Sprunki PvZ characters', 'Меняйте иконки между персонажами Sprunki PvZ');
t = t.replace('The same chime loop on Peashooter sounds different on Sunflower. Try your favorite icon on every <strong>Sprunki PvZ</strong> character to find hidden combinations.',
  'Один и тот же перезвон на Peashooter звучит иначе на Sunflower. Попробуйте любимую иконку на каждом персонаже <strong>Sprunki PvZ</strong>, чтобы найти скрытые комбинации.');
t = t.replace('Hunt for the cursed Sprunki PvZ plant', 'Охотьтесь за проклятым растением Sprunki PvZ');
t = t.replace('Try unusual icon combos, leave a slot empty, or rapid-swap characters. A reliable unlock method for the <strong>Sprunki PvZ</strong> cursed plant has not been found yet.',
  'Пробуйте необычные комбинации иконок, оставляйте слот пустым или быстро меняйте персонажей. Надёжный метод разблокировки проклятого растения <strong>Sprunki PvZ</strong> пока не найден.');
t = t.replace('Use solo mode in Sprunki PvZ', 'Используйте режим соло в Sprunki PvZ');
t = t.replace('Right-click or long-press any <strong>Sprunki PvZ</strong> character to hear it alone. Solo each clashing melody, identify the problem layer, and swap it.',
  'Щёлкните правой кнопкой или удерживайте любого персонажа <strong>Sprunki PvZ</strong>, чтобы услышать его отдельно. Солируйте каждую конфликтующую мелодию, определите проблемный слой и замените его.');

t = t.replace('Sprunki PvZ FAQ', 'Часто Задаваемые Вопросы о Sprunki PvZ');
t = t.replace('<h3>How do I unlock the cursed plant in Sprunki PvZ?</h3>', '<h3>Как разблокировать проклятое растение в Sprunki PvZ?</h3>');
t = t.replace('<p>The community has confirmed it exists but no consistent method has been found. Players report success with unusual icon combinations, leaving slots empty, and rapid-swapping. Check Discord for the latest discoveries.</p>',
  '<p>Сообщество подтвердило его существование, но последовательного метода не найдено. Игроки сообщают об успехе с необычными комбинациями иконок, оставлением слотов пустыми и быстрой заменой. Проверяйте Discord для последних открытий.</p>');
t = t.replace('<h3>What is the plant-zombie sound split in Sprunki PvZ?</h3>', '<h3>Как разделены звуки растений и зомби в Sprunki PvZ?</h3>');
t = t.replace('<p>Plants play melody — synths, chimes, cheerful keys. Zombies handle rhythm — distorted kicks, growling bass, off-beat percussion. Balance both sides for a complete <strong>Sprunki PvZ</strong> mix.</p>',
  '<p>Растения играют мелодию — синтезаторы, перезвоны, весёлые клавиши. Зомби отвечают за ритм — искажённые кики, рычащий бас, нестандартная перкуссия. Балансируйте обе стороны для полного микса <strong>Sprunki PvZ</strong>.</p>');
t = t.replace('<h3>Which combos trigger hidden animations in Sprunki PvZ?</h3>', '<h3>Какие комбо запускают скрытые анимации в Sprunki PvZ?</h3>');
t = t.replace('<p>Sunflower next to Dancing Zombie is the confirmed classic — bonus animations and new sound layers unlock. Glowing borders and pulsing icons signal a trigger is close.</p>',
  '<p>Sunflower рядом с Dancing Zombie — подтверждённая классика: запускаются бонусные анимации и открываются новые звуковые слои. Светящиеся границы и пульсирующие иконки сигнализируют, что триггер близко.</p>');
t = t.replace('<h3>How many characters are in Sprunki PvZ?</h3>', '<h3>Сколько персонажей в Sprunki PvZ?</h3>');
t = t.replace('<p>Over 20 PvZ-themed characters including Peashooter, Sunflower, and Dancing Zombie. Each <strong>Sprunki PvZ</strong> character is a musical instrument with a PvZ skin.</p>',
  '<p>Более 20 персонажей в стиле PvZ, включая Peashooter, Sunflower и Dancing Zombie. Каждый персонаж <strong>Sprunki PvZ</strong> — музыкальный инструмент в обёртке PvZ.</p>');
t = t.replace('<h3>Does Sprunki PvZ work on mobile?</h3>', '<h3>Работает ли Sprunki PvZ на мобильных устройствах?</h3>');
t = t.replace('<p>Yes, <strong>Sprunki PvZ</strong> loads in mobile browsers. Desktop gives the best drag-and-drop experience. Tablet works well with the larger screen.</p>',
  '<p>Да, <strong>Sprunki PvZ</strong> загружается в мобильных браузерах. Компьютер даёт лучший опыт перетаскивания. Планшет работает хорошо благодаря большему экрану.</p>');

t = t.replace('Why Players Love Sprunki PvZ', 'Почему Игроки Любят Sprunki PvZ');
t = t.replace('<strong>Sprunki PvZ</strong> is the only crossover mod that pulls its entire cast from Plants vs Zombies. The plant-zombie sound contrast is unique — no other Sprunki mod splits its roster into two opposing musical roles. Hidden combos, a cursed plant the community is still hunting, and over 20 characters make every session a different turf war between melody and rhythm.',
  '<strong>Sprunki PvZ</strong> — единственный кроссовер-мод, который берёт весь состав из Plants vs Zombies. Звуковой контраст растений и зомби уникален — ни один другой мод Sprunki не разделяет состав на две противоборствующие музыкальные роли. Скрытые комбо, проклятое растение, за которым всё ещё охотится сообщество, и более 20 персонажей делают каждую сессию новой битвой за территорию между мелодией и ритмом.');

// Related
t = t.replace('Related Sprunki Games', 'Похожие Игры Sprunki');
t = t.replace('>Play Sprunki Phase 4 — Full Horror<', '>Играть в Sprunki Phase 4 — Полный Хоррор<');
t = t.replace('>Play Sprunki Phase 3 — The Turning Point<', '>Играть в Sprunki Phase 3 — Переломный Момент<');
t = t.replace('>Play Sprunki Phase 16 Dashdoshty<', '>Играть в Sprunki Phase 16 Dashdoshty<');
t = t.replace('>Play Sprunki Corruptbox<', '>Играть в Sprunki Corruptbox<');

// Comments
t = t.replace('<h2 class="comments-heading">Comments</h2>', '<h2 class="comments-heading">Комментарии</h2>');
t = t.replace(/Be the first to review/g, 'Будьте первым, кто оставит отзыв');
t = t.replace('placeholder="Your Name"', 'placeholder="Ваше Имя"');
t = t.replace('placeholder="Your Comment"', 'placeholder="Ваш Комментарий"');
t = t.replace('>Post Comment<', '>Опубликовать<');

// Footer
t = t.replace('<p class="footer-about">Play Sprunki games on 2v2.io. Discover fan-made Incredibox mods, PvZ crossovers, and browser-based music adventures.</p>',
  '<p class="footer-about">Играйте в игры Sprunki на 2v2.io. Откройте для себя фанатские моды Incredibox, кроссоверы PvZ и браузерные музыкальные приключения.</p>');
t = t.replace('<h3 class="footer-heading">Contact Us</h3>', '<h3 class="footer-heading">Свяжитесь с Нами</h3>');
t = t.replace('All rights reserved.', 'Все права защищены.');
t = t.replace('>Privacy Policy<', '>Политика конфиденциальности<');
t = t.replace('>Terms of Service<', '>Условия использования<');
t = t.replace('>About Us<', '>О нас<');
t = t.replace('>Contact Us<', '>Свяжитесь с нами<');
t = t.replace('>Copyright Notice<', '>Авторские права<');

t = t.replace('alt="Sprunki PvZ Plants vs Zombies music game"', 'alt="Sprunki PvZ Plants vs Zombies музыкальная игра"');

fs.writeFileSync('c:/Users/Administrator/Desktop/2v2.io/ru/games/sprunki-pvz.html', t, 'utf8');
console.log('Done: ru/games/sprunki-pvz.html');
