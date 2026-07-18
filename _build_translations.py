#!/usr/bin/env python3
"""
Build ES and RU versions from EN game files.
Applies all template translations + path fixes + metadata updates.
Body content translations are read from existing ES/RU files where available,
or translated fresh.
"""
import re, os, sys

BASE = r"c:\Users\Administrator\Desktop\2v2.io"

# ============================================================
# COMMON TRANSLATIONS (applied to all games)
# ============================================================

# (en_pattern, es_replacement, ru_replacement)
COMMON = [
    # --- Path fixes (../ -> ../../) ---
    ('href="../css/', 'href="../../css/', 'href="../../css/'),
    ('src="../css/', 'src="../../css/', 'src="../../css/'),
    ('href="../js/', 'href="../../js/', 'href="../../js/'),
    ('src="../js/', 'src="../../js/', 'src="../../js/'),
    ('href="../assets/', 'href="../../assets/', 'href="../../assets/'),
    ('src="../assets/', 'src="../../assets/', 'src="../../assets/'),
    ('href="../index.html', 'href="../../index.html', 'href="../../index.html'),
    ('href="../games.html', 'href="../../games.html', 'href="../../games.html'),
    ('href="../privacy-policy.html', 'href="../../privacy-policy.html', 'href="../../privacy-policy.html'),
    ('href="../terms-of-service.html', 'href="../../terms-of-service.html', 'href="../../terms-of-service.html'),
    ('href="../about-us.html', 'href="../../about-us.html', 'href="../../about-us.html'),
    ('href="../contact-us.html', 'href="../../contact-us.html', 'href="../../contact-us.html'),
    ('href="../copyright-infringement-notice-procedure.html', 'href="../../copyright-infringement-notice-procedure.html', 'href="../../copyright-infringement-notice-procedure.html'),

    # --- Nav ---
    ('title="Home" href="../../index.html">Home<', 'title="Inicio" href="../../index.html">Inicio<', 'title="Главная" href="../../index.html">Главная<'),
    ('title="All Games" href="../../games.html">All Games<', 'title="Todos los Juegos" href="../../games.html">Todos los Juegos<', 'title="Все Игры" href="../../games.html">Все Игры<'),
    # Mobile nav
    ('href="../../index.html">Home</a>\n            <a class="mobile-nav-link', 'href="../../index.html">Inicio</a>\n            <a class="mobile-nav-link', 'href="../../index.html">Главная</a>\n            <a class="mobile-nav-link'),
    ('mobile-nav-link active" href="../../games.html">All Games<', 'mobile-nav-link active" href="../../games.html">Todos los Juegos<', 'mobile-nav-link active" href="../../games.html">Все Игры<'),

    # --- Breadcrumb ---
    ('breadcrumb-link" title="Home" href="../../index.html">Home<', 'breadcrumb-link" title="Inicio" href="../../index.html">Inicio<', 'breadcrumb-link" title="Главная" href="../../index.html">Главная<'),
    ('breadcrumb-link" title="All Games" href="../../games.html">All Games<', 'breadcrumb-link" title="Todos los Juegos" href="../../games.html">Todos los Juegos<', 'breadcrumb-link" title="Все Игры" href="../../games.html">Все Игры<'),

    # --- Play button ---
    ('>Play Now<', '>Jugar<', '>Играть<'),

    # --- Fullscreen / Share aria-labels ---
    ('aria-label="Fullscreen"', 'aria-label="Pantalla completa"', 'aria-label="Полный экран"'),
    ('aria-label="Share"', 'aria-label="Compartir"', 'aria-label="Поделиться"'),

    # --- Theme toggle ---
    ('aria-label="Toggle Theme"', 'aria-label="Cambiar Tema"', 'aria-label="Сменить Тему"'),

    # --- Hamburger menu ---
    ('aria-label="Toggle menu"', 'aria-label="Alternar menú"', 'aria-label="Меню"'),

    # --- Tabs ---
    ('">About</a>', '">Acerca de</a>', '">Об игре</a>'),
    ('">Key Features</a>', '">Características</a>', '">Возможности</a>'),
    ('">How to Play</a>', '">Cómo Jugar</a>', '">Как играть</a>'),
    ('">Tips</a>', '">Consejos</a>', '">Советы</a>'),
    ('">FAQ</a>', '">FAQ</a>', '">ЧаВо</a>'),
    ('">Why Players Love It</a>', '">Por Qué Gusta</a>', '">Почему игроки это любят</a>'),

    # --- Comments ---
    ('class="comments-heading">Comments<', 'class="comments-heading">Comentarios<', 'class="comments-heading">Комментарии<'),
    ('>Be the first to review<', '>Sé el primero en opinar<', '>Будьте первым<'),
    ('placeholder="Your Name"', 'placeholder="Tu Nombre"', 'placeholder="Ваше Имя"'),
    ('placeholder="Your Comment"', 'placeholder="Tu Comentario"', 'placeholder="Ваш Комментарий"'),
    ('class="comment-submit">Post Comment<', 'class="comment-submit">Publicar Comentario<', 'class="comment-submit">Опубликовать<'),

    # --- Footer ---
    ('class="footer-heading">Contact Us<', 'class="footer-heading">Contáctanos<', 'class="footer-heading">Свяжитесь с Нами<'),
    ('>Privacy Policy<', '>Política de Privacidad<', '>Политика Конфиденциальности<'),
    ('>Terms of Service<', '>Términos del Servicio<', '>Условия Использования<'),
    ('>About Us<', '>Sobre Nosotros<', '>О Нас<'),
    ('>Copyright Notice<', '>Aviso de Derechos de Autor<', '>Авторские Права<'),
    ('>Contact Us<', '>Contáctanos<', '>Свяжитесь с Нами<'),
    ('All rights reserved.', 'Todos los derechos reservados.', 'Все права защищены.'),

    # --- Related Games heading ---
    ('">Related Games</h2>', '">Juegos Relacionados</h2>', '">Похожие Игры</h2>'),

    # --- Footer about text ---
    ('Play free browser games — a community-created Incredibox mod. Drag, drop, layer beats and effects, discover hidden combos, and share your mixes online.',
     'Juega juegos de navegador gratis — un mod de Incredibox creado por la comunidad. Arrastra, suelta, superpón ritmos y efectos, descubre combos ocultos y comparte tus mezclas en línea.',
     'Играйте в бесплатные браузерные игры — созданный сообществом мод Incredibox. Перетаскивайте, накладывайте биты и эффекты, открывайте скрытые комбинации и делитесь своими миксами онлайн.'),
]


