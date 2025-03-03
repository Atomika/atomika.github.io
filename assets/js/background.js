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

        // Preload image function
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

            // Preload the new image
            preloadImage(selectedBg.src, () => {
                // Set transition properties
                bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.5s ease";
                bgElement.style.opacity = "0"; // Start with opacity 0
                bgElement.style.filter = "blur(0.2rem)"; // Start with blur

                // Apply the new background and start fade-in after 166ms delay
                setTimeout(() => {
                    bgElement.style.backgroundImage = `url('${selectedBg.src}')`;
                    bgElement.style.opacity = "1"; // Fade in over 10s
                    bgElement.style.filter = "blur(0)"; // Remove blur over 0.5s

                    console.log("Background set to:", selectedBg.src);

                    // Update footer text
                    if (footerText) {
                        footerText.textContent = selectedBg.description;
                    }

                    // Store the new background index
                    lastBackgrounds.push(randomIndex);
                    if (lastBackgrounds.length > 5) {
                        lastBackgrounds.shift();
                    }
                    sessionStorage.setItem("lastBgIndexes", JSON.stringify(lastBackgrounds));
                }, 166); // Reduced from 500ms to 166ms (1/3 of original)
            });
        }

        // Wait for preload to finish
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

        // Monitor article visibility for blur effect
        const observer = new MutationObserver(function (mutationsList) {
            for (const mutation of mutationsList) {
                if (mutation.type === "attributes") {
                    if (body.classList.contains("is-article-visible")) {
                        bgElement.style.transition = "filter 0.5s ease";
                        bgElement.style.filter = "blur(0.15rem)";
                    } else {
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