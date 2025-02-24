document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let isArticleVisible = false; // Flag to track if the article is visible
    let hoverEffectEnabled = false; // Flag to control when hover effects activate

    // Monitor visibility of the article to apply the initial delay
    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false; // Reset hover effect flag

                    // Apply the delay before enabling hover effects
                    setTimeout(() => {
                        hoverEffectEnabled = true; // Enable hover effects after 625ms
                        applyHoverEffectIfNeeded(); // Check if cursor is on an image
                    }, 625);
                } else {
                    // Article is not visible, reset the effect
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    images.forEach(img => {
                        img.style.filter = "brightness(85%) grayscale(0%)"; // Reset filter when article is not visible
                        img.style.transform = "scale(1)"; // Reset zoom effect
                        img.style.zIndex = "1"; // Reset stacking order
                    });
                }
            }
        }
    });

    // Observe changes in the class list of the body to track visibility
    observer.observe(body, { attributes: true });

    // Function to check if cursor is already on an image and apply the effect
    function applyHoverEffectIfNeeded() {
        if (hoverEffectEnabled) {
            images.forEach(img => {
                const rect = img.getBoundingClientRect();
                const isCursorOnImage =
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom;

                if (isCursorOnImage) {
                    // Trigger hover effect
                    img.style.filter = "brightness(100%) grayscale(0%)";
                    img.style.transform = "scale(1.1)";
                    img.style.zIndex = "2";

                    // Blur all other images
                    images.forEach(otherImg => {
                        if (otherImg !== img) {
                            otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
                        }
                    });
                }
            });
        }
    }

    images.forEach(img => {
        img.addEventListener("mouseenter", function () {
            if (hoverEffectEnabled && isArticleVisible) {
                // Apply blur to non-hovered images
                images.forEach(otherImg => {
                    if (otherImg !== img) {
                        otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)"; // Apply blur to non-hovered images
                    }
                });
                // Ensure hovered image has full brightness and saturation
                img.style.filter = "brightness(100%) grayscale(0%)"; // Full color and brightness
                img.style.transform = "scale(1.1)"; // Slight zoom effect
                img.style.zIndex = "2"; // Ensure hovered image is above others
            }
        });

        // On mouse leave, reset all images
        img.addEventListener("mouseleave", function () {
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(85%) grayscale(0%)"; // Restore default brightness and grayscale
                otherImg.style.transform = "scale(1)"; // Reset zoom effect
                otherImg.style.zIndex = "1"; // Reset stacking order
            });
        });
    });
});