def apply_common_transforms(content, lang):
    """Apply all common template translations."""
    idx = 1 if lang == 'es' else 2  # 0=en_pattern, 1=es, 2=ru
    for rule in COMMON:
        content = content.replace(rule[0], rule[idx])
    return content


def fix_paths_in_body(content):
    """Fix game-specific relative paths in body content (../games/ -> just filename for es/ru)."""
    # In ES/RU game pages, related game links should point to same-dir files
    # e.g., href="../games/sprunki-phase-3.html" -> href="sprunki-phase-3.html"
    content = re.sub(r'href="\.\./games/([^"]+)"', r'href="\1"', content)
    return content


def fix_meta_tags(content, game_name, lang, game_file):
    """Update lang, canonical, hreflang, og:locale, lang selector."""
    lang_code = 'es' if lang == 'es' else 'ru'
    lang_full = 'es_ES' if lang == 'es' else 'ru_RU'

    # lang attribute
    content = content.replace('<html lang="en"', f'<html lang="{lang_code}"')

    # canonical
    content = re.sub(
        r'<link rel="canonical" href="https://2v2\.io/games/[^"]+">',
        f'<link rel="canonical" href="https://2v2.io/{lang_code}/games/{game_file}">',
        content
    )

    # hreflang en
    content = re.sub(
        r'<link rel="alternate" hreflang="en" href="https://2v2\.io/games/[^"]+">',
        f'<link rel="alternate" hreflang="en" href="https://2v2.io/games/{game_file}">',
        content
    )
    # hreflang es
    content = re.sub(
        r'<link rel="alternate" hreflang="es" href="https://2v2\.io/es/games/[^"]+">',
        f'<link rel="alternate" hreflang="es" href="https://2v2.io/es/games/{game_file}">',
        content
    )
    # hreflang ru
    content = re.sub(
        r'<link rel="alternate" hreflang="ru" href="https://2v2\.io/ru/games/[^"]+">',
        f'<link rel="alternate" hreflang="ru" href="https://2v2.io/ru/games/{game_file}">',
        content
    )

    # og:url
    content = re.sub(
        r'<meta property="og:url" content="https://2v2\.io/games/[^"]+">',
        f'<meta property="og:url" content="https://2v2.io/{lang_code}/games/{game_file}">',
        content
    )

    # Add og:locale after og:site_name
    og_locale_tag = f'<meta property="og:locale" content="{lang_full}">'
    if '<meta property="og:locale"' not in content:
        content = content.replace(
            '<meta property="og:site_name" content="2v2.io">',
            f'<meta property="og:site_name" content="2v2.io">\n    {og_locale_tag}',
        )

    # inLanguage in schema
    content = content.replace('"inLanguage": ["en"]', f'"inLanguage": ["{lang_code}"]')

    # Schema URLs and IDs
    content = content.replace(
        f'https://2v2.io/games/{game_file}#game',
        f'https://2v2.io/{lang_code}/games/{game_file}#game'
    )
    content = content.replace(
        f'https://2v2.io/games/{game_file}#faq',
        f'https://2v2.io/{lang_code}/games/{game_file}#faq'
    )
    content = re.sub(
        r'"url": "https://2v2\.io/games/[^"]+"',
        f'"url": "https://2v2.io/{lang_code}/games/{game_file}"',
        content
    )

    # Breadcrumb schema
    content = content.replace('"name":"Home","item":"https://2v2.io"',
        '"name":"Inicio","item":"https://2v2.io/es/"' if lang == 'es' else '"name":"Главная","item":"https://2v2.io/ru/"')
    content = content.replace('"name":"All Games","item":"https://2v2.io/games.html"',
        '"name":"Todos los Juegos","item":"https://2v2.io/es/games.html"' if lang == 'es' else '"name":"Все Игры","item":"https://2v2.io/ru/games.html"')

    # Lang switcher - set correct selected
    if lang == 'es':
        content = content.replace('value="en" selected', 'value="en"')
        content = content.replace('value="es">Español', 'value="es" selected>Español')
    elif lang == 'ru':
        content = content.replace('value="en" selected', 'value="en"')
        content = content.replace('value="ru">Русский', 'value="ru" selected>Русский')

    return content


