document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");
    const footerText = document.getElementById("footer-text"); // Get the footer element for text updates

    if (bgElement) {
        const backgrounds = [
            { src: "images/bg.jpg", description: "Guardians of the Galaxy (2014)" },
            // { src: "images/bg2.jpg", description: "A peaceful forest pathway in autumn." },
            // { src: "images/pic02.jpg", description: "A misty lake surrounded by tall trees." },
            // { src: "images/pic05.jpg", description: "Rolling hills under a golden sunset." },
            { src: "images/pic06.jpg", description: "Loki, Season 2 - Glorious Purpose (2023)" },
            { src: "images/pic07.jpg", description: "Dark Crystal: Age of Resistance (2019)" },
            { src: "images/pic08.jpg", description: "Guardians of the Galaxy 3 (2023)" },
            { src: "images/pic09.jpg", description: "Guardians of the Galaxy 3 (2023)" },
            { src: "images/pic10.jpg", description: "Loki, Season 2 - Science/Fiction (2023)" },
            { src: "images/pic11.jpg", description: "His Dark Materials, Season 3 - The Clouded Mountain (2022)" },
            { src: "images/pic12.jpg", description: "The School for Good and Evil (2022)" },
            { src: "images/pic13.jpg", description: "The School for Good and Evil (2022)" },
            { src: "images/pic14.jpg", description: "Chernobyl - 1:23:45 (2019)" },
            { src: "images/pic15.jpg", description: "Wonder Woman (2017)" },
            { src: "images/pic04.jpg", description: "Venom (2018)" }
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
            bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.5s ease"; // Smooth opacity and filter transition
            bgElement.style.opacity = "0"; // Start with opacity 0
            bgElement.style.filter = "blur(0.2rem)"; // Start with a slight blur

            setTimeout(() => {
                // Change the background image after a small delay
                bgElement.style.backgroundImage = `url('${selectedBg.src}')`;

                // Apply opacity and remove blur smoothly
                bgElement.style.opacity = "1"; // Fade the background in
                bgElement.style.filter = "blur(0)"; // Remove the blur effect

                console.log("Background set to:", selectedBg.src);

                // Update footer text with description
                if (footerText) {
                    footerText.textContent = selectedBg.description;
                }

                // Save the new background index to session storage
                sessionStorage.setItem("lastBgIndex", randomIndex);
            }, 500); // Small delay before the background is changed
        }

        // Initial background change on page load
        changeBackground();

        // Monitor article visibility for blur effect
        const body = document.body;

        // Add event listener for article visibility
        const observer = new MutationObserver(function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes") {
                    if (body.classList.contains("is-article-visible")) {
                        // Apply background blur when article is visible
                        bgElement.style.transition = "filter 0.5s ease";
                        bgElement.style.filter = "blur(0.15rem)";
                    } else {
                        // Remove the background blur when article is not visible
                        bgElement.style.transition = "filter 0.5s ease";
                        bgElement.style.filter = "none";
                    }
                }
            }
        });

        // Configure the observer to monitor the class changes on the body
        observer.observe(body, { attributes: true });

    } else {
        console.log("Error: #bg element not found!");
    }
});
