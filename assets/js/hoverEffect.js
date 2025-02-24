document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let isArticleVisible = false; // Flag to track if the article is visible
    let hoverEffectEnabled = false; // Flag to control when hover effects activate
    let firstHoverDone = false; // Flag to track if the first hover has occurred
    let firstHoverTimeout; // Timeout for the first-hover delay

    // Monitor visibility of the article
    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false; // Reset hover effect flag
                    firstHoverDone = false; // Reset first hover flag

                    // Apply the delay before enabling instant hover effects
                    setTimeout(() => {
                        hoverEffectEnabled = true; // Enable hover effects after 625ms
                    }, 625);

                    // Check for an existing hover state when article becomes visible
                    images.forEach(img => {
                        if (isElementUnderMouse(img) && !firstHoverDone) {
                            firstHoverTimeout = setTimeout(() => {
                                applyHoverEffect(img);
                                firstHoverDone = true;
                                hoverEffectEnabled = true; // Enable instant hovers after this
                            }, 825);
                        }
                    });
                } else {
                    // Article is not visible, reset the effect
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    firstHoverDone = false;
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
                if (!firstHoverDone) {
                    // First hover (including stationary mouse), apply delay
                    firstHoverTimeout = setTimeout(() => {
                        applyHoverEffect(img);
                        firstHoverDone = true;
                        hoverEffectEnabled = true; // Enable instant hovers after this
                    }, 825); // 825ms delay like the first implementation
                } else if (hoverEffectEnabled) {
                    // Normal case: Apply hover effect immediately
                    applyHoverEffect(img);
                }
            }
        });

        img.addEventListener("mouseleave", function () {
            clearTimeout(firstHoverTimeout); // Clear timeout if mouse leaves early
            firstHoverTimeout = null;
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