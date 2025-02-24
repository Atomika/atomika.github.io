document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img');
    let isArticleVisible = false;
    let hoverEffectEnabled = false;
    let initialTimeout;
    
    // Track initial mouse position
    let lastKnownElement = null;
    let mouseHasMoved = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseHasMoved = true;
        lastKnownElement = document.elementFromPoint(e.clientX, e.clientY);
    });

    // Function to apply hover effect to an image
    function applyHoverEffect(img) {
        if (isArticleVisible) {
            images.forEach(otherImg => {
                if (otherImg !== img) {
                    otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
                }
            });
            img.style.filter = "brightness(100%) grayscale(0%)";
            img.style.transform = "scale(1.1)";
            img.style.zIndex = "2";
        }
    }

    // Function to reset all images
    function resetImages() {
        clearTimeout(initialTimeout);
        images.forEach(img => {
            img.style.filter = "brightness(85%) grayscale(0%)";
            img.style.transform = "scale(1)";
            img.style.zIndex = "1";
        });
    }

    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false;
                    mouseHasMoved = false;
                    resetImages();

                    // Check for unmoved mouse over an image
                    if (!mouseHasMoved) {
                        const element = document.elementFromPoint(
                            event?.clientX || 0,
                            event?.clientY || 0
                        );
                        if (element && element.matches('.work-gallery img')) {
                            initialTimeout = setTimeout(() => {
                                applyHoverEffect(element);
                            }, 825);
                        }
                    }

                    // Regular hover effect enablement
                    setTimeout(() => {
                        hoverEffectEnabled = true;
                    }, 625);
                } else {
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    resetImages();
                }
            }
        }
    });

    observer.observe(body, { attributes: true });

    // Standard hover behavior
    images.forEach(img => {
        img.addEventListener("mouseenter", function () {
            if (hoverEffectEnabled && isArticleVisible) {
                clearTimeout(initialTimeout); // Clear any pending static hover
                applyHoverEffect(img);
            }
        });

        img.addEventListener("mouseleave", function () {
            resetImages();
        });
    });
});