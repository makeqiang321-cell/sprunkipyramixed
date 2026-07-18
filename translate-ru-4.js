const fs = require('fs');
const src = fs.readFileSync('c:/Users/Administrator/Desktop/2v2.io/games/sprunki-swapped-retextured.html', 'utf8');
let t = src;

// Structural
t = t.replace(/lang="en"/g, 'lang="ru"');
t = t.replace(/https:\/\/2v2\.io\/games\/sprunki-swapped-retextured\.html/g, 'https://2v2.io/ru/games/sprunki-swapped-retextured.html');
t = t.replace('hreflang="en" href="https://2v2.io/ru/games/sprunki-swapped-retextured.html"', 'hreflang="en" href="https://2v2.io/games/sprunki-swapped-retextured.html"');
t = t.replace('hreflang="x-default" href="https://2v2.io/ru/games/sprunki-swapped-retextured.html"', 'hreflang="x-default" href="https://2v2.io/games/sprunki-swapped-retextured.html"');
t = t.replace('hreflang="en" href="https://2v2.io/games/sprunki-swapped-retextured.html">',
  'hreflang="en" href="https://2v2.io/games/sprunki-swapped-retextured.html">\n    <link rel="alternate" hreflang="ru" href="https://2v2.io/ru/games/sprunki-swapped-retextured.html">');
t = t.replace('"og:url" content="https://2v2.io/ru/games/sprunki-swapped-retextured.html">',
  '"og:url" content="https://2v2.io/ru/games/sprunki-swapped-retextured.html">\n    <meta property="og:locale" content="ru">');
t = t.replace('"og:title" content="Sprunki Swapped Retextured — Character Swap Music Mod"',
  '"og:title" content="Sprunki Swapped Retextured — Мод с Заменой Персонажей"');
t = t.replace('"og:description" content="Every character swapped. Every sound retextured. Cute meets horror. Free in browser."',
  '"og:description" content="Каждый персонаж заменён. Каждый звук перетекстурирован. Милота встречает хоррор. Бесплатно в браузере."');
t = t.replace('"twitter:title" content="Sprunki Swapped Retextured — Character Swap Music Mod"',
  '"twitter:title" content="Sprunki Swapped Retextured — Мод с Заменой Персонажей"');
t = t.replace('"twitter:description" content="Every character swapped. Every sound retextured. Cute meets horror."',
  '"twitter:description" content="Каждый персонаж заменён. Каждый звук перетекстурирован. Милота встречает хоррор."');
t = t.replace('"inLanguage": ["en"]', '"inLanguage": ["ru"]');
t = t.replace('"name":"Home","item":"https://2v2.io"', '"name":"Главная","item":"https://2v2.io"');
t = t.replace('"name":"All Games","item":"https://2v2.io/games.html"', '"name":"Все игры","item":"https://2v2.io/games.html"');
t = t.replace('"description": "A fan-made Incredibox mod where every character is swapped into a different role and completely retextured. Same icon on different characters produces different sounds. Cute meets horror."',
  '"description": "Фанатский мод Incredibox, где каждый персонаж заменён на другую роль и полностью перетекстурирован. Одна и та же иконка на разных персонажах даёт разные звуки. Милота встречает хоррор."');

// FAQ Schema
t = t.replace('"name":"Which characters are swapped in Sprunki Swapped Retextured?"','"name":"Какие персонажи заменены в Sprunki Swapped Retextured?"');
t = t.replace('"text":"Oren swaps with Raddy, Clukr swaps with Garnold, Gray becomes Wenda, Vinera becomes OWAKCX, Brud becomes Simon, Sky swaps with Pinki, Durple swaps with Tunner, Jevin swaps with Black, Mr. Sun becomes Mr. Moon, and Mr. Tree becomes Autumn Tree."',
  '"text":"Oren меняется с Raddy, Clukr меняется с Garnold, Gray становится Wenda, Vinera становится OWAKCX, Brud становится Simon, Sky меняется с Pinki, Durple меняется с Tunner, Jevin меняется с Black, Mr. Sun становится Mr. Moon, а Mr. Tree становится Autumn Tree."');
