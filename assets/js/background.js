document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
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

            // Start fade-out (but keep some visibility)
            bgElement.style.transition = "opacity 3s ease-in-out"; // Smoother fade-out
            bgElement.style.opacity = "0.4"; // Never fully disappear

            setTimeout(() => {
                // Change the background image while it's still fading out
                bgElement.style.backgroundImage = `url('${selectedBg}')`;

                // Start a slow fade-in immediately
                bgElement.style.transition = "opacity 6s ease-in-out"; // Slow, gradual fade-in
                bgElement.style.opacity = "1";

                console.log("Background set to:", selectedBg);

                // Save the new background index to session storage
                sessionStorage.setItem("lastBgIndex", randomIndex);
            }, 1000); // Shorter delay before switching background
        }

        // Initial background change on page load
        changeBackground();
    } else {
        console.log("Error: #bg element not found!");
    }
});