# ============================================================
# GAME-SPECIFIC BODY TRANSLATIONS
# Each game has (en_text, es_text, ru_text) tuples for BODY content
# ============================================================

def get_body_translations(game_file):
    """Return list of (en, es, ru) tuples for body content translations."""
    t = []

    if game_file == 'corruptbox.html':
        t = CORRUPTBOX_BODY
    elif game_file == 'sprunki-pyramixed-2.html':
        t = PYRAMIXED2_BODY
    elif game_file == 'sprunki-pyramixed-phase-3.html':
        t = PYRAMIXED3_BODY
    elif game_file == 'sprunki-swapped-retextured.html':
        t = SWAPPED_BODY
    elif game_file == 'sprunki-girls-with-hair.html':
        t = GIRLS_BODY

    return t


# ============================================================
# CORRUPTBOX BODY TRANSLATIONS
# ============================================================

CORRUPTBOX_BODY = [
    # Meta
    ("<title>Sprunki Corruptbox — Glitch Music Mod | 2v2.io</title>",
     "<title>Sprunki Corruptbox — Mod de Música Glitch | 2v2.io</title>",
     "<title>Sprunki Corruptbox — Глитч-Музыкальный Мод | 2v2.io</title>"),
    ('<meta name="description" content="Play Sprunki Corruptbox online free. Glitch music mod — 24 corrupted sounds, character transformations with three unlock tables, five versions of corrupted audio. No download required.">',
     '<meta name="description" content="Juega Sprunki Corruptbox gratis en línea. Mod de música glitch — 24 sonidos corruptos, transformaciones de personajes con tres tablas de desbloqueo, cinco versiones de audio corrupto. Sin descarga.">',
     '<meta name="description" content="Играйте в Sprunki Corruptbox бесплатно онлайн. Глитч-музыкальный мод — 24 искажённых звука, трансформации персонажей с тремя таблицами разблокировки, пять версий искажённого аудио. Без скачивания.">'),
    ('<meta property="og:title" content="Sprunki Corruptbox — Glitch Music Mod | Play Free Online">',
     '<meta property="og:title" content="Sprunki Corruptbox — Mod de Música Glitch | Juega Gratis en Línea">',
     '<meta property="og:title" content="Sprunki Corruptbox — Глитч-Музыкальный Мод | Играйте Бесплатно Онлайн">'),
    ('<meta property="og:description" content="24 corrupted sounds, character transformations, three unlock tables, five versions. Glitch. Distort. Create. Play free in your browser.">',
     '<meta property="og:description" content="24 sonidos corruptos, transformaciones de personajes, tres tablas de desbloqueo, cinco versiones. Glitch. Distorsiona. Crea. Juega gratis en tu navegador.">',
     '<meta property="og:description" content="24 искажённых звука, трансформации персонажей, три таблицы разблокировки, пять версий. Глитч. Искажай. Создавай. Играйте бесплатно в браузере.">'),
    ('<meta name="twitter:title" content="Sprunki Corruptbox — Glitch Music Mod | Play Free Online">',
     '<meta name="twitter:title" content="Sprunki Corruptbox — Mod de Música Glitch | Juega Gratis en Línea">',
     '<meta name="twitter:title" content="Sprunki Corruptbox — Глитч-Музыкальный Мод | Играйте Бесплатно Онлайн">'),
    ('<meta name="twitter:description" content="24 corrupted sounds, character transformations, three unlock tables, five versions. Play free in your browser.">',
     '<meta name="twitter:description" content="24 sonidos corruptos, transformaciones de personajes, tres tablas de desbloqueo, cinco versiones. Juega gratis en tu navegador.">',
     '<meta name="twitter:description" content="24 искажённых звука, трансформации персонажей, три таблицы разблокировки, пять версий. Играйте бесплатно в браузере.">'),
    # Schema description
    ('"description": "Play free browser games instantly — no download required."',
     '"description": "Juega juegos de navegador gratis al instante — sin descarga."',
     '"description": "Играйте в бесплатные браузерные игры мгновенно — без скачивания."'),
    ('"genre": "Music Creation Game"',
     '"genre": "Juego de Creación Musical"',
     '"genre": "Музыкальная Игра"'),
    # Schema game description
    ('"description": "Glitch music mod — 24 corrupted sounds processed through bit-crushing, sample-rate reduction, granular stutter, and spectral inversion. Character transformations spread across three stages in real time. Three unlock tables gate progressively more corrupted sounds and characters. Five distinct audio processing versions reprocess the entire library through different corruption algorithms."',
     '"description": "Mod de música glitch — 24 sonidos corruptos procesados mediante bit-crushing, reducción de sample rate, stutter granular e inversión espectral. Las transformaciones de personajes se extienden en tres etapas en tiempo real. Tres tablas de desbloqueo controlan sonidos y personajes progresivamente más corruptos. Cinco versiones distintas de procesamiento de audio reprocesan toda la biblioteca mediante diferentes algoritmos de corrupción."',
     '"description": "Глитч-музыкальный мод — 24 искажённых звука, обработанных через бит-крашинг, снижение частоты дискретизации, гранулярный статтер и спектральную инверсию. Трансформации персонажей происходят в три этапа в реальном времени. Три таблицы разблокировки открывают доступ к всё более искажённым звукам и персонажам. Пять различных версий обработки звука перерабатывают всю библиотеку через разные алгоритмы искажения."'),
    # Tagline
    ('<div class="preview-tagline">Glitch. Distort. Create.</div>',
     '<div class="preview-tagline">Glitch. Distorsiona. Crea.</div>',
     '<div class="preview-tagline">Глитч. Искажай. Создавай.</div>'),
    # H1
    ('<h1 class="game-title">Sprunki Corruptbox — Glitch. Distort. Create.</h1>',
     '<h1 class="game-title">Sprunki Corruptbox — Glitch. Distorsiona. Crea.</h1>',
     '<h1 class="game-title">Sprunki Corruptbox — Глитч. Искажай. Создавай.</h1>'),
    # Image alt
    ('alt="Sprunki Corruptbox — glitch music mod with corrupted sounds and character transformations"',
     'alt="Sprunki Corruptbox — mod de música glitch con sonidos corruptos y transformaciones de personajes"',
     'alt="Sprunki Corruptbox — глитч-музыкальный мод с искажёнными звуками и трансформациями персонажей"'),
    ('alt="Sprunki Corruptbox glitch music mod with corrupted character transformations"',
     'alt="Sprunki Corruptbox mod de música glitch con transformaciones de personajes corruptos"',
     'alt="Sprunki Corruptbox глитч-музыкальный мод с искажёнными трансформациями персонажей"'),
]