t = t.replace('"name":"Does the swap change the sound or just the look?"','"name":"Замена меняет звук или только внешний вид?"');
t = t.replace('"text":"Both. The same icon placed on different swapped characters produces different sound loops. The swap changes the audio output, not just the visual. Try the same melody on Oren then on Raddy — they sound different."',
  '"text":"И то, и другое. Одна и та же иконка на разных заменённых персонажах даёт разные звуковые петли. Замена меняет звуковой вывод, а не только визуал. Попробуйте одну и ту же мелодию на Oren, а затем на Raddy — они звучат по-разному."');
t = t.replace('"name":"What is the cute and horror dual aesthetic?"','"name":"Что такое двойная эстетика милоты и хоррора?"');
t = t.replace('"text":"Default mode is bright and playful. Certain character combinations trigger a horror overlay — the stage darkens, animations distort, and music shifts to minor-key. Gradual and reversible."',
  '"text":"Режим по умолчанию — яркий и игривый. Определённые комбинации персонажей запускают хоррор-оверлей — сцена темнеет, анимации искажаются, а музыка переходит в минор. Постепенно и обратимо."');
t = t.replace('"name":"What does Mr. Fun Computer\'s morse code say?"','"name":"Что говорит азбука Морзе от Mr. Fun Computer?"');
t = t.replace('"text":"It decodes to RUNAWAYASYOUCAN. The community discovered this within the first month. Nobody knows what it means — theories range from developer inside joke to a hint about a deeper hidden character."',
  '"text":"Расшифровывается как RUNAWAYASYOUCAN. Сообщество обнаружило это в первый же месяц. Никто не знает, что это значит — теории варьируются от внутренней шутки разработчика до намёка на более глубокого скрытого персонажа."');
t = t.replace('"name":"Why does my track change without me doing anything?"','"name":"Почему мой трек меняется без моего участия?"');
t = t.replace('"text":"Some characters auto-cycle their sound every 6 loops. A melody that starts clean might warp on the seventh bar. This is intentional — learn the cycle timing to use it as a creative tool."',
  '"text":"Некоторые персонажи автоматически меняют звук каждые 6 циклов. Мелодия, начинающаяся чисто, может исказиться на седьмом такте. Это сделано намеренно — изучите тайминг цикла, чтобы использовать это как творческий инструмент."');

// Title & meta
t = t.replace(/<title>.*?<\/title>/, '<title>Играть в Sprunki Swapped Retextured Онлайн Бесплатно | Мод Замены Персонажей | 2v2.io</title>');
t = t.replace('<meta name="description" content="Play Sprunki Swapped Retextured online — the fan-made Incredibox mod where every character is swapped, every sound is retextured, and cute meets horror. Free in browser.">',
  '<meta name="description" content="Играйте в Sprunki Swapped Retextured онлайн — фанатский мод Incredibox, где каждый персонаж заменён, каждый звук перетекстурирован, а милота встречает хоррор. Бесплатно в браузере.">');

// Nav + Breadcrumb
t = t.replace(/>(Home|All Games)</g, (m) => m === '>Home<' ? '>Главная<' : '>Все игры<');

// Preview
t = t.replace('Swap. Retexture. Transform.', 'Замена. Перетекстурирование. Трансформация.');
t = t.replace('>Play Game<', '>Играть<');
t = t.replace('Sprunki Swapped Retextured — Swap. Transform.', 'Sprunki Swapped Retextured — Замена. Трансформация.');

// Meta
t = t.replace('Published: <strong>April 2025</strong>', 'Опубликовано: <strong>Апрель 2025</strong>');
t = t.replace('Last updated: <strong>July 2026</strong>', 'Обновлено: <strong>Июль 2026</strong>');
t = t.replace('By <strong>2v2.io Game Guides</strong>', 'Автор: <strong>2v2.io Game Guides</strong>');

// Tabs
t = t.replace(t.match(/>About</)[0], '>Об игре<');
t = t.replace('>Key Features<', '>Особенности<');
t = t.replace('>How to Play<', '>Как играть<');
t = t.replace('>Tips<', '>Советы<');
t = t.replace('>Why Players Love It<', '>Почему Игроки Это Любят<');

// Content
t = t.replace('What Is Sprunki Swapped Retextured?', 'Что Такое Sprunki Swapped Retextured?');
t = t.replace('<strong>Sprunki Swapped Retextured</strong> is the Incredibox mod where every familiar character is in the wrong body',
  '<strong>Sprunki Swapped Retextured</strong> — это мод Incredibox, где каждый знакомый персонаж находится в чужом теле');
