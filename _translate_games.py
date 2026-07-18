#!/usr/bin/env python3
"""Generate ES and RU versions from EN game files with full translation."""
import re, os

BASE = r"c:\Users\Administrator\Desktop\2v2.io"

# ============================================================
# TEMPLATE TRANSLATIONS
# ============================================================

ES = {
    # Meta
    "lang": "es",
    "og_locale": '<meta property="og:locale" content="es_ES">',
    # Nav
    "Home": "Inicio",
    "All Games": "Todos los Juegos",
    "Toggle Theme": "Cambiar Tema",
    "Toggle menu": "Alternar menú",
    # Breadcrumb
    "Home_bread": "Inicio",
    # Play
    "Play Now": "Jugar",
    "Fullscreen": "Pantalla completa",
    "Share": "Compartir",
    # Tabs
    "About": "Acerca de",
    "Key Features": "Características",
    "How to Play": "Cómo Jugar",
    "Tips": "Consejos",
    "FAQ": "FAQ",
    "Why Players Love It": "Por Qué Gusta",
    # Comments
    "Comments": "Comentarios",
    "Be the first to review": "Sé el primero en opinar",
    "Your Name": "Tu Nombre",
    "Your Comment": "Tu Comentario",
    "Post Comment": "Publicar Comentario",
    # Footer
    "Contact Us": "Contáctanos",
    "Privacy Policy": "Política de Privacidad",
    "Terms of Service": "Términos del Servicio",
    "About Us": "Sobre Nosotros",
    "Copyright Notice": "Aviso de Derechos de Autor",
    "All rights reserved.": "Todos los derechos reservados.",
    "Play free browser games": "Juega juegos de navegador gratis",
    "Related Games": "Juegos Relacionados",
    # Lang selector
    'value="en" selected': 'value="en"',
    'value="es"': 'value="es" selected',
}

RU = {
    # Meta
    "lang": "ru",
    "og_locale": '<meta property="og:locale" content="ru_RU">',
    # Nav
    "Home": "Главная",
    "All Games": "Все Игры",
    "Toggle Theme": "Сменить Тему",
    "Toggle menu": "Меню",
    # Breadcrumb
    "Home_bread": "Главная",
    # Play
    "Play Now": "Играть",
    "Fullscreen": "Полный экран",
    "Share": "Поделиться",
    # Tabs
    "About": "Об игре",
    "Key Features": "Возможности",
    "How to Play": "Как играть",
    "Tips": "Советы",
    "FAQ": "ЧаВо",
    "Why Players Love It": "Почему игроки это любят",
    # Comments
    "Comments": "Комментарии",
    "Be the first to review": "Будьте первым",
    "Your Name": "Ваше Имя",
    "Your Comment": "Ваш Комментарий",
    "Post Comment": "Опубликовать",
    # Footer
    "Contact Us": "Свяжитесь с Нами",
    "Privacy Policy": "Политика Конфиденциальности",
    "Terms of Service": "Условия Использования",
    "About Us": "О Нас",
    "Copyright Notice": "Авторские Права",
    "All rights reserved.": "Все права защищены.",
    "Play free browser games": "Играйте в бесплатные браузерные игры",
    "Related Games": "Похожие Игры",
    # Lang selector
    'value="en" selected': 'value="en"',
    'value="ru"': 'value="ru" selected',
}

# ============================================================
# GAME-SPECIFIC TRANSLATIONS
# ============================================================

# Each game has its own meta + body translations
# Format: { 'en_game_file': { 'es': { ... }, 'ru': { ... } } }

GAMES = {}

