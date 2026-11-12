/**
 * Games Listing Page
 */
(function () {
    'use strict';

    var gameData = [
        { name: 'Sprunki Pyramixed', img:'/assets/sprunki-pyramixed.png', color1:'#05b4d3',color2:'#8b5cf6', url:'index.html', cat:'popular'},
        { name: 'Sprunki Phase 16 Dashdoshty', img:'/assets/sprunki-1996.png', color1:'#7c3aed',color2:'#a78bfa', url:'/games/phase-16.html', cat:'new'},
        { name: 'Sprunki Corruptbox', img:'/assets/corruptbox.png', color1:'#1a1a2e',color2:'#e94560', url:'/games/corruptbox.html', cat:'popular'},
        { name: 'Sprunki PvZ', img:'/assets/sprunki-pvz.png', color1:'#4ade80',color2:'#166534', url:'/games/sprunki-pvz.html', cat:'popular'},
        { name: 'Sprunki Swapped Retextured', img:'/assets/sprunki-swapped-retextured.webp', color1:'#7c2d8a',color2:'#e94560', url:'/games/sprunki-swapped-retextured.html', cat:'new'},
        { name: 'Sprunki Swapped Alive', img:'/assets/sprunki-swapped-alive.jpg', color1:'#16a34a',color2:'#0d0221', url:'/games/sprunki-swapped-alive.html', cat:'new'},
        { name: 'Sprunki Phase 16 New', img:'/assets/sprunki-phase-16-new.webp', color1:'#2e1065',color2:'#d946ef', url:'/games/sprunki-phase-16-new.html', cat:'new'},
        { name: 'Sprunki Phase 32', img:'/assets/sprunki-phase-32.jpg', color1:'#00e5ff',color2:'#7b2ff7', url:'/games/sprunki-phase-32.html', cat:'new'},
        { name: 'Sprunki But Alphabet Lore', img:'/assets/sprunki-but-alphabet-lore.png', color1:'#ef4444',color2:'#f59e0b', url:'/games/sprunki-but-alphabet-lore.html', cat:'new'},
        { name: 'Sprunki Retake But Sprunksters', img:'/assets/sprunki-retake-but-sprunksters.png', color1:'#f472b6',color2:'#8b5cf6', url:'/games/sprunki-retake-but-sprunksters.html', cat:'new'},
        { name: 'Sprunki Swap 2', img:'/assets/sprunki-swap-2.png', color1:'#ec4899',color2:'#0ea5e9', url:'/games/sprunki-swap-2.html', cat:'new'},
        { name: 'Sprunki Phase 17', img:'/assets/sprunki-phase-17.jpg', color1:'#450a0a',color2:'#ef4444', url:'/games/sprunki-phase-17.html', cat:'new'},
        { name: 'Sprunki Another One', img:'/assets/sprunki-another-one.webp', color1:'#f59e0b',color2:'#f472b6', url:'/games/sprunki-another-one.html', cat:'new'},
        { name: 'Sprunki Phase 19', img:'/assets/sprunki-phase-19.jpg', color1:'#6366f1',color2:'#06b6d4', url:'/games/sprunki-phase-19.html', cat:'new'},
        { name: 'Sprunki Kick the Buddy', img:'/assets/sprunki-kick-the-buddy.png', color1:'#ef4444',color2:'#f59e0b', url:'/games/sprunki-kick-the-buddy.html', cat:'new'},
        { name: 'Sprunki Phase 2 Definitive', img:'/assets/sprunki-phase-2-definitive.png', color1:'#7c3aed',color2:'#ec4899', url:'/games/sprunki-phase-2-definitive.html', cat:'new'},
        { name: 'Sprunki Pyramixed Deluxe', img:'/assets/sprunki-pyramixed-deluxe.webp', color1:'#ff8c42',color2:'#ffb347', url:'/games/sprunki-pyramixed-deluxe.html', cat:'new'},
        { name: 'Sprunksters: The Final Update', img:'/assets/sprunksters-final-update.jpg', color1:'#10b981',color2:'#84cc16', url:'/games/sprunksters-final-update.html', cat:'new'},
        { name: "Sprunki Shifted Pepper's Take", img:'/assets/sprunki-shifted-peppers-take.jpg', color1:'#dc2626',color2:'#7f1d1d', url:'/games/sprunki-shifted-peppers-take.html', cat:'new'},
        { name: 'Sprunki Phase 4',           img:'/assets/sprunki-phase-4-new.png', color1:'#1a1a2e',color2:'#8b0000', url:'/games/sprunki-phase-4.html', cat:'popular'},
        { name: 'Sprunki Pyramixed Phase 3',  img:'/assets/sprunki-pyramixed-phase-3.png', color1:'#3d1c00',color2:'#8b0000', url:'/games/sprunki-pyramixed-phase-3.html', cat:'popular'},
        { name: 'Sprunki Phase 2',           img:'/assets/sprunki-phase-2.png', color1:'#ff6b35',color2:'#1a0a2e', url:'/games/sprunki-phase-2.html', cat:'popular'},
        { name: 'Sprunki Phase 7',           img:'/assets/sprunki-phase-7.png', color1:'#0d0221',color2:'#ff0055', url:'/games/sprunki-phase-7.html', cat:'popular'},
        { name: 'Sprunki Pyramixed 2',       img:'/assets/sprunki-pyramixed-2.png', color1:'#c8a52e',color2:'#5c3d0e', url:'/games/sprunki-pyramixed-2.html', cat:'popular'},
        { name: 'Sprunki Phase 3',           img:'/assets/sprunki-phase-3-new.png', color1:'#4a148c',color2:'#1a1a2e', url:'/games/sprunki-phase-3.html', cat:'popular'},
        { name: 'Sprunki Girls with Hair',   img:'/assets/sprunki-girls-with-hair.png', color1:'#e91e63',color2:'#880e4f', url:'/games/sprunki-girls-with-hair.html', cat:'new'},
        { name: 'FNF Whitty vs Boyfriend Fire Fight', img:'/assets/fnf-whitty-fire-fight.jpg', color1:'#f97316',color2:'#b91c1c', url:'/games/fnf-whitty-vs-boyfriend-fire-fight.html', cat:'fnf'},
        { name: 'FNF Sonic The Funk', img:'/assets/fnf-sonic-the-funk.jpg', color1:'#1e88e5',color2:'#0d47a1', url:'/games/fnf-sonic-the-funk.html', cat:'fnf'},
        { name: 'FNF Spaghetti (LE SSERAFIM)', img:'/assets/fnf-spaghetti-le-sserafim.jpg', color1:'#7c3aed',color2:'#db2777', url:'/games/fnf-spaghetti-le-sserafim.html', cat:'fnf'},
    ];

    function escapeHtml(str) {
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(str));
        return d.innerHTML;
    }

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    function renderGames(filter) {
        var grid = document.getElementById('gamesGrid');
        if (!grid) return;
        grid.innerHTML = '';

        var filtered = filter ? gameData.filter(function(g) { return g.cat === filter; }) : gameData;

        filtered.forEach(function (g) {
            var card = document.createElement('div');
            card.className = 'game-card-item';

            var imgContent;
            if (g.img) {
                imgContent = '<img src="' + g.img + '" alt="' + escapeHtml(g.name) + '" loading="lazy" width="300" height="200" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">';
            } else {
                imgContent = '<span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3rem;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));">' + g.icon + '</span>';
            }

            var href = g.url || '#';
            card.innerHTML =
                '<a href="' + href + '" class="game-card-link">' +
                '<div class="game-card-img-wrap" style="background:linear-gradient(135deg,' + g.color1 + ',' + g.color2 + ');display:flex;align-items:center;justify-content:center;overflow:hidden;">' +
                imgContent +
                '<div class="game-card-overlay"></div>' +
                '</div>' +
                '<div class="game-card-body">' +
                '<div class="game-card-name">' + escapeHtml(g.name) + '</div>' +
                '<div class="game-card-rating">' +
                '<span class="star-empty">☆</span><span class="star-empty">☆</span><span class="star-empty">☆</span><span class="star-empty">☆</span><span class="star-empty">☆</span>' +
                '</div>' +
                '</div></a>';
            grid.appendChild(card);
        });
    }

    function setActiveLink(filter) {
        var links = document.querySelectorAll('.sidebar-menu-link');
        links.forEach(function(l) { l.classList.remove('active'); });
        if (filter === 'popular') {
            links[1].classList.add('active');
        } else if (filter === 'new') {
            links[2].classList.add('active');
        } else if (filter === 'fnf') {
            links[3].classList.add('active');
        } else {
            links[0].classList.add('active');
        }
    }

    ready(function () {
        renderGames();

        // Sidebar filter: Game List
        var sidebarLinks = document.querySelectorAll('.sidebar-menu-link');
        if (sidebarLinks.length >= 4) {
            sidebarLinks[0].addEventListener('click', function(e) {
                e.preventDefault();
                renderGames();
                setActiveLink('all');
            });
            // Popular Games
            sidebarLinks[1].addEventListener('click', function(e) {
                e.preventDefault();
                renderGames('popular');
                setActiveLink('popular');
            });
            // New Games
            sidebarLinks[2].addEventListener('click', function(e) {
                e.preventDefault();
                renderGames('new');
                setActiveLink('new');
            });
            // FNF Games
            sidebarLinks[3].addEventListener('click', function(e) {
                e.preventDefault();
                renderGames('fnf');
                setActiveLink('fnf');
            });
        }

        // Theme toggle
        var themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', function () {
                var html = document.documentElement;
                html.classList.toggle('dark');
                localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
            });
        }

        // Mobile menu
        var menuBtn = document.getElementById('menuToggle');
        var nav = document.getElementById('mobileNav');
        if (menuBtn && nav) {
            menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
        }
    });
})();
