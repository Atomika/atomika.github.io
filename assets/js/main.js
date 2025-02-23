(function($) {
    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        $main_articles = $main.children('article'),
        $overlay = $('.image-overlay');  // Reference to the overlay.

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Methods to show or hide articles and overlays.
    var delay = 325,
        locked = false;

    // Show article or overlay
    function showArticleOrOverlay(id, initial) {
        var $article = $main_articles.filter('#' + id);
        if (id === 'overlay') {
            $article = $overlay;
        }

        if ($article.length == 0) return; // Bail if no such article or overlay.

        // Lock the body to prevent other actions while switching.
        if (locked || (typeof initial != 'undefined' && initial === true)) {
            $body.addClass('is-switching');
            $body.addClass('is-article-visible');
            $main_articles.removeClass('active');
            $overlay.removeClass('active');

            $header.hide();
            $footer.hide();

            $main.show();
            $article.show();

            $article.addClass('active');
            locked = false;

            setTimeout(function() {
                $body.removeClass('is-switching');
            }, (initial ? 1000 : 0));
            return;
        }

        // Lock and swap.
        locked = true;

        if ($body.hasClass('is-article-visible')) {
            var $current = $main_articles.filter('.active').add($overlay.filter('.active'));
            $current.removeClass('active');
            setTimeout(function() {
                $current.hide();
                $article.show();
                setTimeout(function() {
                    $article.addClass('active');
                    $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                    setTimeout(function() {
                        locked = false;
                    }, delay);
                }, 25);
            }, delay);
        } else {
            $body.addClass('is-article-visible');
            setTimeout(function() {
                $header.hide();
                $footer.hide();
                $main.show();
                $article.show();
                setTimeout(function() {
                    $article.addClass('active');
                    $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                    setTimeout(function() {
                        locked = false;
                    }, delay);
                }, 25);
            }, delay);
        }
    }

    // Hide article or overlay
    function hideArticleOrOverlay(addState) {
        var $article = $main_articles.filter('.active');
        var $activeOverlay = $overlay.filter('.active');

        if (!$body.hasClass('is-article-visible')) return;

        if (typeof addState != 'undefined' && addState === true) history.pushState(null, null, '#');

        if (locked) {
            $body.addClass('is-switching');
            $article.removeClass('active');
            $activeOverlay.removeClass('active');

            $article.hide();
            $activeOverlay.hide();
            $main.hide();

            $footer.show();
            $header.show();

            $body.removeClass('is-article-visible');
            locked = false;
            $body.removeClass('is-switching');
            $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
            return;
        }

        locked = true;

        $article.removeClass('active');
        $activeOverlay.removeClass('active');

        setTimeout(function() {
            $article.hide();
            $activeOverlay.hide();
            $main.hide();

            $footer.show();
            $header.show();

            setTimeout(function() {
                $body.removeClass('is-article-visible');
                $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                setTimeout(function() {
                    locked = false;
                }, delay);
            }, 25);
        }, delay);
    }

    // **Handle Escape Key for Both Article & Overlay**
    $window.on('keyup', function(event) {
        var overlay = document.querySelector(".image-overlay.active");

        // If the overlay is active and Escape is pressed, close the overlay.
        if (overlay && event.key === "Escape") {
            event.stopImmediatePropagation();
            event.preventDefault();
            $overlay.removeClass('active');
            return false;
        }

        // If the overlay is NOT active and Escape is pressed, close the article.
        if ($body.hasClass('is-article-visible') && !overlay && event.key === "Escape") {
            event.stopImmediatePropagation();
            event.preventDefault();
            hideArticleOrOverlay(true);
            return false;
        }
    });

    // Clicking outside article or overlay to close them.
    $body.on('click', function(event) {
        // Close article if clicked outside of article and overlay is not active.
        if ($body.hasClass('is-article-visible') && !$(event.target).closest('article').length && !$(event.target).closest('.image-overlay').length) {
            hideArticleOrOverlay(true);
        }
    });

    // Handle hash change for navigation
    $window.on('hashchange', function(event) {
        if (location.hash == '' || location.hash == '#') {
            event.preventDefault();
            event.stopPropagation();
            hideArticleOrOverlay();
        } else if ($main_articles.filter(location.hash).length > 0) {
            event.preventDefault();
            event.stopPropagation();
            showArticleOrOverlay(location.hash.substr(1));
        } else if (location.hash === '#overlay') {
            event.preventDefault();
            event.stopPropagation();
            showArticleOrOverlay('overlay');
        }
    });

    // Scroll restoration to prevent page jump on hashchange.
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    } else {
        var oldScrollPos = 0,
            scrollPos = 0,
            $htmlbody = $('html,body');

        $window.on('scroll', function() {
            oldScrollPos = scrollPos;
            scrollPos = $htmlbody.scrollTop();
        }).on('hashchange', function() {
            $window.scrollTop(oldScrollPos);
        });
    }

    // Initialize
    $main.hide();
    $overlay.hide(); // Hide overlay initially.

})(jQuery);
