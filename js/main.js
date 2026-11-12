/**
 * Sprunki Pyramixed — Main JavaScript
 * Carousels, theme toggle, play button, mobile menu, star rating, comments
 */
(function () {
    'use strict';

    var gameData = [
        { name: 'Sprunki Pyramixed',           img:'/assets/sprunki-pyramixed.png', color1:'#05b4d3',color2:'#8b5cf6', url:'index.html' },
        { name: 'Sprunki Phase 3',             img:'/assets/sprunki-phase-3-new.png', color1:'#4a148c',color2:'#1a1a2e', url:'/games/sprunki-phase-3.html' },
        { name: 'Sprunki Phase 4',             img:'/assets/sprunki-phase-4-new.png', color1:'#1a1a2e',color2:'#8b0000', url:'/games/sprunki-phase-4.html' },
        { name: 'Sprunki Phase 2',             img:'/assets/sprunki-phase-2.png', color1:'#ff6b35',color2:'#1a0a2e', url:'/games/sprunki-phase-2.html' },
        { name: 'Sprunki Phase 7',             img:'/assets/sprunki-phase-7.png', color1:'#0d0221',color2:'#ff0055', url:'/games/sprunki-phase-7.html' },
        { name: 'Sprunki Pyramixed Phase 3',   img:'/assets/sprunki-pyramixed-phase-3.png', color1:'#3d1c00',color2:'#8b0000', url:'/games/sprunki-pyramixed-phase-3.html' },
        { name: 'Sprunki Pyramixed 2',         img:'/assets/sprunki-pyramixed-2.png', color1:'#c8a52e',color2:'#5c3d0e', url:'/games/sprunki-pyramixed-2.html' },
        { name: 'Sprunki Corruptbox',          img:'/assets/corruptbox.png', color1:'#1a1a2e',color2:'#e94560', url:'/games/corruptbox.html' },
        { name: 'Sprunki PvZ',                 img:'/assets/sprunki-pvz.png', color1:'#4ade80',color2:'#166534', url:'/games/sprunki-pvz.html' },
        { name: 'Sprunki Swapped Retextured',  img:'/assets/sprunki-swapped-retextured.webp', color1:'#7c2d8a',color2:'#e94560', url:'/games/sprunki-swapped-retextured.html' },
        { name: 'Sprunki Swapped Alive',       img:'/assets/sprunki-swapped-alive.jpg', color1:'#16a34a',color2:'#0d0221', url:'/games/sprunki-swapped-alive.html' },
        { name: 'Sprunki Phase 16',            img:'/assets/sprunki-1996.png', color1:'#7c3aed',color2:'#a78bfa', url:'/games/phase-16.html' },
        { name: 'Sprunki Phase 16 New',        img:'/assets/sprunki-phase-16-new.webp', color1:'#2e1065',color2:'#d946ef', url:'/games/sprunki-phase-16-new.html' },
        { name: 'Sprunki Phase 32',            img:'/assets/sprunki-phase-32.jpg', color1:'#00e5ff',color2:'#7b2ff7', url:'/games/sprunki-phase-32.html' },
        { name: 'Sprunki But Alphabet Lore',   img:'/assets/sprunki-but-alphabet-lore.png', color1:'#ef4444',color2:'#f59e0b', url:'/games/sprunki-but-alphabet-lore.html' },
        { name: 'Sprunki Retake But Sprunksters', img:'/assets/sprunki-retake-but-sprunksters.png', color1:'#f472b6',color2:'#8b5cf6', url:'/games/sprunki-retake-but-sprunksters.html' },
        { name: 'Sprunki Swap 2',              img:'/assets/sprunki-swap-2.png', color1:'#ec4899',color2:'#0ea5e9', url:'/games/sprunki-swap-2.html' },
        { name: 'Sprunki Phase 17',            img:'/assets/sprunki-phase-17.jpg', color1:'#450a0a',color2:'#ef4444', url:'/games/sprunki-phase-17.html' },
        { name: 'Sprunki Another One',         img:'/assets/sprunki-another-one.webp', color1:'#f59e0b',color2:'#f472b6', url:'/games/sprunki-another-one.html' },
        { name: 'Sprunki Phase 19',            img:'/assets/sprunki-phase-19.jpg', color1:'#6366f1',color2:'#06b6d4', url:'/games/sprunki-phase-19.html' },
        { name: 'Sprunki Kick the Buddy',      img:'/assets/sprunki-kick-the-buddy.png', color1:'#ef4444',color2:'#f59e0b', url:'/games/sprunki-kick-the-buddy.html' },
        { name: 'Sprunki Phase 2 Definitive',  img:'/assets/sprunki-phase-2-definitive.png', color1:'#7c3aed',color2:'#ec4899', url:'/games/sprunki-phase-2-definitive.html' },
        { name: 'Sprunki Pyramixed Deluxe',    img:'/assets/sprunki-pyramixed-deluxe.webp', color1:'#ff8c42',color2:'#ffb347', url:'/games/sprunki-pyramixed-deluxe.html' },
        { name: 'Sprunksters: The Final Update', img:'/assets/sprunksters-final-update.jpg', color1:'#10b981',color2:'#84cc16', url:'/games/sprunksters-final-update.html' },
        { name: "Sprunki Shifted Pepper's Take", img:'/assets/sprunki-shifted-peppers-take.jpg', color1:'#dc2626',color2:'#7f1d1d', url:'/games/sprunki-shifted-peppers-take.html' },
        { name: 'FNF Whitty vs Boyfriend Fire Fight', img:'/assets/fnf-whitty-fire-fight.jpg', color1:'#f97316',color2:'#b91c1c', url:'/games/fnf-whitty-vs-boyfriend-fire-fight.html' },
        { name: 'Sprunki Girls with Hair',     img:'/assets/sprunki-girls-with-hair.png', color1:'#e91e63',color2:'#880e4f', url:'/games/sprunki-girls-with-hair.html' },
    ];

    var popularGames = gameData.slice(0, 6);
    var newGames     = gameData.slice(6, 12);

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        initCarousels();
        populateTrack('peopleTrack', gameData.slice(1, 9));
        wireCarousel('peopleTrack', 'peoplePrev', 'peopleNext');
        populateSidebar();
        initLangSwitcher();
        initThemeToggle();
        initMobileMenu();
        initPlayButton();
        initStarRating();
        initCommentForm();
        initGameActions();
    });

    // ═══════════════════════════════════════════
    // CAROUSELS
    // ═══════════════════════════════════════════
    function createCarouselCard(game) {
        var card = document.createElement('div');
        card.className = 'carousel-card';
        var imgContent;
        if (game.img) {
            imgContent = '<img src="' + game.img + '" alt="' + escapeHtml(game.name) + '" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">';
        } else {
            imgContent = '<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3rem;">' + (game.icon || '🎮') + '</span>';
        }
        var href = game.url || '#';
        card.innerHTML =
            '<a href="' + href + '" class="carousel-card-link">' +
            '<div class="carousel-card-img-wrap" style="background:linear-gradient(135deg,' + game.color1 + ',' + game.color2 + ');">' +
            imgContent +
            '<div class="carousel-card-overlay"><span class="carousel-card-title-overlay">' + escapeHtml(game.name) + '</span></div>' +
            '</div></a>';
        return card;
    }

    function populateTrack(trackId, games) {
        var track = document.getElementById(trackId);
        if (!track) return;
        track.innerHTML = '';
        games.forEach(function (g) { track.appendChild(createCarouselCard(g)); });
    }

    function initCarousels() {
        var grid = document.getElementById('popularGrid');
        if (!grid) return;
        gameData.slice(0, 7).forEach(function (g) {
            var card = document.createElement('a');
            card.href = g.url || '#';
            card.style.cssText = 'text-decoration:none;border-radius:10px;overflow:hidden;background:var(--color-bg-card);transition:transform 0.2s;';
            card.onmouseenter = function() { card.style.transform = 'translateY(-3px)'; };
            card.onmouseleave = function() { card.style.transform = ''; };
            card.innerHTML =
                '<div style="position:relative;padding-top:66%;overflow:hidden;background:linear-gradient(135deg,' + g.color1 + ',' + g.color2 + ');">' +
                '<img src="' + g.img + '" alt="' + escapeHtml(g.name) + '" loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">' +
                '</div>' +
                '<div style="padding:10px 12px;font-size:0.82rem;font-weight:600;color:var(--color-text);">' + escapeHtml(g.name) + '</div>';
            grid.appendChild(card);
        });
    }

    function wireCarousel(trackId, prevId, nextId) {
        var track = document.getElementById(trackId);
        var prev = document.getElementById(prevId);
        var next = document.getElementById(nextId);
        if (!track) return;
        if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -300, behavior: 'smooth' }); });
        if (next) next.addEventListener('click', function () { track.scrollBy({ left: 300, behavior: 'smooth' }); });
    }

    // ═══════════════════════════════════════════
    // SIDEBAR
    // ═══════════════════════════════════════════
    function populateSidebar() {
        populateSidebarList('sidebarNew', gameData.slice(-7));
    }

    function populateSidebarList(listId, games) {
        var list = document.getElementById(listId);
        if (!list) return;
        list.innerHTML = '';
        games.forEach(function (g) {
            var li = document.createElement('li');
            var thumb = g.img
                ? '<img src="' + g.img + '" alt="' + escapeHtml(g.name) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;">'
                : '<span style="font-size:1.3rem;">' + (g.icon || '🎮') + '</span>';
            li.innerHTML =
                '<a href="' + (g.url || '#') + '" class="sidebar-game-item">' +
                '<span class="sidebar-game-thumb" style="background:linear-gradient(135deg,' + g.color1 + ',' + g.color2 + ');">' + thumb + '</span>' +
                '<span class="sidebar-game-info"><span class="sidebar-game-name">' + escapeHtml(g.name) + '</span>' +
                '<span class="sidebar-game-players">Click to play</span></span></a>';
            list.appendChild(li);
        });
    }

    // ═══════════════════════════════════════════
    // LANGUAGE SWITCHER
    // ═══════════════════════════════════════════
    function initLangSwitcher() {
        var sel = document.getElementById('langSwitcher');
        if (!sel) return;
        sel.addEventListener('change', function () {
            var lang = sel.value;
            var url = window.location.href;
            url = url.replace(/\/(es|ru)\//, '/');
            if (lang === 'en') {
                window.location.href = url;
            } else {
                url = url.replace(/\/(games\/)/, '/' + lang + '/$1');
                url = url.replace(/\/(index\.html)/, '/' + lang + '/$1');
                url = url.replace(/\/(games\.html)/, '/' + lang + '/$1');
                // fix: root page (no path matched) — add language prefix
                if (url.indexOf('/' + lang + '/') === -1) {
                    url = url.replace(/\/?$/, '/' + lang + '/');
                }
                window.location.href = url;
            }
        });
    }

    // ═══════════════════════════════════════════
    // THEME TOGGLE
    // ═══════════════════════════════════════════
    function initThemeToggle() {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var html = document.documentElement;
        btn.addEventListener('click', function () {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ═══════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════
    function initMobileMenu() {
        var btn = document.getElementById('menuToggle');
        var nav = document.getElementById('mobileNav');
        if (!btn || !nav) return;
        btn.addEventListener('click', function () { nav.classList.toggle('open'); });
    }

    // ═══════════════════════════════════════════
    // PLAY BUTTON
    // ═══════════════════════════════════════════
    function initPlayButton() {
        var btn = document.getElementById('playBtn');
        var overlay = document.getElementById('previewOverlay');
        var iframe = document.getElementById('gameIframe');
        if (!btn || !overlay || !iframe) return;
        btn.addEventListener('click', function () {
            overlay.style.display = 'none';
            iframe.style.display = 'block';
        });
    }

    // ═══════════════════════════════════════════
    // STAR RATING
    // ═══════════════════════════════════════════
    function initStarRating() {
        var stars = document.querySelectorAll('#starRating .star');
        var rv = document.querySelector('#starRating .rating-value');
        if (!stars.length || !rv) return;
        var cr = 0;
        stars.forEach(function (st) {
            st.addEventListener('click', function () {
                cr = parseInt(this.getAttribute('data-value'));
                stars.forEach(function (x, i) { x.style.color = i < cr ? '#f1c40f' : 'var(--color-muted)'; });
                rv.textContent = cr + '/5';
            });
        });
    }

    // ═══════════════════════════════════════════
    // COMMENT FORM
    // ═══════════════════════════════════════════
    function initCommentForm() {
        var form = document.getElementById('commentForm');
        var list = document.getElementById('commentList');
        if (!form || !list) return;
        var comments = JSON.parse(localStorage.getItem('sprunkiComments') || '[]');
        comments.forEach(function (c) { addComment(c.name, c.text, c.rating, c.date); });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var n = form.querySelector('.comment-input').value.trim();
            var t = form.querySelector('.comment-textarea').value.trim();
            if (!n || !t) return;
            var c = { name: n, text: t, rating: 0, date: new Date().toLocaleDateString() };
            comments.push(c);
            localStorage.setItem('sprunkiComments', JSON.stringify(comments));
            addComment(n, t, 0, c.date);
            form.reset();
        });

        function addComment(n, t, r, d) {
            var div = document.createElement('div');
            div.style.cssText = 'background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:10px;padding:14px 18px;margin-bottom:12px;';
            div.innerHTML = '<div style="display:flex;justify-content:space-between;margin-bottom:6px;"><strong>' + n + '</strong><span style="font-size:0.8rem;color:var(--color-muted-fg);">' + (r ? '★'.repeat(r) + '☆'.repeat(5 - r) + ' ' : '') + d + '</span></div><p style="color:var(--color-muted-fg);margin:0;">' + t + '</p>';
            list.prepend(div);
        }
    }

    // ═══════════════════════════════════════════
    // GAME ACTIONS (fullscreen, share)
    // ═══════════════════════════════════════════
    function initGameActions() {
        var fsBtn = document.getElementById('fullscreenBtn');
        var shareBtn = document.getElementById('shareBtn');
        if (fsBtn) fsBtn.addEventListener('click', function () {
            var iframe = document.querySelector('iframe');
            if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
        });
        if (shareBtn) shareBtn.addEventListener('click', function () {
            var url = window.location.href;
            if (navigator.share) navigator.share({ title: document.title, url: url });
            else { navigator.clipboard.writeText(url).then(function () { alert('Link copied!'); }); }
        });
    }
})();
