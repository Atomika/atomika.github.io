document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");
    const footerText = document.getElementById("footer-text"); // Get the footer element for text updates
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
            preloadImage(selectedBg.src, () => {
                bgElement.style.backgroundImage = `url('${selectedBg.src}')`;
                bgElement.style.opacity = "0";
                bgElement.style.filter = "blur(0.2rem)";
                bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.5s ease";
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        bgElement.style.opacity = "1";
                        bgElement.style.filter = "blur(0)";
                        if (footerText) footerText.textContent = selectedBg.description;
                        lastBackgrounds.push(randomIndex);
                        if (lastBackgrounds.length > 5) lastBackgrounds.shift();
                        sessionStorage.setItem("lastBgIndexes", JSON.stringify(lastBackgrounds));
                    }, 50); // Reduce initial delay to start fade-in faster
                });
            });
        }

        function waitForPreloadAndRun() {
            if (!body.classList.contains("is-preload")) {
                changeBackground();
            } else {
                const observer = new MutationObserver(() => {
                    if (!body.classList.contains("is-preload")) {
                        observer.disconnect();
                        changeBackground();
                    }
                });
                observer.observe(body, { attributes: true });
            }
        }

        waitForPreloadAndRun();
    }
});
