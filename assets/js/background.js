document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");
    const footerText = document.getElementById("footer-text"); // Get the footer element for text updates

    if (bgElement) {
        const backgrounds = [
            { src: "images/bg.jpg", description: "A scenic mountain view at sunrise." },
            // { src: "images/bg2.jpg", description: "A peaceful forest pathway in autumn." },
            // { src: "images/pic02.jpg", description: "A misty lake surrounded by tall trees." },
            // { src: "images/pic05.jpg", description: "Rolling hills under a golden sunset." },
            { src: "images/pic06.jpg", description: "A futuristic city glowing at night." },
            { src: "images/pic07.jpg", description: "A quiet snowy village in the mountains." },
            { src: "images/pic08.jpg", description: "A tropical beach with crystal clear waters." },
            { src: "images/pic09.jpg", description: "A starry sky over a desert landscape." },
            { src: "images/pic10.jpg", description: "A historic castle surrounded by fog." },
            { src: "images/pic11.jpg", description: "A dramatic waterfall in the jungle." },
            { src: "images/pic12.jpg", description: "A deep space nebula with vibrant colors." },
            { src: "images/pic13.jpg", description: "An abandoned city overtaken by nature." },
            { src: "images/pic14.jpg", description: "A vast wheat field swaying in the wind." },
            { src: "images/pic15.jpg", description: "A neon cyberpunk street scene at midnight." },
            { src: "images/pic04.jpg", description: "A lighthouse standing strong in a storm." }
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
            bgElement.style.transition = "opacity 10s cubic-bezier(0.25, 0.8, 0.25, 1)"; // Slow start, fast end
            bgElement.style.opacity = "0"; // Start with opacity 0

            setTimeout(() => {
                // Change the background image after a small delay
                bgElement.style.backgroundImage = `url('${selectedBg.src}')`;

                // Apply opacity transition immediately
                bgElement.style.opacity = "1"; // Fade the background in

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
    } else {
        console.log("Error: #bg element not found!");
    }
});