# Add FAQ translations for corruptbox
CORRUPTBOX_BODY += [
    ('"name":"What are corrupted sounds in Sprunki Corruptbox?"',
     '"name":"¿Qué son los sonidos corruptos en Sprunki Corruptbox?"',
     '"name":"Что такое искажённые звуки в Sprunki Corruptbox?"'),
    ('"text":"24 audio loops processed through glitch and distortion algorithms. Instead of clean samples, each sound is intentionally broken — bit-crushed, sample-rate reduced, granulized, or spectrally inverted. The corruption is the aesthetic, not a bug."',
     '"text":"24 bucles de audio procesados mediante algoritmos de glitch y distorsión. En lugar de samples limpios, cada sonido está intencionalmente roto — bit-crushed, con sample rate reducido, granulizado o espectralmente invertido. La corrupción es la estética, no un error."',
     '"text":"24 аудиопетли, обработанные алгоритмами глитча и искажения. Вместо чистых сэмплов каждый звук намеренно сломан — бит-крашеный, с пониженной частотой дискретизации, гранулирован или спектрально инвертирован. Искажение — это эстетика, а не ошибка."'),
    ('"name":"How does the character transformation mechanic work?"',
     '"name":"¿Cómo funciona la mecánica de transformación de personajes?"',
     '"name":"Как работает механика трансформации персонажей?"'),
    ('"text":"As you activate more corrupted sounds, corruption spreads across characters on stage. Stage 1: static overlays and subtle audio artifacts. Stage 2: visual tearing, color shifts, and heavy audio degradation. Stage 3: full glitch transformation with destroyed animations and near-unrecognizable audio. The transformation is gradual and spreads in real time."',
     '"text":"Al activar más sonidos corruptos, la corrupción se extiende por los personajes en escena. Etapa 1: superposiciones de estática y artefactos de audio sutiles. Etapa 2: desgarro visual, cambios de color y degradación de audio intensa. Etapa 3: transformación glitch completa con animaciones destruidas y audio casi irreconocible. La transformación es gradual y se extiende en tiempo real."',
     '"text":"По мере активации искажённых звуков искажение распространяется на персонажей на сцене. Этап 1: наложения статики и тонкие аудиоартефакты. Этап 2: визуальные разрывы, сдвиги цвета и сильная деградация звука. Этап 3: полная глитч-трансформация с разрушенными анимациями и почти неузнаваемым звуком. Трансформация постепенна и распространяется в реальном времени."'),
    ('"name":"What are the three unlock tables?"',
     '"name":"¿Cuáles son las tres tablas de desbloqueo?"',
     '"name":"Что такое три таблицы разблокировки?"'),
    ('"text":"Table 1 unlocks basic corrupted sounds (8 sounds). Table 2 unlocks advanced glitch effects and transformation stages (8 sounds). Table 3 unlocks secret corrupted characters and hidden audio layers (8 sounds). Each table requires specific corruption milestones — combinations of corrupt sounds that push the glitch engine to certain thresholds."',
     '"text":"La Tabla 1 desbloquea sonidos corruptos básicos (8 sonidos). La Tabla 2 desbloquea efectos glitch avanzados y etapas de transformación (8 sonidos). La Tabla 3 desbloquea personajes corruptos secretos y capas de audio ocultas (8 sonidos). Cada tabla requiere hitos de corrupción específicos — combinaciones de sonidos corruptos que llevan el motor de glitch a ciertos umbrales."',
     '"text":"Таблица 1 открывает базовые искажённые звуки (8 звуков). Таблица 2 открывает продвинутые глитч-эффекты и этапы трансформации (8 звуков). Таблица 3 открывает секретных искажённых персонажей и скрытые аудиослои (8 звуков). Каждая таблица требует определённых этапов искажения — комбинаций искажённых звуков, которые доводят глитч-движок до определённых порогов."'),
    ('"name":"What are the five versions?"',
     '"name":"¿Cuáles son las cinco versiones?"',
     '"name":"Что такое пять версий?"'),
    ('"text":"Five distinct corruption processing modes. V1: mild glitch. V2: bit-crush focus. V3: sample-rate destruction. V4: granular synthesis. V5: full spectral collapse. Each version reprocesses all 24 sounds through a different corruption algorithm, giving you effectively 120 distinct corrupted sounds."',
     '"text":"Cinco modos distintos de procesamiento de corrupción. V1: glitch suave. V2: enfoque bit-crush. V3: destrucción de sample rate. V4: síntesis granular. V5: colapso espectral completo. Cada versión reprocesa los 24 sonidos mediante un algoritmo de corrupción diferente, dándote efectivamente 120 sonidos corruptos distintos."',
     '"text":"Пять различных режимов обработки искажения. V1: лёгкий глитч. V2: фокус на бит-краш. V3: разрушение частоты дискретизации. V4: гранулярный синтез. V5: полный спектральный коллапс. Каждая версия перерабатывает все 24 звука через свой алгоритм искажения, давая вам по сути 120 различных искажённых звуков."'),
    ('"name":"Does Sprunki Corruptbox work on mobile?"',
     '"name":"¿Funciona Sprunki Corruptbox en móviles?"',
     '"name":"Работает ли Sprunki Corruptbox на мобильных устройствах?"'),
    ('"text":"Yes, touch controls on iOS and Android. Desktop with headphones strongly recommended — the glitch textures and bit-crushed details are lost on mobile speakers."',
     '"text":"Sí, controles táctiles en iOS y Android. Se recomienda encarecidamente escritorio con auriculares — las texturas glitch y los detalles bit-crushed se pierden en los altavoces móviles."',
     '"text":"Да, сенсорное управление на iOS и Android. Настоятельно рекомендуется настольный компьютер с наушниками — глитч-текстуры и детали бит-крашинга теряются на мобильных динамиках."'),
    ('"name":"Is Sprunki Corruptbox free to play?"',
     '"name":"¿Es Sprunki Corruptbox gratis para jugar?"',
     '"name":"Бесплатна ли Sprunki Corruptbox?"'),
    ('"text":"Yes. Completely free. No payment, no account, no download."',
     '"text":"Sí. Completamente gratis. Sin pago, sin cuenta, sin descarga."',
     '"text":"Да. Полностью бесплатно. Без оплаты, без аккаунта, без скачивания."'),
    ('"name":"How is Corruptbox different from other Sprunki mods?"',
     '"name":"¿En qué se diferencia Corruptbox de otros mods de Sprunki?"',
     '"name":"Чем Corruptbox отличается от других модов Sprunki?"'),
    ('"text":"Corruptbox embraces destruction as a creative tool. While most mods deliver clean, polished sound libraries, Corruptbox deliberately breaks its audio. The glitch is the point. Bit-crushed beats, granulized melodies, spectrally collapsed vocals — these are not errors, they are instruments."',
     '"text":"Corruptbox abraza la destrucción como herramienta creativa. Mientras la mayoría de los mods ofrecen bibliotecas de sonido limpias y pulidas, Corruptbox rompe deliberadamente su audio. El glitch es el objetivo. Ritmos bit-crushed, melodías granulizadas, voces con colapso espectral — estos no son errores, son instrumentos."',
     '"text":"Corruptbox использует разрушение как творческий инструмент. В то время как большинство модов предлагают чистые, отполированные библиотеки звуков, Corruptbox намеренно ломает своё аудио. Глитч — это цель. Бит-крашеные ритмы, гранулированные мелодии, спектрально коллапсированный вокал — это не ошибки, это инструменты."'),
]

