document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            // "images/bg2.jpg",
            "images/pic02.jpg",
            "images/pic05.jpg",
            "images/pic06.jpg",
            "images/pic07.jpg",
            "images/pic08.jpg",
            "images/pic09.jpg",
            "images/pic04.jpg"
        ];

        // Store the last used background in session storage to avoid repetition
        let lastBackgroundIndex = sessionStorage.getItem("lastBgIndex");

        function changeBackground() {
            let randomIndex;

            // Ensure a different background from last time
            do {
                randomIndex = Math.floor(Math.random() * backgrounds.length);
            } while (randomIndex == lastBackgroundIndex);

            const selectedBg = backgrounds[randomIndex];

            // Start by fading in the background immediately with a slow start and fast end
            bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1)"; // Slow start, fast end
            bgElement.style.opacity = "0"; // Start with opacity 0

            setTimeout(() => {
                // Change the background image after a small delay
                bgElement.style.backgroundImage = `url('${selectedBg}')`;

                // Apply opacity transition immediately
                bgElement.style.opacity = "1"; // Fade the background in

                console.log("Background set to:", selectedBg);

                // Save the new background index to session storage
                sessionStorage.setItem("lastBgIndex", randomIndex);
            }, 500); // Small delay before the background is changed
        }

        // Initial background change on page load
        changeBackground();
    } else {
        console.log("Error: #bg element not found!");
    }
});