t = t.replace('— and every sound that body makes is completely retextured. Oren swapped with Raddy. Clukr traded places with Garnold. Gray became Wenda. Ten character swaps, each one changing both the visual design AND the audio output. Place the same melody icon on Oren, then on Raddy — they sound different because the swap changes how each character processes the same loop. The cute + horror dual aesthetic means the stage can shift from bright and playful to dark and distorted mid-performance. Created by PuffBarIs968 with contributions from WFGoliNagiev.',
  '— и каждый звук, который издаёт это тело, полностью перетекстурирован. Oren заменён на Raddy. Clukr поменялся местами с Garnold. Gray стал Wenda. Десять замен персонажей, каждая меняет И визуальный дизайн, И звуковой вывод. Поместите одну и ту же иконку мелодии на Oren, затем на Raddy — они звучат по-разному, потому что замена меняет то, как каждый персонаж обрабатывает одну и ту же петлю. Двойная эстетика милота + хоррор означает, что сцена может переключаться от яркой и игривой к тёмной и искажённой прямо во время выступления. Создано PuffBarIs968 при участии WFGoliNagiev.');
t = t.replace('alt="Sprunki Swapped Retextured gameplay with swapped characters"',
  'alt="Геймплей Sprunki Swapped Retextured с заменёнными персонажами"');

t = t.replace('Sprunki Swapped Retextured Key Features', 'Ключевые Особенности Sprunki Swapped Retextured');
t = t.replace('Character swap changes the sound', 'Замена персонажа меняет звук');
t = t.replace('The swap in <strong>Sprunki Swapped Retextured</strong> is not cosmetic. Oren plays drums differently than Raddy. Clukr\'s synths sound different from Garnold\'s. Same icon, different character, different output.',
  'Замена в <strong>Sprunki Swapped Retextured</strong> не косметическая. Oren играет на барабанах иначе, чем Raddy. Синтезаторы Clukr звучат иначе, чем у Garnold. Одна иконка, разный персонаж, разный вывод.');
t = t.replace('Complete visual retexture', 'Полное визуальное перетекстурирование');
t = t.replace('Higher-res textures, new color palettes, enhanced facial expressions, smoother animation transitions. Every <strong>Sprunki Swapped Retextured</strong> character has been rebuilt from the ground up.',
  'Текстуры высокого разрешения, новые цветовые палитры, улучшенная мимика, более плавные переходы анимации. Каждый персонаж <strong>Sprunki Swapped Retextured</strong> перестроен с нуля.');
t = t.replace('Cute + horror dual aesthetic', 'Двойная эстетика милота + хоррор');
t = t.replace('Default mode is bright and playful. Certain character combos trigger a horror overlay — the stage darkens, animations distort, and music shifts to minor-key. Gradual and fully reversible.',
  'Режим по умолчанию — яркий и игривый. Определённые комбинации персонажей запускают хоррор-оверлей — сцена темнеет, анимации искажаются, музыка переходит в минор. Постепенно и полностью обратимо.');
t = t.replace('Alternate sound cycling', 'Чередование звуков');
t = t.replace('Some characters in <strong>Sprunki Swapped Retextured</strong> auto-switch their sound every 6 loops. A clean melody might warp on the seventh bar. Learn the cycle timing to use it intentionally.',
  'Некоторые персонажи в <strong>Sprunki Swapped Retextured</strong> автоматически меняют звук каждые 6 циклов. Чистая мелодия может исказиться на седьмом такте. Изучите тайминг цикла, чтобы использовать это намеренно.');
t = t.replace('Morse code easter egg', 'Пасхальное яйцо с азбукой Морзе');
t = t.replace('Mr. Fun Computer broadcasts a morse code message that decodes to <strong>RUNAWAYASYOUCAN</strong>. The community found it within the first month. Nobody knows what it means.',
  'Mr. Fun Computer передаёт сообщение азбукой Морзе, которое расшифровывается как <strong>RUNAWAYASYOUCAN</strong>. Сообщество нашло это в первый месяц. Никто не знает, что это значит.');
t = t.replace('10 character swaps', '10 замен персонажей');

