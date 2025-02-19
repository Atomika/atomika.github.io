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

            // Start fading out smoothly
            bgElement.style.transition = "opacity 2.5s ease-in-out"; // Slightly longer fade-out
            bgElement.style.opacity = "0.3"; // Reduce opacity but keep some visibility

            setTimeout(() => {
                // Change the background image
                bgElement.style.backgroundImage = `url('${selectedBg}')`;

                // Fade back in smoothly
                bgElement.style.transition = "opacity 3s ease-in-out"; // Slower fade-in
                bgElement.style.opacity = "1";

                console.log("Background set to:", selectedBg);

                // Save the new background index to session storage
                sessionStorage.setItem("lastBgIndex", randomIndex);
            }, 1000); // Shorter delay before changing background
        }

        // Initial background change on page load
        changeBackground();
    } else {
        console.log("Error: #bg element not found!");
    }
});
