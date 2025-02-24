document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img');
    let timeout;
    let firstHoverDone = false;
    let isArticleVisible = false;
    let initialTimeout;

    // Function to apply hover effect to an image
    function applyHoverEffect(img) {
        images.forEach(otherImg => {
            if (otherImg !== img) {
                otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)";
            }
        });
        img.style.filter = "brightness(100%) grayscale(0%)";
        img.style.transform = "scale(1.1)";
        img.style.zIndex = "2";
    }

    // Function to reset all images
    function resetImages() {
        clearTimeout(timeout);
        clearTimeout(initialTimeout);
        images.forEach(img => {
            img.style.filter = "brightness(85%) grayscale(0%)";
            img.style.transform = "scale(1)";
            img.style.zIndex = "1";
        });
    }

    // Track initial mouse position
    let lastKnownElement = null;
    document.addEventListener('mousemove', (e) => {
        lastKnownElement = document.elementFromPoint(e.clientX, e.clientY);
    });

    images.forEach(img => {
        img.addEventListener('mouseenter', function () {
            if (!firstHoverDone && isArticleVisible) {
                timeout = setTimeout(() => {
                    applyHoverEffect(img);
                    firstHoverDone = true;
                }, 825);
            } else if (isArticleVisible) {
                applyHoverEffect(img);
            }
        });

        img.addEventListener('mouseleave', function () {
            resetImages();
        });
    });

    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    firstHoverDone = false;
                    resetImages();

                    // Check if mouse is already over an image
                    if (lastKnownElement && lastKnownElement.matches('.work-gallery img')) {
                        initialTimeout = setTimeout(() => {
                            applyHoverEffect(lastKnownElement);
                            firstHoverDone = true;
                        }, 825);
                    }
                } else {
                    isArticleVisible = false;
                    resetImages();
                }
            }
        }
    });

    observer.observe(body, { attributes: true });
});