t = t.replace('How to Play Sprunki Swapped Retextured', 'Как Играть в Sprunki Swapped Retextured');
t = t.replace('Learn the swapped roster', 'Изучите заменённый состав');
t = t.replace('Hover over each icon to preview the sound before placing it. Oren is Raddy now. Clukr is Garnold. Gray is Wenda. Build a mental map of the <strong>Sprunki Swapped Retextured</strong> roster first.',
  'Наведите курсор на каждую иконку, чтобы прослушать звук перед размещением. Oren теперь Raddy. Clukr теперь Garnold. Gray теперь Wenda. Сначала постройте ментальную карту состава <strong>Sprunki Swapped Retextured</strong>.');
t = t.replace('Swap mid-performance', 'Меняйте во время выступления');
t = t.replace('Drag a character to a different stage slot while the track plays. The sound transforms in real time. Chain swaps together and the <strong>Sprunki Swapped Retextured</strong> track evolves continuously.',
  'Перетащите персонажа в другой слот сцены, пока трек играет. Звук трансформируется в реальном времени. Объединяйте замены в цепочки, и трек <strong>Sprunki Swapped Retextured</strong> непрерывно эволюционирует.');
t = t.replace('Watch for the horror trigger', 'Следите за хоррор-триггером');
t = t.replace('Certain combos darken the stage and shift music to minor-key. It is gradual and reversible — swap the triggering character out and the light returns.',
  'Определённые комбо затемняют сцену и переводят музыку в минор. Это постепенно и обратимо — замените триггерного персонажа, и свет возвращается.');

t = t.replace('Sprunki Swapped Retextured Tips', 'Советы по Sprunki Swapped Retextured');
t = t.replace('Learn which characters auto-cycle', 'Узнайте, какие персонажи авто-циклируются');
t = t.replace('Swap on the beat', 'Меняйте в такт');
t = t.replace('Try every icon on every character', 'Пробуйте каждую иконку на каждом персонаже');
t = t.replace('Document your swap combos', 'Записывайте свои комбинации замен');

t = t.replace('Sprunki Swapped Retextured FAQ', 'Часто Задаваемые Вопросы о Sprunki Swapped Retextured');
t = t.replace('<h3>Which characters are swapped in Sprunki Swapped Retextured?</h3>', '<h3>Какие персонажи заменены в Sprunki Swapped Retextured?</h3>');
t = t.replace('<p>Oren↔Raddy, Clukr↔Garnold, Gray→Wenda, Vinera→OWAKCX, Brud→Simon, Sky↔Pinki, Durple↔Tunner, Jevin↔Black, Mr. Sun→Mr. Moon, Mr. Tree→Autumn Tree. Ten swaps total.</p>',
  '<p>Oren↔Raddy, Clukr↔Garnold, Gray→Wenda, Vinera→OWAKCX, Brud→Simon, Sky↔Pinki, Durple↔Tunner, Jevin↔Black, Mr. Sun→Mr. Moon, Mr. Tree→Autumn Tree. Всего десять замен.</p>');
t = t.replace('<h3>Does the swap change the sound or just the look in Sprunki Swapped Retextured?</h3>', '<h3>Замена меняет звук или только внешний вид в Sprunki Swapped Retextured?</h3>');
t = t.replace('<p>Both. The same icon placed on different swapped <strong>Sprunki Swapped Retextured</strong> characters produces different audio output. Try a melody on Oren then on Raddy.</p>',
  '<p>И то, и другое. Одна и та же иконка на разных заменённых персонажах <strong>Sprunki Swapped Retextured</strong> даёт разный звуковой вывод. Попробуйте мелодию на Oren, затем на Raddy.</p>');
t = t.replace('<h3>What is the cute + horror aesthetic in Sprunki Swapped Retextured?</h3>', '<h3>Что такое эстетика милота + хоррор в Sprunki Swapped Retextured?</h3>');
t = t.replace('<p>Default is bright. Certain combos trigger a horror overlay — stage darkens, music shifts minor-key. Gradual and reversible by swapping the trigger character out.</p>',
  '<p>По умолчанию ярко. Определённые комбо запускают хоррор-оверлей — сцена темнеет, музыка переходит в минор. Постепенно и обратимо заменой триггерного персонажа.</p>');
t = t.replace('<h3>What does the morse code in Sprunki Swapped Retextured say?</h3>', '<h3>Что говорит азбука Морзе в Sprunki Swapped Retextured?</h3>');
t = t.replace('<p>Mr. Fun Computer broadcasts <strong>RUNAWAYASYOUCAN</strong>. Discovered by the community early on. Meaning unknown — possibly a developer joke or a hint at a deeper secret.</p>',
  '<p>Mr. Fun Computer передаёт <strong>RUNAWAYASYOUCAN</strong>. Обнаружено сообществом на раннем этапе. Значение неизвестно — возможно, шутка разработчика или намёк на более глубокий секрет.</p>');
