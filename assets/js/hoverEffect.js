document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img');
    let isArticleVisible = false;
    let hoverEffectEnabled = false;
    let initialHoveredImage = null;
    
    // Function to apply hover effect to an image
    function applyHoverEffect(targetImg) {
        if (isArticleVisible) {
            images.forEach(otherImg => {
                if (otherImg !== targetImg) {
                    otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
                }
            });
            targetImg.style.filter = "brightness(100%) grayscale(0%)";
            targetImg.style.transform = "scale(1.1)";
            targetImg.style.zIndex = "2";
        }
    }

    // Function to reset all images
    function resetImages() {
        images.forEach(img => {
            img.style.filter = "brightness(85%) grayscale(0%)";
            img.style.transform = "scale(1)";
            img.style.zIndex = "1";
        });
    }

    // Function to check if mouse is over an image
    function checkInitialHover(e) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element && element.matches('.work-gallery img')) {
            initialHoveredImage = element;
            return true;
        }
        return false;
    }

    // Track mouse position
    let lastKnownMouseEvent = null;
    document.addEventListener('mousemove', (e) => {
        lastKnownMouseEvent = e;
    });

    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false;
                    resetImages();
                    
                    // If we have a mouse position, check for hover immediately
                    if (lastKnownMouseEvent) {
                        if (checkInitialHover(lastKnownMouseEvent)) {
                            // Apply initial effect immediately
                            applyHoverEffect(initialHoveredImage);
                        }
                    }
                    
                    // Enable hover effects after delay
                    setTimeout(() => {
                        hoverEffectEnabled = true;
                    }, 625);
                } else {
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    initialHoveredImage = null;
                    resetImages();
                }
            }
        }
    });

    observer.observe(body, { attributes: true });

    images.forEach(img => {
        img.addEventListener("mouseenter", function () {
            if (hoverEffectEnabled) {
                initialHoveredImage = null;
                applyHoverEffect(img);
            }
        });

        img.addEventListener("mouseleave", function () {
            if (hoverEffectEnabled) {
                initialHoveredImage = null;
                resetImages();
            }
        });
    });
});