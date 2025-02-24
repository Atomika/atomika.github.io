document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let isArticleVisible = false; // Flag to track if the article is visible
    let hoverEffectEnabled = false; // Flag to control when hover effects activate
    let firstHoverTimeout; // Timeout for the stationary or first hover case

    // Monitor visibility of the article
    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false; // Reset hover effect flag

                    // Check for an existing hover state when article becomes visible
                    images.forEach(img => {
                        if (isElementUnderMouse(img) && !firstHoverTimeout) {
                            // Stationary mouse case: Apply 825ms delay immediately
                            firstHoverTimeout = setTimeout(() => {
                                applyHoverEffect(img);
                                hoverEffectEnabled = true; // Enable instant hovers after this
                                firstHoverTimeout = null;
                            }, 825);
                        }
                    });

                    // Enable hover effects after 625ms for non-stationary case
                    if (!firstHoverTimeout) {
                        setTimeout(() => {
                            hoverEffectEnabled = true; // Enable hover effects after 625ms
                        }, 625);
                    }
                } else {
                    // Article is not visible, reset the effect
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    clearTimeout(firstHoverTimeout);
                    firstHoverTimeout = null;
                    images.forEach(img => {
                        img.style.filter = "brightness(85%) grayscale(0%)"; // Reset filter
                        img.style.transform = "scale(1)"; // Reset zoom
                        img.style.zIndex = "1"; // Reset stacking order
                    });
                }
            }
        }
    });

    // Observe changes in the class list of the body
    observer.observe(body, { attributes: true });

    images.forEach(img => {
        img.addEventListener("mouseenter", function () {
            if (isArticleVisible) {
                if (!hoverEffectEnabled && !firstHoverTimeout) {
                    // First hover case (if not stationary): Apply 825ms delay
                    firstHoverTimeout = setTimeout(() => {
                        applyHoverEffect(img);
                        hoverEffectEnabled = true; // Enable instant hovers after this
                        firstHoverTimeout = null;
                    }, 825);
                } else if (hoverEffectEnabled) {
                    // Normal case: Apply hover effect immediately
                    applyHoverEffect(img);
                }
            }
        });

        img.addEventListener("mouseleave", function () {
            // Reset styles without clearing firstHoverTimeout
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(85%) grayscale(0%)"; // Restore default
                otherImg.style.transform = "scale(1)"; // Reset zoom
                otherImg.style.zIndex = "1"; // Reset stacking order
            });
        });
    });

    // Helper function to apply hover effect
    function applyHoverEffect(hoveredImg) {
        images.forEach(otherImg => {
            if (otherImg !== hoveredImg) {
                otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)"; // Blur non-hovered
            }
        });
        hoveredImg.style.filter = "brightness(100%) grayscale(0%)"; // Full color and brightness
        hoveredImg.style.transform = "scale(1.1)"; // Slight zoom
        hoveredImg.style.zIndex = "2"; // Ensure hovered image is above others
    }

    // Helper function to check if an element is under the mouse
    function isElementUnderMouse(element) {
        const rect = element.getBoundingClientRect();
        const mouseX = window.lastMouseX || 0;
        const mouseY = window.lastMouseY || 0;
        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    }

    // Track mouse position for stationary check
    document.addEventListener("mousemove", function (e) {
        window.lastMouseX = e.clientX;
        window.lastMouseY = e.clientY;
    });
});