t = t.replace('<h3>Why does my Sprunki Swapped Retextured track change without input?</h3>', '<h3>Почему мой трек Sprunki Swapped Retextured меняется без участия?</h3>');
t = t.replace('<p>Some characters auto-cycle their sound every 6 loops. A melody warps on the seventh bar. It is intentional — learn the timing to use it creatively.</p>',
  '<p>Некоторые персонажи автоматически меняют звук каждые 6 циклов. Мелодия искажается на седьмом такте. Это сделано намеренно — изучите тайминг, чтобы использовать творчески.</p>');

t = t.replace('Why Players Love Sprunki Swapped Retextured', 'Почему Игроки Любят Sprunki Swapped Retextured');
t = t.replace('<strong>Sprunki Swapped Retextured</strong> is the only mod where the swap changes both the look AND the sound.',
  '<strong>Sprunki Swapped Retextured</strong> — единственный мод, где замена меняет И внешний вид, И звук.');
t = t.replace('Ten character swaps, each producing different audio depending on which swapped character holds the icon. The cute + horror dual aesthetic shifts mid-performance based on your combinations — no other Sprunki mod has real-time visual and audio transformation triggered by the same mechanic. Alternate sound cycling adds unpredictability, and the morse code easter egg is still unsolved.',
  'Десять замен персонажей, каждая даёт разный звук в зависимости от того, какой заменённый персонаж держит иконку. Двойная эстетика милота + хоррор меняется во время выступления на основе ваших комбинаций — ни один другой мод Sprunki не имеет трансформации визуала и звука в реальном времени, запускаемой одним и тем же механизмом. Чередование звуков добавляет непредсказуемости, а пасхальное яйцо с азбукой Морзе всё ещё не разгадано.');

// Related
t = t.replace('Related Sprunki Games', 'Похожие Игры Sprunki');
t = t.replace('>Play Sprunki Phase 4 — Full Horror<', '>Играть в Sprunki Phase 4 — Полный Хоррор<');
t = t.replace('>Play Sprunki Phase 3 — The Turning Point<', '>Играть в Sprunki Phase 3 — Переломный Момент<');
t = t.replace('>Play Sprunki Pyramixed 2 — Dig Deeper<', '>Играть в Sprunki Pyramixed 2 — Копни Глубже<');
t = t.replace('>Play Sprunki Corruptbox<', '>Играть в Sprunki Corruptbox<');

// Comments
t = t.replace('<h2 class="comments-heading">Comments</h2>', '<h2 class="comments-heading">Комментарии</h2>');
t = t.replace(/Be the first to review/g, 'Будьте первым, кто оставит отзыв');
t = t.replace('placeholder="Your Name"', 'placeholder="Ваше Имя"');
t = t.replace('placeholder="Your Comment"', 'placeholder="Ваш Комментарий"');
t = t.replace('>Post Comment<', '>Опубликовать<');

// Footer
t = t.replace(/Play Sprunki games on 2v2\.io\. Discover fan-made Incredibox mods, character swaps, and browser-based music adventures\./,
  'Играйте в игры Sprunki на 2v2.io. Откройте для себя фанатские моды Incredibox, замены персонажей и браузерные музыкальные приключения.');
t = t.replace(/<h3 class="footer-heading">Contact Us<\/h3>/, '<h3 class="footer-heading">Свяжитесь с Нами</h3>');
t = t.replace('All rights reserved.', 'Все права защищены.');
t = t.replace('>Privacy Policy<', '>Политика конфиденциальности<');
t = t.replace('>Terms of Service<', '>Условия использования<');
t = t.replace('>About Us<', '>О нас<');
t = t.replace('>Contact Us<', '>Свяжитесь с нами<');
t = t.replace('>Copyright Notice<', '>Авторские права<');

t = t.replace('alt="Sprunki Swapped Retextured character swap music game"', 'alt="Sprunki Swapped Retextured игра с заменой персонажей"');

fs.writeFileSync('c:/Users/Administrator/Desktop/2v2.io/ru/games/sprunki-swapped-retextured.html', t, 'utf8');
console.log('Done: ru/games/sprunki-swapped-retextured.html');
