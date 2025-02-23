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
        xlarge: [ '1281px',  '1680px' ],
        large: [ '981px', '1280px' ],
        medium: [ '737px', '980px' ],
        small: [ '481px', '736px' ],
        xsmall: [ '361px', '480px' ],
        xxsmall: [ null, '360px' ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Fix: Flexbox min-height bug on IE.
    if (browser.name == 'ie') {
        var flexboxFixTimeoutId;
        $window.on('resize.flexbox-fix', function() {
            clearTimeout(flexboxFixTimeoutId);
            flexboxFixTimeoutId = setTimeout(function() {
                if ($wrapper.prop('scrollHeight') > $window.height())
                    $wrapper.css('height', 'auto');
                else
                    $wrapper.css('height', '100vh');
            }, 250);
        }).triggerHandler('resize.flexbox-fix');
    }

    // Main.
    var delay = 325,
        locked = false;

    // Methods.
    $main._show = function(id, initial) {

        var $article = $main_articles.filter('#' + id);
        
        // If the overlay is triggered, treat it as an article.
        if (id === 'overlay') {
            $article = $overlay;
        }

        // No such article or overlay? Bail.
        if ($article.length == 0)
            return;

        // Handle lock.
        if (locked || (typeof initial != 'undefined' && initial === true)) {

            // Mark as switching.
            $body.addClass('is-switching');

            // Mark as visible.
            $body.addClass('is-article-visible');

            // Deactivate all articles (just in case one's already active).
            $main_articles.removeClass('active');
            $overlay.removeClass('active');  // Remove active from overlay if previously active.

            // Hide header, footer.
            $header.hide();
            $footer.hide();

            // Show main, article/overlay.
            $main.show();
            $article.show();

            // Activate article.
            $article.addClass('active');

            // Unlock.
            locked = false;

            // Unmark as switching.
            setTimeout(function() {
                $body.removeClass('is-switching');
            }, (initial ? 1000 : 0));

            return;

        }

        // Lock.
        locked = true;

        // Article or overlay already visible? Just swap.
        if ($body.hasClass('is-article-visible')) {

            // Deactivate current article/overlay.
            var $current = $main_articles.filter('.active').add($overlay.filter('.active'));
            $current.removeClass('active');

            // Show the new article/overlay.
            setTimeout(function() {

                // Hide current article/overlay.
                $current.hide();

                // Show new article/overlay.
                $article.show();

                // Activate new article/overlay.
                setTimeout(function() {

                    $article.addClass('active');

                    // Window stuff.
                    $window
                        .scrollTop(0)
                        .triggerHandler('resize.flexbox-fix');

                    // Unlock.
                    setTimeout(function() {
                        locked = false;
                    }, delay);

                }, 25);

            }, delay);

        }

        // Otherwise, handle as normal.
        else {

            // Mark as visible.
            $body.addClass('is-article-visible');

            // Show article/overlay.
            setTimeout(function() {

                // Hide header, footer.
                $header.hide();
                $footer.hide();

                // Show main, article/overlay.
                $main.show();
                $article.show();

                // Activate article/overlay.
                setTimeout(function() {

                    $article.addClass('active');

                    // Window stuff.
                    $window
                        .scrollTop(0)
                        .triggerHandler('resize.flexbox-fix');

                    // Unlock.
                    setTimeout(function() {
                        locked = false;
                    }, delay);

                }, 25);

            }, delay);

        }

    };

    $main._hide = function(addState) {

        var $article = $main_articles.filter('.active');
        var $activeOverlay = $overlay.filter('.active');  // Check for active overlay

        // Article or overlay not visible? Bail.
        if (!$body.hasClass('is-article-visible'))
            return;

        // Add state?
        if (typeof addState != 'undefined' && addState === true)
            history.pushState(null, null, '#');

        // Handle lock.
        if (locked) {

            // Mark as switching.
            $body.addClass('is-switching');

            // Deactivate article/overlay.
            $article.removeClass('active');
            $activeOverlay.removeClass('active');

            // Hide article/overlay, main.
            $article.hide();
            $activeOverlay.hide();
            $main.hide();

            // Show footer, header.
            $footer.show();
            $header.show();

            // Unmark as visible.
            $body.removeClass('is-article-visible');

            // Unlock.
            locked = false;

            // Unmark as switching.
            $body.removeClass('is-switching');

            // Window stuff.
            $window
                .scrollTop(0)
                .triggerHandler('resize.flexbox-fix');

            return;

        }

        // Lock.
        locked = true;

        // Deactivate article/overlay.
        $article.removeClass('active');
        $activeOverlay.removeClass('active');

        // Hide article/overlay.
        setTimeout(function() {

            // Hide article/overlay, main.
            $article.hide();
            $activeOverlay.hide();
            $main.hide();

            // Show footer, header.
            $footer.show();
            $header.show();

            // Unmark as visible.
            setTimeout(function() {

                $body.removeClass('is-article-visible');

                // Window stuff.
                $window
                    .scrollTop(0)
                    .triggerHandler('resize.flexbox-fix');

                // Unlock.
                setTimeout(function() {
                    locked = false;
                }, delay);

            }, 25);

        }, delay);

    };

    // Articles and overlay.
    $main_articles.each(function() {

        var $this = $(this);

        // Close button.
        $('<div class="close">Close</div>')
            .appendTo($this)
            .on('click', function() {
                location.hash = '';
            });

        // Prevent clicks from inside article from bubbling.
        $this.on('click', function(event) {
            event.stopPropagation();
        });

    });

    // **Handle Escape Key for Both Article & Overlay**
    $window.on('keyup', function(event) {

        const overlay = document.querySelector(".image-overlay.active");

        // If the overlay is active and Escape is pressed, close the overlay.
        if (overlay && event.key === "Escape") {
            console.log("ESCAPE PRESSED - Closing Overlay");

            // Stop propagation and prevent the default action
            event.stopImmediatePropagation();
            event.preventDefault();

            // Close the overlay
            $overlay.removeClass('active');

            // Return false to guarantee no other action will occur
            return false;
        }

        // If the overlay is NOT active, handle the article Escape functionality.
        if (!$body.hasClass('is-article-visible') && !overlay && event.key === "Escape") {
            console.log("ESCAPE PRESSED - Closing Article");

            // Stop the event propagation and prevent any default actions
            event.stopImmediatePropagation();
            event.preventDefault();

            // Close the article
            $main._hide(true);

            return false;
        }

    });

    $window.on('hashchange', function(event) {

        // Empty hash?
        if (location.hash == '' || location.hash == '#') {

            // Prevent default.
            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $main._hide();

        }

        // Otherwise, check for a matching article.
        else if ($main_articles.filter(location.hash).length > 0) {

            // Prevent default.
            event.preventDefault();
            event.stopPropagation();

            // Show article.
            $main._show(location.hash.substr(1));

        } else if (location.hash === '#overlay') {

            // Show overlay if hash matches.
            event.preventDefault();
            event.stopPropagation();
            $main._show('overlay');

        }

    });

    // Scroll restoration.
    if ('scrollRestoration' in history)
        history.scrollRestoration = 'manual';
    else {

        var oldScrollPos = 0,
            scrollPos = 0,
            $htmlbody = $('html,body');

        $window
            .on('scroll', function() {

                oldScrollPos = scrollPos;
                scrollPos = $htmlbody.scrollTop();

            })
            .on('hashchange', function() {
                $window.scrollTop(oldScrollPos);
            });

    }

    // Initialize.
    $main.hide();
    $overlay.hide();  // Hide overlay initially.

})(jQuery);