# --- CORRUPTBOX ---
GAMES['corruptbox.html'] = {
    'es': {
        'title': 'Sprunki Corruptbox — Mod de Música Glitch | 2v2.io',
        'desc': 'Juega Sprunki Corruptbox gratis en línea. Mod de música glitch — 24 sonidos corruptos, transformaciones de personajes con tres tablas de desbloqueo, cinco versiones de audio corrupto. Sin descarga.',
        'og_title': 'Sprunki Corruptbox — Mod de Música Glitch | Juega Gratis en Línea',
        'og_desc': '24 sonidos corruptos, transformaciones de personajes, tres tablas de desbloqueo, cinco versiones. Glitch. Distorsiona. Crea. Juega gratis en tu navegador.',
        'tw_title': 'Sprunki Corruptbox — Mod de Música Glitch | Juega Gratis en Línea',
        'tw_desc': '24 sonidos corruptos, transformaciones de personajes, tres tablas de desbloqueo, cinco versiones. Juega gratis en tu navegador.',
        'schema_desc_website': 'Juega juegos de navegador gratis al instante — sin descarga.',
        'schema_desc_game': 'Mod de música glitch — 24 sonidos corruptos procesados mediante bit-crushing, reducción de sample rate, stutter granular e inversión espectral. Las transformaciones de personajes se extienden en tres etapas en tiempo real. Tres tablas de desbloqueo controlan sonidos y personajes progresivamente más corruptos. Cinco versiones distintas de procesamiento de audio reprocesan toda la biblioteca mediante diferentes algoritmos de corrupción.',
        'schema_genre': 'Juego de Creación Musical',
        'faq_q1': '¿Qué son los sonidos corruptos en Sprunki Corruptbox?',
        'faq_a1': '24 bucles de audio procesados mediante algoritmos de glitch y distorsión. En lugar de samples limpios, cada sonido está intencionalmente roto — bit-crushed, con sample rate reducido, granulizado o espectralmente invertido. La corrupción es la estética, no un error.',
        'faq_q2': '¿Cómo funciona la mecánica de transformación de personajes?',
        'faq_a2': 'Al activar más sonidos corruptos, la corrupción se extiende por los personajes en escena. Etapa 1: superposiciones de estática y artefactos de audio sutiles. Etapa 2: desgarro visual, cambios de color y degradación de audio intensa. Etapa 3: transformación glitch completa con animaciones destruidas y audio casi irreconocible. La transformación es gradual y se extiende en tiempo real.',
        'faq_q3': '¿Cuáles son las tres tablas de desbloqueo?',
        'faq_a3': 'La Tabla 1 desbloquea sonidos corruptos básicos (8 sonidos). La Tabla 2 desbloquea efectos glitch avanzados y etapas de transformación (8 sonidos). La Tabla 3 desbloquea personajes corruptos secretos y capas de audio ocultas (8 sonidos). Cada tabla requiere hitos de corrupción específicos — combinaciones de sonidos corruptos que llevan el motor de glitch a ciertos umbrales.',
        'faq_q4': '¿Cuáles son las cinco versiones?',
        'faq_a4': 'Cinco modos distintos de procesamiento de corrupción. V1: glitch suave. V2: enfoque bit-crush. V3: destrucción de sample rate. V4: síntesis granular. V5: colapso espectral completo. Cada versión reprocesa los 24 sonidos mediante un algoritmo de corrupción diferente, dándote efectivamente 120 sonidos corruptos distintos.',
        'faq_q5': '¿Funciona Sprunki Corruptbox en móviles?',
        'faq_a5': 'Sí, controles táctiles en iOS y Android. Se recomienda encarecidamente escritorio con auriculares — las texturas glitch y los detalles bit-crushed se pierden en los altavoces móviles.',
        'faq_q6': '¿Es Sprunki Corruptbox gratis para jugar?',
        'faq_a6': 'Sí. Completamente gratis. Sin pago, sin cuenta, sin descarga.',
        'faq_q7': '¿En qué se diferencia Corruptbox de otros mods de Sprunki?',
        'faq_a7': 'Corruptbox abraza la destrucción como herramienta creativa. Mientras la mayoría de los mods ofrecen bibliotecas de sonido limpias y pulidas, Corruptbox rompe deliberadamente su audio. El glitch es el objetivo. Ritmos bit-crushed, melodías granulizadas, voces con colapso espectral — estos no son errores, son instrumentos.',
        'footer_about': 'Juega juegos de navegador gratis — un mod de Incredibox creado por la comunidad. Arrastra, suelta, superpón ritmos y efectos, descubre combos ocultos y comparte tus mezclas en línea.',
        'footer_contact_heading': 'Contáctanos',
    },
    'ru': {
        'title': 'Sprunki Corruptbox — Глитч-Музыкальный Мод | 2v2.io',
        'desc': 'Играйте в Sprunki Corruptbox бесплатно онлайн. Глитч-музыкальный мод — 24 искажённых звука, трансформации персонажей с тремя таблицами разблокировки, пять версий искажённого аудио. Без скачивания.',
        'og_title': 'Sprunki Corruptbox — Глитч-Музыкальный Мод | Играйте Бесплатно Онлайн',
        'og_desc': '24 искажённых звука, трансформации персонажей, три таблицы разблокировки, пять версий. Глитч. Искажай. Создавай. Играйте бесплатно в браузере.',
        'tw_title': 'Sprunki Corruptbox — Глитч-Музыкальный Мод | Играйте Бесплатно Онлайн',
        'tw_desc': '24 искажённых звука, трансформации персонажей, три таблицы разблокировки, пять версий. Играйте бесплатно в браузере.',
        'schema_desc_website': 'Играйте в бесплатные браузерные игры мгновенно — без скачивания.',
        'schema_desc_game': 'Глитч-музыкальный мод — 24 искажённых звука, обработанных через бит-крашинг, снижение частоты дискретизации, гранулярный статтер и спектральную инверсию. Трансформации персонажей происходят в три этапа в реальном времени. Три таблицы разблокировки открывают доступ к всё более искажённым звукам и персонажам. Пять различных версий обработки звука перерабатывают всю библиотеку через разные алгоритмы искажения.',
        'schema_genre': 'Музыкальная Игра',
        'faq_q1': 'Что такое искажённые звуки в Sprunki Corruptbox?',
        'faq_a1': '24 аудиопетли, намеренно сломанные через бит-крашинг, снижение частоты дискретизации, гранулярный синтез и спектральную инверсию. Искажение — это эстетика, а не ошибка.',
        'faq_q2': 'Как работает механика трансформации персонажей?',
        'faq_a2': 'По мере активации искажённых звуков, искажение распространяется на персонажей на сцене. Этап 1: наложения статики и тонкие аудиоартефакты. Этап 2: визуальные разрывы, сдвиги цвета и сильная деградация звука. Этап 3: полная глитч-трансформация с разрушенными анимациями и почти неузнаваемым звуком. Трансформация постепенна и распространяется в реальном времени.',
        'faq_q3': 'Что такое три таблицы разблокировки?',
        'faq_a3': 'Таблица 1 открывает базовые искажённые звуки (8 звуков). Таблица 2 открывает продвинутые глитч-эффекты и этапы трансформации (8 звуков). Таблица 3 открывает секретных искажённых персонажей и скрытые аудиослои (8 звуков). Каждая таблица требует определённых этапов искажения.',
        'faq_q4': 'Что такое пять версий?',
        'faq_a4': 'Пять различных режимов обработки искажения. V1: лёгкий глитч. V2: фокус на бит-краш. V3: разрушение частоты дискретизации. V4: гранулярный синтез. V5: полный спектральный коллапс. Каждая версия перерабатывает все 24 звука через свой алгоритм.',
        'faq_q5': 'Работает ли Sprunki Corruptbox на мобильных устройствах?',
        'faq_a5': 'Да, сенсорное управление на iOS и Android. Настоятельно рекомендуется использовать настольный компьютер с наушниками — глитч-текстуры и детали бит-крашинга теряются на мобильных динамиках.',
        'faq_q6': 'Бесплатна ли Sprunki Corruptbox?',
        'faq_a6': 'Да. Полностью бесплатно. Без оплаты, без аккаунта, без скачивания.',
        'faq_q7': 'Чем Corruptbox отличается от других модов Sprunki?',
        'faq_a7': 'Corruptbox использует разрушение как творческий инструмент. В то время как большинство модов предлагают чистые, отполированные библиотеки звуков, Corruptbox намеренно ломает своё аудио. Глитч — это цель.',
        'footer_about': 'Играйте в бесплатные браузерные игры — созданный сообществом мод Incredibox. Перетаскивайте, накладывайте биты и эффекты, открывайте скрытые комбинации и делитесь своими миксами онлайн.',
        'footer_contact_heading': 'Свяжитесь с Нами',
    }
}

print("Template translations loaded.")
print(f"Games configured: {list(GAMES.keys())}")
