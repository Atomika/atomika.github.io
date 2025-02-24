document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img');
    let isArticleVisible = false;
    let hoverEffectEnabled = false;
    let initialHoveredImage = null;  // Store the initially hovered image
    
    // Function to apply hover effect to an image
    function applyHoverEffect(targetImg) {
        if (hoverEffectEnabled && isArticleVisible) {
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
    function checkInitialHover() {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                initialHoveredImage = img;  // Store the hovered image
                return;
            }
        });
    }

    const body = document.body;
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === "attributes") {
                if (body.classList.contains("is-article-visible")) {
                    isArticleVisible = true;
                    hoverEffectEnabled = false;
                    resetImages();
                    
                    // Check for initial hover immediately
                    checkInitialHover();
                    
                    // Apply the delay before enabling hover effects
                    setTimeout(() => {
                        hoverEffectEnabled = true;
                        // Apply hover effect to initially hovered image if exists
                        if (initialHoveredImage) {
                            applyHoverEffect(initialHoveredImage);
                        }
                    }, 625);
                } else {
                    isArticleVisible = false;
                    hoverEffectEnabled = false;
                    initialHoveredImage = null;  // Reset the stored image
                    resetImages();
                }
            }
        }
    });

    observer.observe(body, { attributes: true });

    images.forEach(img => {
        img.addEventListener("mouseenter", function () {
            if (hoverEffectEnabled) {  // Only apply new hovers after delay
                initialHoveredImage = null;  // Clear stored image on new hover
                applyHoverEffect(img);
            }
        });

        img.addEventListener("mouseleave", function () {
            if (hoverEffectEnabled) {  // Only handle mouse leave after delay
                initialHoveredImage = null;  // Clear stored image
                resetImages();
            }
        });
    });
});