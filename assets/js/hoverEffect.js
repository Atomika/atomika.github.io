document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll('.work-gallery img'); // Select all images in the gallery

    images.forEach(img => {
        img.addEventListener('mouseenter', function () {
            // On hover, blur all other images
            images.forEach(otherImg => {
                if (otherImg !== img) {
                    otherImg.style.filter = "brightness(75%) grayscale(50%) blur(3px)"; // Apply blur to non-hovered images
                }
            });
        });

        img.addEventListener('mouseleave', function () {
            // Remove blur from all images when hover ends
            images.forEach(otherImg => {
                otherImg.style.filter = "brightness(75%) grayscale(50%)"; // Restore default brightness and grayscale
            });
        });
    });
});
