document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
        ];

        let lastBackgroundIndex = -1; // Variable to track the last selected background

        // Function to change the background and apply fade-in and defocus
        function changeBackground() {
            let randomIndex;

            // Ensure the new background is different from the last one
            do {
                randomIndex = Math.floor(Math.random() * backgrounds.length);
            } while (randomIndex === lastBackgroundIndex); // Loop until a different image is selected

            const selectedBg = backgrounds[randomIndex];

            // Reset opacity to trigger fade-in
            bgElement.style.opacity = 0;

            // Reset background image to force animation
            bgElement.style.backgroundImage = "none";

            // Trigger reflow to apply the background change
            bgElement.offsetHeight; // Trigger reflow

            // Change the background image
            bgElement.style.backgroundImage = `url('${selectedBg}')`;

            // Reapply fade-in animation
            bgElement.style.animation = "none";  // Reset animation
            bgElement.offsetHeight; // Trigger reflow again
            bgElement.style.animation = "fadeIn 1.5s ease-in-out forwards"; // Apply animation

            // Apply defocus (blur) effect to ensure it's visible
            const bgAfterElement = document.getElementById("bg:after");
            if (bgAfterElement) {
                bgAfterElement.style.filter = "blur(0.2rem)"; // Ensure blur is reapplied
            }

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
