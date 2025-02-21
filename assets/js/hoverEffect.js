document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery

    images.forEach(img => {
        // When mouse enters an image
        img.addEventListener('mouseenter', function () {
            // On hover, blur all other images
            images.forEach(otherImg => {
                if (otherImg !== img) {
                    otherImg.style.filter = "brightness(75%) grayscale(50%) blur(3px)"; // Apply blur to non-hovered images
                }
            });

            // Ensure hovered image has full brightness and saturation, and is zoomed
            img.style.filter = "brightness(100%) grayscale(0%)"; // Full color and brightness
            img.style.transform = "scale(1.05)"; // Slight zoom effect
            img.style.zIndex = "2"; // Ensure hovered image is above others
        });

        // When mouse leaves an image
        img.addEventListener('mouseleave', function () {
            // Reset the effect when mouse leaves the image
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(75%) grayscale(50%)"; // Restore default brightness and grayscale
                otherImg.style.transform = "scale(1)"; // Reset zoom effect
                otherImg.style.zIndex = "1"; // Reset stacking order
            });
        });
    });
});
