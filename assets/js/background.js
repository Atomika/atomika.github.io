document.addEventListener("DOMContentLoaded", function () {
    const bgElement = document.getElementById("bg");

    if (bgElement) {
        // Define an array of background image paths
        const backgrounds = [
            "images/bg.jpg",
            "images/bg2.jpg",
            "images/pic02.jpg"
        ];

        // Select a random image from the array
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        const selectedBg = backgrounds[randomIndex];

        // Set the background image
        bgElement.style.backgroundImage = `url('${selectedBg}')`;
        console.log("Background set to:", selectedBg);
    } else {
        console.log("Error: #bg element not found!");
    }
});