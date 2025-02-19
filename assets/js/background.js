document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
        ];

        // Function to change the background
        function changeBackground() {
            const randomIndex = Math.floor(Math.random() * backgrounds.length);
            const selectedBg = backgrounds[randomIndex];

            // Change the background image
            bgElement.style.backgroundImage = `url('${selectedBg}')`;

            // Fade-in effect
            bgElement.style.animation = "fadeIn 1.5s ease-in-out forwards";
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