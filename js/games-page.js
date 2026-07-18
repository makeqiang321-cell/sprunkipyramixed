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
        { name: 'Sprunki Phase 4',           img:'/assets/sprunki-phase-4-new.png', color1:'#1a1a2e',color2:'#8b0000', url:'/games/sprunki-phase-4.html', cat:'popular'},
        { name: 'Sprunki Pyramixed Phase 3',  img:'/assets/sprunki-pyramixed-phase-3.png', color1:'#3d1c00',color2:'#8b0000', url:'/games/sprunki-pyramixed-phase-3.html', cat:'popular'},
        { name: 'Sprunki Phase 2',           img:'/assets/sprunki-phase-2.png', color1:'#ff6b35',color2:'#1a0a2e', url:'/games/sprunki-phase-2.html', cat:'popular'},
        { name: 'Sprunki Phase 7',           img:'/assets/sprunki-phase-7.png', color1:'#0d0221',color2:'#ff0055', url:'/games/sprunki-phase-7.html', cat:'popular'},
        { name: 'Sprunki Pyramixed 2',       img:'/assets/sprunki-pyramixed-2.png', color1:'#c8a52e',color2:'#5c3d0e', url:'/games/sprunki-pyramixed-2.html', cat:'popular'},
        { name: 'Sprunki Phase 3',           img:'/assets/sprunki-phase-3-new.png', color1:'#4a148c',color2:'#1a1a2e', url:'/games/sprunki-phase-3.html', cat:'popular'},
        { name: 'Sprunki Girls with Hair',   img:'/assets/sprunki-girls-with-hair.png', color1:'#e91e63',color2:'#880e4f', url:'/games/sprunki-girls-with-hair.html', cat:'new'},
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
        } else {
            links[0].classList.add('active');
        }
    }

    ready(function () {
        renderGames();

        // Sidebar filter: Game List
        var sidebarLinks = document.querySelectorAll('.sidebar-menu-link');
        if (sidebarLinks.length >= 3) {
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
