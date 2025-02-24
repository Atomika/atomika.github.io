document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let isArticleVisible = false; // Flag to track if the article is visible
    let hoverEffectEnabled = false; // Flag to control when hover effects activate
    let hasMouseMoved = false; // Flag to track if the user has moved the mouse
    let firstHoverTimeout; // Timeout for the conditional first-hover delay

    // Detect if the user has moved the mouse at all
    document.addEventListener("mousemove", function () {
        hasMouseMoved = true; // Set flag on first mouse movement
    }, { once: true }); // Only listen once to avoid overhead

    // Monitor visibility of the article
    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false; // Reset hover effect flag

                    // Apply the delay before enabling instant hover effects
                    setTimeout(() => {
                        hoverEffectEnabled = true; // Enable hover effects after 625ms
                    }, 625);
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
                if (!hasMouseMoved && !firstHoverTimeout) {
                    // Special case: First hover (including stationary mouse), apply delay
                    firstHoverTimeout = setTimeout(() => {
                        applyHoverEffect(img);
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
});