# ============================================================
# PYRAMIXED-2 BODY TRANSLATIONS
# ============================================================

PYRAMIXED2_BODY = [
    ('<title>Sprunki Pyramixed 2 — Pyramid Music Mod | 2v2.io</title>',
     '<title>Sprunki Pyramixed 2 — Mod Musical de Pirámide | 2v2.io</title>',
     '<title>Sprunki Pyramixed 2 — Пирамидальный Музыкальный Мод | 2v2.io</title>'),
    ('<meta name="description" content="Play Sprunki Pyramixed 2 online free. The pyramid opens deeper — 8 new chamber characters, multi-stage Horror Mode, challenge modes (Pyramid Survivor, Horror Rush), expanded OC Maker. No download required.">',
     '<meta name="description" content="Juega Sprunki Pyramixed 2 gratis en línea. La pirámide se abre más profundo — 8 nuevos personajes de cámara, Modo Horror multi-etapa, modos desafío (Pyramid Survivor, Horror Rush), Creador de OC expandido. Sin descarga.">',
     '<meta name="description" content="Играйте в Sprunki Pyramixed 2 бесплатно онлайн. Пирамида открывается глубже — 8 новых персонажей камер, многоэтапный Режим Ужаса, режимы испытаний (Pyramid Survivor, Horror Rush), расширенный Создатель OC. Без скачивания.">'),
    ('<meta property="og:title" content="Sprunki Pyramixed 2 — Pyramid Music Mod | Play Free Online">',
     '<meta property="og:title" content="Sprunki Pyramixed 2 — Mod Musical de Pirámide | Juega Gratis en Línea">',
     '<meta property="og:title" content="Sprunki Pyramixed 2 — Пирамидальный Музыкальный Мод | Играйте Бесплатно Онлайн">'),
    ('<meta property="og:description" content="8 new chamber characters, multi-stage Horror Mode, challenge modes, expanded OC Maker. The pyramid opens deeper. Play free in your browser.">',
     '<meta property="og:description" content="8 nuevos personajes de cámara, Modo Horror multi-etapa, modos desafío, Creador de OC expandido. La pirámide se abre más profundo. Juega gratis en tu navegador.">',
     '<meta property="og:description" content="8 новых персонажей камер, многоэтапный Режим Ужаса, режимы испытаний, расширенный Создатель OC. Пирамида открывается глубже. Играйте бесплатно в браузере.">'),
    ('<meta name="twitter:title" content="Sprunki Pyramixed 2 — Pyramid Music Mod | Play Free Online">',
     '<meta name="twitter:title" content="Sprunki Pyramixed 2 — Mod Musical de Pirámide | Juega Gratis en Línea">',
     '<meta name="twitter:title" content="Sprunki Pyramixed 2 — Пирамидальный Музыкальный Мод | Играйте Бесплатно Онлайн">'),
    ('<meta name="twitter:description" content="8 new chamber characters, multi-stage Horror Mode, challenge modes, expanded OC Maker. Play free in your browser.">',
     '<meta name="twitter:description" content="8 nuevos personajes de cámara, Modo Horror multi-etapa, modos desafío, Creador de OC expandido. Juega gratis en tu navegador.">',
     '<meta name="twitter:description" content="8 новых персонажей камер, многоэтапный Режим Ужаса, режимы испытаний, расширенный Создатель OC. Играйте бесплатно в браузере.">'),
    ('"genre": "Music Creation Game"',
     '"genre": "Juego de Creación Musical"',
     '"genre": "Музыкальная Игра"'),
    ('"description": "Play free browser games instantly — no download required."',
     '"description": "Juega juegos de navegador gratis al instante — sin descarga."',
     '"description": "Играйте в бесплатные браузерные игры мгновенно — без скачивания."'),
    ('<div class="preview-tagline">The pyramid opens deeper.</div>',
     '<div class="preview-tagline">La pirámide se abre más profundo.</div>',
     '<div class="preview-tagline">Пирамида открывается глубже.</div>'),
    ('<h1 class="game-title">Sprunki Pyramixed 2 — Dig Deeper</h1>',
     '<h1 class="game-title">Sprunki Pyramixed 2 — Cava Más Profundo</h1>',
     '<h1 class="game-title">Sprunki Pyramixed 2 — Копай Глубже</h1>'),
    ('alt="Sprunki Pyramixed 2 — pyramid music mod with multi-stage horror"',
     'alt="Sprunki Pyramixed 2 — mod musical de pirámide con horror multi-etapa"',
     'alt="Sprunki Pyramixed 2 — пирамидальный музыкальный мод с многоэтапным ужасом"'),
    ('alt="Sprunki Pyramixed 2 pyramid music mod gameplay"',
     'alt="Sprunki Pyramixed 2 juego del mod musical de pirámide"',
     'alt="Sprunki Pyramixed 2 геймплей пирамидального музыкального мода"'),
]

