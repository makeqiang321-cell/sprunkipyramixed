#!/usr/bin/env python3
"""
Patch body content translations into the already-generated ES/RU files.
Reads each ES/RU file, finds English body text, replaces with translations.
"""
import re, os

BASE = r"c:\Users\Administrator\Desktop\2v2.io"

# ============================================================
# CORRUPTBOX BODY TRANSLATIONS
# ============================================================

CORRUPTBOX_BODY = [
    # About heading
    ('<h2 id="about">What Is Sprunki Corruptbox?</h2>',
     '<h2 id="about">¿Qué es Sprunki Corruptbox?</h2>',
     '<h2 id="about">Что такое Sprunki Corruptbox?</h2>'),
    # About paragraph
    ('<p><strong>Sprunki Corruptbox</strong> is the glitch music mod where corruption is the instrument. It features 24 deliberately broken sounds',
     '<p><strong>Sprunki Corruptbox</strong> es el mod de música glitch donde la corrupción es el instrumento. Cuenta con 24 sonidos deliberadamente rotos',
     '<p><strong>Sprunki Corruptbox</strong> — это глитч-музыкальный мод, где искажение является инструментом. В нём 24 намеренно сломанных звука'),

    # Features heading
    ('<h2 id="features">Sprunki Corruptbox Key Features</h2>',
     '<h2 id="features">Características de Sprunki Corruptbox</h2>',
     '<h2 id="features">Возможности Sprunki Corruptbox</h2>'),

    # Feature 1: 24 Corrupted Sounds
    ('<h3 style="margin:0 0 8px;">24 Corrupted Sounds</h3><p style="margin:0;color:var(--color-muted-fg);">24 glitch-processed sound loops across all categories. Each corruption type produces a distinct audio artifact',
     '<h3 style="margin:0 0 8px;">24 Sonidos Corruptos</h3><p style="margin:0;color:var(--color-muted-fg);">24 bucles de sonido procesados con glitch en todas las categorías. Cada tipo de corrupción produce un artefacto de audio distinto',
     '<h3 style="margin:0 0 8px;">24 Искажённых Звука</h3><p style="margin:0;color:var(--color-muted-fg);">24 обработанных глитчем звуковых петли во всех категориях. Каждый тип искажения производит уникальный аудиоартефакт'),

    # Feature 2
    ('<h3 style="margin:0 0 8px;">Character Transformations</h3><p style="margin:0;color:var(--color-muted-fg);">Characters visually and sonically transform as corruption spreads. Stage 1: slight static overlays. Stage 2: visual tearing and audio degradation. Stage 3: full corruption with glitched animations and destroyed audio. Transformation spreads across the stage in real time.</p>',
     '<h3 style="margin:0 0 8px;">Transformaciones de Personajes</h3><p style="margin:0;color:var(--color-muted-fg);">Los personajes se transforman visual y sonoramente a medida que la corrupción se extiende. Etapa 1: ligeras superposiciones de estática. Etapa 2: desgarro visual y degradación de audio. Etapa 3: corrupción total con animaciones glitched y audio destruido. La transformación se extiende por el escenario en tiempo real.</p>',
     '<h3 style="margin:0 0 8px;">Трансформации Персонажей</h3><p style="margin:0;color:var(--color-muted-fg);">Персонажи визуально и звуково трансформируются по мере распространения искажения. Этап 1: лёгкие наложения статики. Этап 2: визуальные разрывы и деградация звука. Этап 3: полное искажение с глитч-анимациями и разрушенным звуком. Трансформация распространяется по сцене в реальном времени.</p>'),

    # Feature 3
    ('<h3 style="margin:0 0 8px;">Three Unlock Tables</h3><p style="margin:0;color:var(--color-muted-fg);">Progress through three unlock tables by achieving specific corruption milestones. Table 1: basic corrupted sounds. Table 2: advanced glitch effects and transformation stages. Table 3: secret corrupted characters and hidden audio layers. Each table requires increasingly complex corruption combinations.</p>',
     '<h3 style="margin:0 0 8px;">Tres Tablas de Desbloqueo</h3><p style="margin:0;color:var(--color-muted-fg);">Avanza a través de tres tablas de desbloqueo alcanzando hitos de corrupción específicos. Tabla 1: sonidos corruptos básicos. Tabla 2: efectos glitch avanzados y etapas de transformación. Tabla 3: personajes corruptos secretos y capas de audio ocultas. Cada tabla requiere combinaciones de corrupción cada vez más complejas.</p>',
     '<h3 style="margin:0 0 8px;">Три Таблицы Разблокировки</h3><p style="margin:0;color:var(--color-muted-fg);">Продвигайтесь через три таблицы разблокировки, достигая определённых этапов искажения. Таблица 1: базовые искажённые звуки. Таблица 2: продвинутые глитч-эффекты и этапы трансформации. Таблица 3: секретные искажённые персонажи и скрытые аудиослои. Каждая таблица требует всё более сложных комбинаций искажения.</p>'),

    # Feature 4
    ('<h3 style="margin:0 0 8px;">Five Versions</h3><p style="margin:0;color:var(--color-muted-fg);">Five distinct versions of corrupted audio processing. Version 1: mild glitch. Version 2: bit-crush focus. Version 3: sample-rate destruction. Version 4: granular synthesis corruption. Version 5: full spectral collapse. Each version applies unique processing to every sound in the library.</p>',
     '<h3 style="margin:0 0 8px;">Cinco Versiones</h3><p style="margin:0;color:var(--color-muted-fg);">Cinco versiones distintas de procesamiento de audio corrupto. Versión 1: glitch suave. Versión 2: enfoque bit-crush. Versión 3: destrucción de sample rate. Versión 4: corrupción por síntesis granular. Versión 5: colapso espectral completo. Cada versión aplica un procesamiento único a cada sonido de la biblioteca.</p>',
     '<h3 style="margin:0 0 8px;">Пять Версий</h3><p style="margin:0;color:var(--color-muted-fg);">Пять различных версий обработки искажённого аудио. Версия 1: лёгкий глитч. Версия 2: фокус на бит-краш. Версия 3: разрушение частоты дискретизации. Версия 4: гранулярный синтез. Версия 5: полный спектральный коллапс. Каждая версия применяет уникальную обработку к каждому звуку в библиотеке.</p>'),

    # How to Play heading
    ('<h2 id="how-to-play">How to Play Sprunki Corruptbox</h2>',
     '<h2 id="how-to-play">Cómo Jugar Sprunki Corruptbox</h2>',
     '<h2 id="how-to-play">Как Играть в Sprunki Corruptbox</h2>'),

    # HTP Step 1
    ('<h3 style="margin:8px 0;">Start with clean sounds</h3><p style="margin:0;color:var(--color-muted-fg);">Begin with the least corrupted sounds available. Drag beats and bass onto the stage first. Clean foundations make the later corruption contrasts more dramatic. A bit-crushed snare over a clean kick hits harder than everything destroyed at once.</p>',
     '<h3 style="margin:8px 0;">Empieza con sonidos limpios</h3><p style="margin:0;color:var(--color-muted-fg);">Comienza con los sonidos menos corruptos disponibles. Arrastra ritmos y bajo al escenario primero. Las bases limpias hacen que los contrastes de corrupción posteriores sean más dramáticos. Un snare bit-crushed sobre un kick limpio golpea más fuerte que todo destruido a la vez.</p>',
     '<h3 style="margin:8px 0;">Начните с чистых звуков</h3><p style="margin:0;color:var(--color-muted-fg);">Начните с наименее искажённых доступных звуков. Сначала перетащите на сцену ритмы и бас. Чистый фундамент делает последующие контрасты искажения более драматичными. Bit-crushed снейр поверх чистого кика бьёт сильнее, чем всё разрушенное одновременно.</p>'),

    # HTP Step 2
    ('<h3 style="margin:8px 0;">Introduce corruption gradually</h3><p style="margin:0;color:var(--color-muted-fg);">Add corrupted sounds one at a time and watch the transformation spread across characters. Stage 1 static overlays appear with a few corrupt elements. Push further for visual tearing in Stage 2. Full corruption in Stage 3 requires multiple heavily corrupted sounds active simultaneously.</p>',
     '<h3 style="margin:8px 0;">Introduce la corrupción gradualmente</h3><p style="margin:0;color:var(--color-muted-fg);">Añade sonidos corruptos uno a uno y observa cómo la transformación se extiende por los personajes. Las superposiciones de estática de la Etapa 1 aparecen con unos pocos elementos corruptos. Avanza más para el desgarro visual en la Etapa 2. La corrupción total en la Etapa 3 requiere múltiples sonidos muy corruptos activos simultáneamente.</p>',
     '<h3 style="margin:8px 0;">Вводите искажение постепенно</h3><p style="margin:0;color:var(--color-muted-fg);">Добавляйте искажённые звуки по одному и наблюдайте, как трансформация распространяется по персонажам. Наложения статики Этапа 1 появляются с несколькими искажёнными элементами. Продолжайте для визуальных разрывов на Этапе 2. Полное искажение на Этапе 3 требует одновременной активации нескольких сильно искажённых звуков.</p>'),

    # HTP Step 3
    ('<h3 style="margin:8px 0;">Manage transformation stages</h3><p style="margin:0;color:var(--color-muted-fg);">Toggle corrupted sounds on and off to move between transformation stages. Use clean sounds for verses and introduce corruption for drops. The real-time visual and sonic shift creates dramatic sectional contrast that static sound libraries cannot produce.</p>',
     '<h3 style="margin:8px 0;">Gestiona las etapas de transformación</h3><p style="margin:0;color:var(--color-muted-fg);">Activa y desactiva sonidos corruptos para moverte entre las etapas de transformación. Usa sonidos limpios para las estrofas e introduce corrupción para los drops. El cambio visual y sonoro en tiempo real crea un contraste seccional dramático que las bibliotecas de sonido estáticas no pueden producir.</p>',
     '<h3 style="margin:8px 0;">Управляйте этапами трансформации</h3><p style="margin:0;color:var(--color-muted-fg);">Включайте и выключайте искажённые звуки для перемещения между этапами трансформации. Используйте чистые звуки для куплетов и вводите искажение для дропов. Визуальный и звуковой сдвиг в реальном времени создаёт драматический секционный контраст, который статические библиотеки звуков не могут воспроизвести.</p>'),

    # HTP Step 4
    ('<h3 style="margin:8px 0;">Unlock tables through milestones</h3><p style="margin:0;color:var(--color-muted-fg);">Specific combinations of corrupted sounds push the glitch engine past unlock thresholds. Table 1 unlocks with any 4 corrupted sounds active. Table 2 requires advanced corruption combos. Table 3 demands full spectral collapse',
     '<h3 style="margin:8px 0;">Desbloquea tablas mediante hitos</h3><p style="margin:0;color:var(--color-muted-fg);">Combinaciones específicas de sonidos corruptos empujan el motor de glitch más allá de los umbrales de desbloqueo. La Tabla 1 se desbloquea con 4 sonidos corruptos activos. La Tabla 2 requiere combos de corrupción avanzados. La Tabla 3 exige el colapso espectral completo',
     '<h3 style="margin:8px 0;">Разблокируйте таблицы через этапы</h3><p style="margin:0;color:var(--color-muted-fg);">Определённые комбинации искажённых звуков толкают глитч-движок за пороги разблокировки. Таблица 1 открывается при 4 активных искажённых звуках. Таблица 2 требует продвинутых комбо искажения. Таблица 3 требует полного спектрального коллапса'),

    # Tips heading
    ('<h2 id="tips">Sprunki Corruptbox Tips</h2>',
     '<h2 id="tips">Consejos para Sprunki Corruptbox</h2>',
     '<h2 id="tips">Советы по Sprunki Corruptbox</h2>'),

    # Tip 1
    ('<h3 style="margin:0 0 8px;">Headphones are non-negotiable</h3><p style="margin:0;color:var(--color-muted-fg);">The glitch textures, bit-crushed transients, and granulized artifacts in <strong>Sprunki Corruptbox</strong> contain high-frequency detail that phone and laptop speakers simply cannot reproduce. Closed-back over-ear headphones reveal the full spectrum of deliberate destruction',
     '<h3 style="margin:0 0 8px;">Los auriculares son imprescindibles</h3><p style="margin:0;color:var(--color-muted-fg);">Las texturas glitch, los transitorios bit-crushed y los artefactos granulizados en <strong>Sprunki Corruptbox</strong> contienen detalles de alta frecuencia que los altavoces de teléfono y portátil simplemente no pueden reproducir. Los auriculares supraaurales cerrados revelan el espectro completo de la destrucción deliberada',
     '<h3 style="margin:0 0 8px;">Наушники обязательны</h3><p style="margin:0;color:var(--color-muted-fg);">Глитч-текстуры, bit-crushed транзиенты и гранулированные артефакты в <strong>Sprunki Corruptbox</strong> содержат высокочастотные детали, которые динамики телефонов и ноутбуков просто не могут воспроизвести. Закрытые полноразмерные наушники раскрывают полный спектр намеренного разрушения'),

    # Tip 2
    ('<h3 style="margin:0 0 8px;">Corruption is a creative tool, not a penalty</h3><p style="margin:0;color:var(--color-muted-fg);">Do not avoid corruption',
     '<h3 style="margin:0 0 8px;">La corrupción es una herramienta creativa, no un castigo</h3><p style="margin:0;color:var(--color-muted-fg);">No evites la corrupción',
     '<h3 style="margin:0 0 8px;">Искажение — творческий инструмент, а не наказание</h3><p style="margin:0;color:var(--color-muted-fg);">Не избегайте искажения'),

    # Tip 3
    ('<h3 style="margin:0 0 8px;">Switch versions mid-session</h3><p style="margin:0;color:var(--color-muted-fg);">Each of the five versions reprocesses every sound differently. What sounds like muffled noise in V1 might become rhythmic texture in V3. Cycle through versions while your mix is playing to find the corruption algorithm that best serves each section. A verse might work in V2 bit-crush while the drop demands V5 spectral collapse.</p>',
     '<h3 style="margin:0 0 8px;">Cambia de versión durante la sesión</h3><p style="margin:0;color:var(--color-muted-fg);">Cada una de las cinco versiones reprocesa cada sonido de manera diferente. Lo que suena como ruido apagado en V1 puede convertirse en textura rítmica en V3. Cicla entre versiones mientras tu mezcla está sonando para encontrar el algoritmo de corrupción que mejor sirva a cada sección. Una estrofa puede funcionar en V2 bit-crush mientras el drop exige V5 colapso espectral.</p>',
     '<h3 style="margin:0 0 8px;">Переключайте версии во время сессии</h3><p style="margin:0;color:var(--color-muted-fg);">Каждая из пяти версий перерабатывает каждый звук по-разному. То, что звучит как приглушённый шум в V1, может стать ритмической текстурой в V3. Переключайтесь между версиями во время воспроизведения микса, чтобы найти алгоритм искажения, который лучше всего подходит для каждой секции. Куплет может работать в V2 bit-crush, в то время как дроп требует V5 спектрального коллапса.</p>'),

    # Tip 4
    ('<h3 style="margin:0 0 8px;">Plan your unlock table path</h3><p style="margin:0;color:var(--color-muted-fg);">Table 3\'s secret corrupted characters are the most sonically extreme in <strong>Sprunki Corruptbox</strong>. To reach them, you need specific corruption combinations that push the glitch engine to its limit. Experiment with different corruption pairings and watch the transformation meter',
     '<h3 style="margin:0 0 8px;">Planifica tu ruta de tablas de desbloqueo</h3><p style="margin:0;color:var(--color-muted-fg);">Los personajes corruptos secretos de la Tabla 3 son los más extremos sonoramente en <strong>Sprunki Corruptbox</strong>. Para alcanzarlos, necesitas combinaciones de corrupción específicas que lleven el motor de glitch al límite. Experimenta con diferentes emparejamientos de corrupción y observa el medidor de transformación',
     '<h3 style="margin:0 0 8px;">Планируйте путь разблокировки таблиц</h3><p style="margin:0;color:var(--color-muted-fg);">Секретные искажённые персонажи Таблицы 3 являются самыми звуково экстремальными в <strong>Sprunki Corruptbox</strong>. Чтобы достичь их, вам нужны определённые комбинации искажения, которые толкают глитч-движок до предела. Экспериментируйте с различными парами искажения и следите за счётчиком трансформации'),

    # FAQ heading
    ('<h2 id="faq">Sprunki Corruptbox FAQ</h2>',
     '<h2 id="faq">Preguntas Frecuentes de Sprunki Corruptbox</h2>',
     '<h2 id="faq">ЧаВо по Sprunki Corruptbox</h2>'),

    # FAQ body Q1
    ('<h3>What are corrupted sounds in Sprunki Corruptbox?</h3>\n            <p>24 audio loops intentionally broken through bit-crushing, sample-rate reduction, granular synthesis, and spectral inversion. The corruption is the aesthetic, not a bug.</p>',
     '<h3>¿Qué son los sonidos corruptos en Sprunki Corruptbox?</h3>\n            <p>24 bucles de audio procesados mediante algoritmos de glitch y distorsión. En lugar de samples limpios, cada sonido está intencionalmente roto — bit-crushed, con sample rate reducido, granulizado o espectralmente invertido. La corrupción es la estética, no un error.</p>',
     '<h3>Что такое искажённые звуки в Sprunki Corruptbox?</h3>\n            <p>24 аудиопетли, намеренно сломанные через бит-крашинг, снижение частоты дискретизации, гранулярный синтез и спектральную инверсию. Искажение — это эстетика, а не ошибка.</p>'),

    # FAQ body Q2
    ('<h3>How does the character transformation mechanic work in Sprunki Corruptbox?</h3>\n            <p>Corruption spreads across characters in three stages',
     '<h3>¿Cómo funciona la mecánica de transformación de personajes en Sprunki Corruptbox?</h3>\n            <p>La corrupción se extiende por los personajes en tres etapas',
     '<h3>Как работает механика трансформации персонажей в Sprunki Corruptbox?</h3>\n            <p>Искажение распространяется на персонажей в три этапа'),

    # FAQ body Q3
    ('<h3>What are the three unlock tables in Sprunki Corruptbox?</h3>\n            <p>Three progressive unlock tables gate corrupted sounds, glitch effects, and secret characters. Each table requires achieving specific corruption milestones by combining corrupted sounds.</p>',
     '<h3>¿Cuáles son las tres tablas de desbloqueo en Sprunki Corruptbox?</h3>\n            <p>Tres tablas de desbloqueo progresivas controlan sonidos corruptos, efectos glitch y personajes secretos. Cada tabla requiere alcanzar hitos de corrupción específicos combinando sonidos corruptos.</p>',
     '<h3>Что такое три таблицы разблокировки в Sprunki Corruptbox?</h3>\n            <p>Три прогрессивные таблицы разблокировки открывают доступ к искажённым звукам, глитч-эффектам и секретным персонажам. Каждая таблица требует достижения определённых этапов искажения путём комбинирования искажённых звуков.</p>'),

    # FAQ body Q4
    ('<h3>What are the five versions in Sprunki Corruptbox?</h3>\n            <p>Five distinct corruption processing modes',
     '<h3>¿Cuáles son las cinco versiones en Sprunki Corruptbox?</h3>\n            <p>Cinco modos distintos de procesamiento de corrupción',
     '<h3>Что такое пять версий в Sprunki Corruptbox?</h3>\n            <p>Пять различных режимов обработки искажения'),

    # FAQ body Q5
    ('<h3>How is Sprunki Corruptbox different from other Sprunki mods?</h3>\n            <p>Sprunki Corruptbox treats audio destruction as a creative tool rather than delivering clean sound libraries. No other Sprunki mod makes glitch and corruption the central mechanic.</p>',
     '<h3>¿En qué se diferencia Sprunki Corruptbox de otros mods de Sprunki?</h3>\n            <p>Sprunki Corruptbox trata la destrucción de audio como una herramienta creativa en lugar de ofrecer bibliotecas de sonido limpias. Ningún otro mod de Sprunki hace del glitch y la corrupción la mecánica central.</p>',
     '<h3>Чем Sprunki Corruptbox отличается от других модов Sprunki?</h3>\n            <p>Sprunki Corruptbox рассматривает разрушение аудио как творческий инструмент, а не предлагает чистые библиотеки звуков. Ни один другой мод Sprunki не делает глитч и искажение центральной механикой.</p>'),

    # Why Play heading
    ('<h2 id="why-play">Why Players Love Sprunki Corruptbox</h2>',
     '<h2 id="why-play">Por Qué los Jugadores Aman Sprunki Corruptbox</h2>',
     '<h2 id="why-play">Почему Игроки Любят Sprunki Corruptbox</h2>'),

    # Why Play P1
    ('<p><strong>Sprunki Corruptbox</strong> took the glitch aesthetic that Phase 3 pioneered and made it the entire game. There is no clean mode, no safety switch, no way to turn off the corruption',
     '<p><strong>Sprunki Corruptbox</strong> tomó la estética glitch que Phase 3 inició y la convirtió en el juego completo. No hay modo limpio, no hay interruptor de seguridad, no hay forma de apagar la corrupción',
     '<p><strong>Sprunki Corruptbox</strong> взял глитч-эстетику, начатую Phase 3, и сделал её всей игрой. Нет чистого режима, нет предохранителя, нет способа отключить искажение'),

    # Why Play P2
    ('<p>The Sprunki Corruptbox community has grown into a dedicated group of glitch enthusiasts who trade corruption recipes, share unlock table strategies, and debate which version produces the best spectral collapse.',
     '<p>La comunidad de <strong>Sprunki Corruptbox</strong> ha crecido hasta convertirse en un grupo dedicado de entusiastas del glitch que intercambian recetas de corrupción, comparten estrategias de tablas de desbloqueo y debaten qué versión produce el mejor colapso espectral.',
     '<p>Сообщество <strong>Sprunki Corruptbox</strong> выросло в преданную группу энтузиастов глитча, которые обмениваются рецептами искажения, делятся стратегиями таблиц разблокировки и спорят, какая версия производит лучший спектральный коллапс.'),

    # Related Games
    ('<li><a href="sprunki-phase-3.html">Sprunki Phase 3 — The Turning Point</a> — The phase that pioneered the dark electronic sound and glitch aesthetic. See where Corruptbox\'s corruption DNA began.</li>',
     '<li><a href="sprunki-phase-3.html">Sprunki Phase 3 — The Turning Point</a> — La fase que inició el sonido electrónico oscuro y la estética glitch. Descubre dónde comenzó el ADN de corrupción de Corruptbox.</li>',
     '<li><a href="sprunki-phase-3.html">Sprunki Phase 3 — The Turning Point</a> — Фаза, которая положила начало тёмному электронному звуку и глитч-эстетике. Узнайте, где зародилась ДНК искажения Corruptbox.</li>'),
    ('<li><a href="sprunki-phase-4.html">Sprunki Phase 4 — Full Horror</a> — Nightmare Mode becomes a full horror toggle. Phase 3\'s darkness, evolved into its own complete experience.</li>',
     '<li><a href="sprunki-phase-4.html">Sprunki Phase 4 — Full Horror</a> — El Modo Pesadilla se convierte en un interruptor de horror completo. La oscuridad de Phase 3, evolucionada en su propia experiencia completa.</li>',
     '<li><a href="sprunki-phase-4.html">Sprunki Phase 4 — Full Horror</a> — Режим Кошмара становится полноценным переключателем ужаса. Тьма Phase 3, эволюционировавшая в собственный завершённый опыт.</li>'),
    ('<li><a href="sprunki-phase-7.html">Sprunki Phase 7 — The Deep Cut</a> — The darkest phase in the main series. Phase 3 walked, Phase 7 ran, Corruptbox broke the sound barrier.</li>',
     '<li><a href="sprunki-phase-7.html">Sprunki Phase 7 — The Deep Cut</a> — La fase más oscura de la serie principal. Phase 3 caminó, Phase 7 corrió, Corruptbox rompió la barrera del sonido.</li>',
     '<li><a href="sprunki-phase-7.html">Sprunki Phase 7 — The Deep Cut</a> — Самая тёмная фаза в основной серии. Phase 3 шла, Phase 7 бежала, Corruptbox преодолел звуковой барьер.</li>'),
    ('<li><a href="sprunki-pyramixed-2.html">Sprunki Pyramixed 2</a> — Horror Mode with multi-stage pyramid descent. The parallel evolution of Sprunki\'s dark universe alongside Corruptbox.</li>',
     '<li><a href="sprunki-pyramixed-2.html">Sprunki Pyramixed 2</a> — Modo Horror con descenso piramidal en múltiples etapas. La evolución paralela del universo oscuro de Sprunki junto a Corruptbox.</li>',
     '<li><a href="sprunki-pyramixed-2.html">Sprunki Pyramixed 2</a> — Режим Ужаса с многоэтапным пирамидальным спуском. Параллельная эволюция тёмной вселенной Sprunki вместе с Corruptbox.</li>'),
    ('<li><a href="sprunki-swapped-retextured.html">Sprunki Swapped Retextured</a> — Characters reimagined with swapped roles and textures. A different take on transformation',
     '<li><a href="sprunki-swapped-retextured.html">Sprunki Swapped Retextured</a> — Personajes reimaginados con roles y texturas intercambiados. Un enfoque diferente de la transformación',
     '<li><a href="sprunki-swapped-retextured.html">Sprunki Swapped Retextured</a> — Персонажи, переосмысленные с обменянными ролями и текстурами. Другой взгляд на трансформацию'),
    ('<li><a href="../../index.html">2v2.io</a> — The original pyramid-themed mod. The foundation the entire Sprunki universe was built on.</li>',
     '<li><a href="../../index.html">2v2.io</a> — El mod original con temática de pirámide. La base sobre la que se construyó todo el universo Sprunki.</li>',
     '<li><a href="../../index.html">2v2.io</a> — Оригинальный мод с пирамидальной тематикой. Фундамент, на котором построена вся вселенная Sprunki.</li>'),
]

print(f"Corruptbox: {len(CORRUPTBOX_BODY)} translation pairs loaded.")

# ============================================================
# APPLY TRANSLATIONS
# ============================================================

def apply_translations(filepath, translations, lang):
    """Read file, apply translation rules, write back."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    idx = 1 if lang == 'es' else 2
    fixed = 0
    for rule in translations:
        if rule[0] in content:
            content = content.replace(rule[0], rule[idx])
            fixed += 1
        else:
            # Try with escaped quotes
            pass

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  {lang}: {fixed}/{len(translations)} translations applied")
    return content


if __name__ == '__main__':
    # Process corruptbox
    for lang in ['es', 'ru']:
        lang_dir = 'es' if lang == 'es' else 'ru'
        fp = os.path.join(BASE, lang_dir, 'games', 'corruptbox.html')
        apply_translations(fp, CORRUPTBOX_BODY, lang)

    print("\nCorruptbox body translations applied.")
