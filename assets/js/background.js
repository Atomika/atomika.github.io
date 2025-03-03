document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");
    const footerText = document.getElementById("footer-text");
    const body = document.body;

    if (bgElement) {
        const backgrounds = [
            { src: "images/bg.jpg", description: "Guardians of the Galaxy (2014)" },
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

        let lastBackgrounds = JSON.parse(sessionStorage.getItem("lastBgIndexes")) || [];

        // Preload image function from Implementation 2
        function preloadImage(url, callback) {
            const img = new Image();
            img.src = url;
            img.onload = callback;
        }

        function changeBackground() {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * backgrounds.length);
            } while (lastBackgrounds.includes(randomIndex) && backgrounds.length > 3);

            const selectedBg = backgrounds[randomIndex];

            // Preload the image before applying it
            preloadImage(selectedBg.src, () => {
                // Match Implementation 1's animation exactly
                bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.5s ease";
                bgElement.style.opacity = "0"; // Start with opacity 0
                bgElement.style.filter = "blur(0.2rem)"; // Start with slight blur

                setTimeout(() => {
                    // Change background and apply fade-in after 500ms delay (Implementation 1)
                    bgElement.style.backgroundImage = `url('${selectedBg.src}')`;
                    bgElement.style.opacity = "1";
                    bgElement.style.filter = "blur(0)";

                    console.log("Background set to:", selectedBg.src);

                    // Update footer text
                    if (footerText) {
                        footerText.textContent = selectedBg.description;
                    }

                    // Store the new background index
                    lastBackgrounds.push(randomIndex);
                    if (lastBackgrounds.length > 5) {
                        lastBackgrounds.shift(); // Keep only the last 5 backgrounds
                    }
                    sessionStorage.setItem("lastBgIndexes", JSON.stringify(lastBackgrounds));
                }, 500); // Exact 500ms delay from Implementation 1
            });
        }

        // Wait for preload to finish (Implementation 2)
        function waitForPreloadAndRun() {
            if (!body.classList.contains("is-preload")) {
                changeBackground();
            } else {
                const preloadObserver = new MutationObserver(() => {
                    if (!body.classList.contains("is-preload")) {
                        preloadObserver.disconnect();
                        changeBackground();
                    }
                });
                preloadObserver.observe(body, { attributes: true });
            }
        }

        // Initial background change
        waitForPreloadAndRun();

        // Monitor article visibility for blur effect (Implementation 1)
        const observer = new MutationObserver(function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes") {
                    if (body.classList.contains("is-article-visible")) {
                        // Apply background blur when article is visible
                        bgElement.style.transition = "filter 0.5s ease";
                        bgElement.style.filter = "blur(0.15rem)";
                    } else {
                        // Remove blur when article is not visible
                        bgElement.style.transition = "filter 0.5s ease";
                        bgElement.style.filter = "none";
                    }
                }
            }
        });

        // Observe class changes on body for article visibility
        observer.observe(body, { attributes: true });
    } else {
        console.log("Error: #bg element not found!");
    }
});