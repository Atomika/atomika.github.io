document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");
    const footerText = document.getElementById("footer-text");

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

        function preloadImage(src, callback) {
            const img = new Image();
            img.src = src;
            img.onload = () => callback(img);
        }

        function changeBackground() {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * backgrounds.length);
            } while (lastBackgrounds.includes(randomIndex) && backgrounds.length > 3);

            const selectedBg = backgrounds[randomIndex];

            // Preload next image first before changing the background
            preloadImage(selectedBg.src, function () {
                // Step 1: Fade out
                bgElement.style.transition = "opacity 2s ease-out"; // Short fade out
                bgElement.style.opacity = "0"; 

                setTimeout(() => {
                    // Step 2: Switch background only when fully faded out
                    bgElement.style.backgroundImage = `url('${selectedBg.src}')`;

                    // Step 3: Wait a moment for the browser to process before fading back in
                    setTimeout(() => {
                        bgElement.style.transition = "opacity 8s cubic-bezier(0.25, 0.8, 0.25, 1)"; // Long fade in
                        bgElement.style.opacity = "1";
                    }, 100); // Tiny delay ensures no mid-frame flashes

                    if (footerText) {
                        footerText.textContent = selectedBg.description;
                    }

                    lastBackgrounds.push(randomIndex);
                    if (lastBackgrounds.length > 5) {
                        lastBackgrounds.shift();
                    }
                    sessionStorage.setItem("lastBgIndexes", JSON.stringify(lastBackgrounds));
                }, 2000); // Background switch happens only after full fade-out
            });
        }

        // **Fix Initial Load: Preload first background before showing anything**
        let initialIndex = Math.floor(Math.random() * backgrounds.length);
        let initialBg = backgrounds[initialIndex];

        preloadImage(initialBg.src, function () {
            bgElement.style.backgroundImage = `url('${initialBg.src}')`;
            bgElement.style.opacity = "1"; // Show only after preloading
            console.log("Initial background preloaded:", initialBg.src);

            if (footerText) {
                footerText.textContent = initialBg.description;
            }

            lastBackgrounds.push(initialIndex);
            sessionStorage.setItem("lastBgIndexes", JSON.stringify(lastBackgrounds));

            setTimeout(changeBackground, 10000);
        });

        // Monitor article visibility for blur effect
        const body = document.body;
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

        observer.observe(body, { attributes: true });

    } else {
        console.log("Error: #bg element not found!");
    }
});
