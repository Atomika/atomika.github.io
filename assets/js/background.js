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

        // Listen for article navigation (clicking a new article)
        const articleLinks = document.querySelectorAll("article a"); // Assuming articles have links

        articleLinks.forEach(link => {
            link.addEventListener("click", function () {
                setTimeout(changeBackground, 500); // Small delay to ensure background changes after article is shown
            });
        });
    } else {
        console.log("Error: #bg element not found!");
    }
});
