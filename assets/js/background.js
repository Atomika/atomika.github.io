document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
        ];

        let lastBackgroundIndex = -1; // Variable to track the last selected background

        // Function to change the background with a cross-fade effect
        function changeBackground() {
            let randomIndex;

            // Ensure the new background is different from the last one
            do {
                randomIndex = Math.floor(Math.random() * backgrounds.length);
            } while (randomIndex === lastBackgroundIndex); // Loop until a different image is selected

            const selectedBg = backgrounds[randomIndex];

            // Apply fade effect using opacity and background transition
            bgElement.style.opacity = 0;  // Start by fading out the current background

            // Trigger reflow to reset the background
            bgElement.offsetHeight; // Trigger reflow

            // Change the background image (with a smooth fade)
            bgElement.style.backgroundImage = `url('${selectedBg}')`;

            // Reapply the fade-in effect after a slight delay
            setTimeout(() => {
                bgElement.style.transition = "opacity 1.5s ease-in-out";  // Smooth opacity transition
                bgElement.style.opacity = 1;  // Fade in the new background
            }, 50);  // Short delay to apply the transition after setting the new image

            // Update the last background index
            lastBackgroundIndex = randomIndex;

            console.log("Background set to:", selectedBg);
        }

        // Initial background change on page load
        changeBackground();

        // Listen for clicks on article links (if they exist)
        const articleLinks = document.querySelectorAll("article a");

        articleLinks.forEach(link => {
            link.addEventListener("click", function () {
                setTimeout(changeBackground, 500); // Slight delay after clicking an article link
            });
        });

        // Listen for hash changes in the URL (for internal navigation)
        window.addEventListener("hashchange", function () {
            setTimeout(changeBackground, 500); // Change background when navigating between articles via anchor links
        });

        // Trigger the background change when an article is selected from the main page (hash in the URL)
        if (window.location.hash) {
            setTimeout(changeBackground, 500); // Ensures background is updated on initial page load if there's a hash
        }
    } else {
        console.log("Error: #bg element not found!");
    }
});
