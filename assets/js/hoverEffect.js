document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery

    images.forEach(img => {
        // On hover, blur all other images
        img.addEventListener('mouseenter', function () {
            images.forEach(otherImg => {
                if (otherImg !== img) {
                    otherImg.style.filter = "brightness(65%) grayscale(75%) blur(2px)"; // Apply blur to non-hovered images
                }
            });
            // Ensure hovered image has full brightness and saturation
            img.style.filter = "brightness(100%) grayscale(0%)"; // Full color and brightness
            img.style.transform = "scale(1.1)"; // Slight zoom effect
            img.style.zIndex = "2"; // Ensure hovered image is above others
        });

        // On mouse leave, reset all images
        img.addEventListener('mouseleave', function () {
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(75%) grayscale(50%)"; // Restore default brightness and grayscale
                otherImg.style.transform = "scale(1)"; // Reset zoom effect
                otherImg.style.zIndex = "1"; // Reset stacking order
            });
        });
    });
});
