document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
        ];

        function changeBackground() {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            const selectedBg = backgrounds[randomIndex];

            // Fade out before changing the background
            bgElement.style.opacity = "0";

            setTimeout(() => {
                // Change the background image
                bgElement.style.backgroundImage = `url('${selectedBg}')`;

                // Fade it back in
                bgElement.style.animation = "fadeIn 1.5s ease-in-out forwards";
                console.log("Background set to:", selectedBg);
            }, 500); // Small delay before changing the background
        }

        // Initial background change on page load
        changeBackground();
    } else {
        console.log("Error: #bg element not found!");
    }
});
