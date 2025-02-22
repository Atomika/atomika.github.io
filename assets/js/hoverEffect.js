document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery

    images.forEach(img => {
        let timeout;

        // On hover, blur all other images after a delay
        img.addEventListener('mouseenter', function () {
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
            }, 300); // 300ms delay before applying hover effect
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
});
