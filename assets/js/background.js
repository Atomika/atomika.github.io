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

            // Fade out smoothly before changing the background
            bgElement.style.transition = "opacity 2s ease-in-out"; // Slower fade-out
            bgElement.style.opacity = "0";

            setTimeout(() => {
                // Change the background image
                bgElement.style.backgroundImage = `url('${selectedBg}')`;

                // Fade it back in with a longer transition
                bgElement.style.transition = "opacity 4s ease-in-out"; // Slower fade-in
                bgElement.style.opacity = "1";

                console.log("Background set to:", selectedBg);

                // Save the new background index to session storage
                sessionStorage.setItem("lastBgIndex", randomIndex);
            }, 1500); // Delay before changing the background for a smoother transition
        }

        // Initial background change on page load
        changeBackground();
    } else {
        console.log("Error: #bg element not found!");
    }
});