# ============================================================
# PYRAMIXED-PHASE-3 BODY TRANSLATIONS
# ============================================================

PYRAMIXED3_BODY = [
    ('<title>Sprunki Pyramixed Phase 3 — Rhythm-Horror Pyramid | 2v2.io</title>',
     '<title>Sprunki Pyramixed Phase 3 — Pirámide de Ritmo-Horror | 2v2.io</title>',
     '<title>Sprunki Pyramixed Phase 3 — Пирамида Ритма-Ужаса | 2v2.io</title>'),
    ('<meta name="description" content="Play Sprunki Pyramixed Phase 3 online free. Rhythm-horror pyramid mod — 3-level frequency grid, reactive horror system, 20 corrupted characters. No download required.">',
     '<meta name="description" content="Juega Sprunki Pyramixed Phase 3 gratis en línea. Mod de pirámide ritmo-horror — cuadrícula de frecuencia de 3 niveles, sistema de horror reactivo, 20 personajes corruptos. Sin descarga.">',
     '<meta name="description" content="Играйте в Sprunki Pyramixed Phase 3 бесплатно онлайн. Мод пирамиды ритма-ужаса — 3-уровневая частотная сетка, реактивная система ужаса, 20 искажённых персонажей. Без скачивания.">'),
    ('<meta property="og:title" content="Sprunki Pyramixed Phase 3 — Rhythm-Horror Pyramid | 2v2.io">',
     '<meta property="og:title" content="Sprunki Pyramixed Phase 3 — Pirámide de Ritmo-Horror | 2v2.io">',
     '<meta property="og:title" content="Sprunki Pyramixed Phase 3 — Пирамида Ритма-Ужаса | 2v2.io">'),
    ('<meta property="og:description" content="3-level frequency grid, reactive horror system, 20 corrupted characters. The pyramid mod that merges rhythm creation with horror escalation. Play free in your browser.">',
     '<meta property="og:description" content="Cuadrícula de frecuencia de 3 niveles, sistema de horror reactivo, 20 personajes corruptos. El mod de pirámide que fusiona creación rítmica con escalada de horror. Juega gratis en tu navegador.">',
     '<meta property="og:description" content="3-уровневая частотная сетка, реактивная система ужаса, 20 искажённых персонажей. Мод пирамиды, объединяющий создание ритма с эскалацией ужаса. Играйте бесплатно в браузере.">'),
    ('<meta name="twitter:title" content="Sprunki Pyramixed Phase 3 — Rhythm-Horror Pyramid | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Pyramixed Phase 3 — Pirámide de Ritmo-Horror | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Pyramixed Phase 3 — Пирамида Ритма-Ужаса | 2v2.io">'),
    ('<meta name="twitter:description" content="3-level frequency grid, reactive horror, 20 corrupted characters. Play free in your browser.">',
     '<meta name="twitter:description" content="Cuadrícula de frecuencia de 3 niveles, horror reactivo, 20 personajes corruptos. Juega gratis en tu navegador.">',
     '<meta name="twitter:description" content="3-уровневая частотная сетка, реактивный ужас, 20 искажённых персонажей. Играйте бесплатно в браузере.">'),
    ('"genre": "Music Creation Game"',
     '"genre": "Juego de Creación Musical"',
     '"genre": "Музыкальная Игра"'),
    ('"description": "Play free browser games instantly — no download required."',
     '"description": "Juega juegos de navegador gratis al instante — sin descarga."',
     '"description": "Играйте в бесплатные браузерные игры мгновенно — без скачивания."'),
    ('<h1 class="game-title">Sprunki Pyramixed Phase 3',
     '<h1 class="game-title">Sprunki Pyramixed Phase 3',
     '<h1 class="game-title">Sprunki Pyramixed Phase 3'),
    ('alt="Sprunki Pyramixed Phase 3',
     'alt="Sprunki Pyramixed Phase 3',
     'alt="Sprunki Pyramixed Phase 3'),
]

