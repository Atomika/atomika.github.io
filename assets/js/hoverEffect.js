document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery
    let timeout;
    let firstHoverDone = false; // Flag to track if the first hover has been done
    let isArticleVisible = false; // Flag to track if the article is visible

    images.forEach(img => {
        // On hover, blur all other images after a delay only for the first hover
        img.addEventListener('mouseenter', function () {
            if (!firstHoverDone && isArticleVisible) {
                // Apply delay only on the first hover
                timeout = setTimeout(function () {
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

                    // After the first hover, set the flag to true
                    firstHoverDone = true;
                }, 825); // 1000ms delay before applying hover effect
            } else if (isArticleVisible) {
                // Apply immediate hover effect after the first hover
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
        img.addEventListener('mouseleave', function () {
            clearTimeout(timeout); // Clear timeout if mouse leaves before the delay ends
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(85%) grayscale(0%)"; // Restore default brightness and grayscale
                otherImg.style.transform = "scale(1)"; // Reset zoom effect
                otherImg.style.zIndex = "1"; // Reset stacking order
            });
        });
    });

    // Monitor visibility of the article to apply the initial hover delay
    const body = document.body;

    // Observer to check for article visibility
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    // Article is visible, apply the delay effect
                    isArticleVisible = true;
                    firstHoverDone = false; // Reset firstHoverDone flag when returning to the article
                } else {
                    // Article is not visible, reset the effect
                    isArticleVisible = false;
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
});
