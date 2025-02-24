document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let isArticleVisible = false; // Track if the article is visible
    let hoverEffectEnabled = false; // Control when hover effects activate

    // Function to apply hover effect if cursor is already on an image
    function applyHoverEffectIfNeeded() {
        const hoveredImg = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2); // Detect element at center of screen
        if (hoveredImg && hoveredImg.tagName === "IMG" && hoveredImg.closest(".work-gallery")) {
            images.forEach(otherImg => {
                if (otherImg !== hoveredImg) {
                    otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
                }
            });
            hoveredImg.style.filter = "brightness(100%) grayscale(0%)";
            hoveredImg.style.transform = "scale(1.1)";
            hoveredImg.style.zIndex = "2";
        }
    }

    // Monitor article visibility to enable hover effects
    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false; // Reset hover effect flag

                    // Check for hover effect **before** the delay
                    applyHoverEffectIfNeeded();

                    // Enable hover effects after a short delay
                    setTimeout(() => {
                        hoverEffectEnabled = true;
                    }, 625);
                } else {
                    // Reset when article is hidden
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    images.forEach(img => {
                        img.style.filter = "brightness(85%) grayscale(0%)"; // Reset filter
                        img.style.transform = "scale(1)"; // Reset zoom effect
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
            if (hoverEffectEnabled && isArticleVisible) {
                images.forEach(otherImg => {
                    if (otherImg !== img) {
                        otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
                    }
                });
                img.style.filter = "brightness(100%) grayscale(0%)";
                img.style.transform = "scale(1.1)";
                img.style.zIndex = "2";
            }
        });

        img.addEventListener("mouseleave", function () {
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(85%) grayscale(0%)";
                otherImg.style.transform = "scale(1)";
                otherImg.style.zIndex = "1";
            });
        });
    });
});