# ============================================================
# SWAPPED-RETEXTURED BODY TRANSLATIONS
# ============================================================

SWAPPED_BODY = [
    ('<title>Sprunki Swapped Retextured — Character Swap Music Mod | 2v2.io</title>',
     '<title>Sprunki Swapped Retextured — Mod Musical de Intercambio de Personajes | 2v2.io</title>',
     '<title>Sprunki Swapped Retextured — Мод Обмена Персонажами | 2v2.io</title>'),
    ('<meta name="description" content="Play Sprunki Swapped Retextured online free. Character swap music mod — 10 role swaps with redesigned characters, cute + horror dual modes, alternate sound cycling, and morse code easter egg. No download required.">',
     '<meta name="description" content="Juega Sprunki Swapped Retextured gratis en línea. Mod musical de intercambio de personajes — 10 intercambios de roles con personajes rediseñados, modos duales cute + horror, ciclo de sonidos alternativos y huevo de pascua en código morse. Sin descarga.">',
     '<meta name="description" content="Играйте в Sprunki Swapped Retextured бесплатно онлайн. Мод обмена персонажами — 10 обменов ролями с переработанными персонажами, двойные режимы cute + horror, циклирование альтернативных звуков и пасхальное яйцо с азбукой Морзе. Без скачивания.">'),
    ('<meta property="og:title" content="Sprunki Swapped Retextured — Character Swap Music Mod | 2v2.io">',
     '<meta property="og:title" content="Sprunki Swapped Retextured — Mod Musical de Intercambio de Personajes | 2v2.io">',
     '<meta property="og:title" content="Sprunki Swapped Retextured — Мод Обмена Персонажами | 2v2.io">'),
    ('<meta property="og:description" content="10 character role swaps with redesigned characters, cute + horror dual modes, alternate sound cycling, and morse code easter egg. Familiar characters in unfamiliar roles. Play free in your browser.">',
     '<meta property="og:description" content="10 intercambios de roles con personajes rediseñados, modos duales cute + horror, ciclo de sonidos alternativos y huevo de pascua en código morse. Personajes familiares en roles desconocidos. Juega gratis en tu navegador.">',
     '<meta property="og:description" content="10 обменов ролями с переработанными персонажами, двойные режимы cute + horror, циклирование альтернативных звуков и пасхальное яйцо с азбукой Морзе. Знакомые персонажи в незнакомых ролях. Играйте бесплатно в браузере.">'),
    ('<meta name="twitter:title" content="Sprunki Swapped Retextured — Character Swap Music Mod | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Swapped Retextured — Mod Musical de Intercambio de Personajes | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Swapped Retextured — Мод Обмена Персонажами | 2v2.io">'),
    ('<meta name="twitter:description" content="10 character role swaps, cute + horror dual modes, alternate sound cycling, and morse code easter egg. Play free in your browser.">',
     '<meta name="twitter:description" content="10 intercambios de roles, modos duales cute + horror, ciclo de sonidos alternativos y huevo de pascua en código morse. Juega gratis en tu navegador.">',
     '<meta name="twitter:description" content="10 обменов ролями, двойные режимы cute + horror, циклирование альтернативных звуков и пасхальное яйцо с азбукой Морзе. Играйте бесплатно в браузере.">'),
    ('"genre": "Music Creation Game"',
     '"genre": "Juego de Creación Musical"',
     '"genre": "Музыкальная Игра"'),
    ('"description": "Play free browser games instantly — no download required."',
     '"description": "Juega juegos de navegador gratis al instante — sin descarga."',
     '"description": "Играйте в бесплатные браузерные игры мгновенно — без скачивания."'),
    ('alt="Sprunki Swapped Retextured',
     'alt="Sprunki Swapped Retextured',
     'alt="Sprunki Swapped Retextured'),
]

