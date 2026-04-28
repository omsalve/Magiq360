(function () {
    'use strict';

    const navbar      = document.getElementById('navbar');
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');
    const scrollTopBtn = document.getElementById('scrollTop');
    const logoImg     = document.querySelector('.logo-img');
    const logoFallback = document.getElementById('logoFallback');

    /* ── Logo fallback ──────────────────────────────────────── */
    if (logoImg) {
        logoImg.addEventListener('error', function () {
            this.style.display = 'none';
            if (logoFallback) logoFallback.classList.add('show');
        });
    }

    /* ── Navbar: transparent → solid on scroll ──────────────── */
    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ── Scroll-to-top visibility ───────────────────────────── */
    function updateScrollBtn() {
        if (window.scrollY > 450) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    /* ── Feature-row scroll progress lines ─────────────────── */
    const featRows = Array.from(document.querySelectorAll('.feat-row'));

    function updateFeatureLines() {
        if (!featRows.length) return;
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        featRows.forEach(function (row, i) {
            const vline = row.querySelector('.feat-vline');
            if (!vline) return;

            const rowTop = row.getBoundingClientRect().top + scrollY;
            const start  = rowTop - vh;   // this row enters viewport bottom → bar starts

            let end;
            if (i < featRows.length - 1) {
                // bar ends exactly when the next row enters viewport bottom
                end = featRows[i + 1].getBoundingClientRect().top + scrollY - vh;
            } else {
                // last bar: completes when this row reaches mid-viewport
                end = rowTop + row.offsetHeight - vh * 0.5;
            }

            const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
            vline.style.transform = 'scaleY(' + progress + ')';
        });
    }

    window.addEventListener('scroll', function () {
        updateNavbar();
        updateScrollBtn();
        updateFeatureLines();
    }, { passive: true });

    /* Run once on load in case page is already scrolled */
    updateNavbar();
    updateScrollBtn();
    updateFeatureLines();

    /* ── Scroll to top click ────────────────────────────────── */
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ── Hamburger / mobile menu ────────────────────────────── */
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
    });

    /* Close menu when clicking outside */
    document.addEventListener('click', function (e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });

    /* Close menu on link click */
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });

})();