# ============================================================
# GIRLS-WITH-HAIR BODY TRANSLATIONS
# ============================================================

GIRLS_BODY = [
    ('<title>Sprunki Girls with Hair — Stylish Incredibox Mod | 2v2.io</title>',
     '<title>Sprunki Girls with Hair — Mod Estiloso de Incredibox | 2v2.io</title>',
     '<title>Sprunki Girls with Hair — Стильный Мод Incredibox | 2v2.io</title>'),
    ('<meta name="description" content="Play Sprunki Girls with Hair online free. Stylish Incredibox mod — signature hairstyles per character, hair-to-sound matching, hidden combos. No download required.">',
     '<meta name="description" content="Juega Sprunki Girls with Hair gratis en línea. Mod estiloso de Incredibox — peinados distintivos por personaje, combinación peinado-sonido, combos ocultos. Sin descarga.">',
     '<meta name="description" content="Играйте в Sprunki Girls with Hair бесплатно онлайн. Стильный мод Incredibox — уникальные причёски для каждого персонажа, сочетание причёски и звука, скрытые комбо. Без скачивания.">'),
    ('<meta property="og:title" content="Sprunki Girls with Hair — Stylish Incredibox Mod | 2v2.io">',
     '<meta property="og:title" content="Sprunki Girls with Hair — Mod Estiloso de Incredibox | 2v2.io">',
     '<meta property="og:title" content="Sprunki Girls with Hair — Стильный Мод Incredibox | 2v2.io">'),
    ('<meta property="og:description" content="Signature hairstyles per character, hair-to-sound matching, hidden combos. The most visually distinctive Sprunki mod. Play free in your browser.">',
     '<meta property="og:description" content="Peinados distintivos por personaje, combinación peinado-sonido, combos ocultos. El mod Sprunki más distintivo visualmente. Juega gratis en tu navegador.">',
     '<meta property="og:description" content="Уникальные причёски для каждого персонажа, сочетание причёски и звука, скрытые комбо. Самый визуально отличительный мод Sprunki. Играйте бесплатно в браузере.">'),
    ('<meta name="twitter:title" content="Sprunki Girls with Hair — Stylish Incredibox Mod | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Girls with Hair — Mod Estiloso de Incredibox | 2v2.io">',
     '<meta name="twitter:title" content="Sprunki Girls with Hair — Стильный Мод Incredibox | 2v2.io">'),
    ('<meta name="twitter:description" content="Signature hairstyles per character, hair-to-sound matching, hidden combos. Play free in your browser.">',
     '<meta name="twitter:description" content="Peinados distintivos por personaje, combinación peinado-sonido, combos ocultos. Juega gratis en tu navegador.">',
     '<meta name="twitter:description" content="Уникальные причёски для каждого персонажа, сочетание причёски и звука, скрытые комбо. Играйте бесплатно в браузере.">'),
    ('"genre": "Music Creation Game"',
     '"genre": "Juego de Creación Musical"',
     '"genre": "Музыкальная Игра"'),
    ('"description": "Play free browser games instantly — no download required."',
     '"description": "Juega juegos de navegador gratis al instante — sin descarga."',
     '"description": "Играйте в бесплатные браузерные игры мгновенно — без скачивания."'),
    ('alt="Sprunki Girls with Hair',
     'alt="Sprunki Girls with Hair',
     'alt="Sprunki Girls with Hair'),
]


# ============================================================
# MAIN PROCESSING FUNCTION
# ============================================================

def process_game(game_file, lang):
    """Process a single game file for the given language."""
    en_path = os.path.join(BASE, 'games', game_file)
    lang_dir = 'es' if lang == 'es' else 'ru'
    out_path = os.path.join(BASE, lang_dir, 'games', game_file)

    print(f"Processing {game_file} -> {lang}...")

    with open(en_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Apply meta tag fixes (lang, canonical, hreflang, og:locale, lang selector)
    content = fix_meta_tags(content, game_file, lang, game_file)

    # Step 2: Apply common template translations
    content = apply_common_transforms(content, lang)

    # Step 3: Apply game-specific body translations
    body_translations = get_body_translations(game_file)
    idx = 1 if lang == 'es' else 2
    for rule in body_translations:
        if rule[0] in content:
            content = content.replace(rule[0], rule[idx])
        else:
            print(f"  WARNING: Pattern not found in {game_file}: {rule[0][:80]}...")

    # Step 4: Fix game-specific relative paths in body
    content = fix_paths_in_body(content)

    # Write output
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  -> Written: {out_path}")
    return True


# ============================================================
# RUN
# ============================================================

if __name__ == '__main__':
    games = [
        'corruptbox.html',
        'sprunki-pyramixed-2.html',
        'sprunki-pyramixed-phase-3.html',
        'sprunki-swapped-retextured.html',
        'sprunki-girls-with-hair.html',
    ]

    for game in games:
        for lang in ['es', 'ru']:
            process_game(game, lang)

    print("\nDone! All 10 files processed.")
