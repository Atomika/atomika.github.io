document.addEventListener("DOMContentLoaded", function () {
    console.log("Background script loaded!"); // Debugging

    const workBackground = "images/pic02.jpg"; // Set the background image

    function changeBackground() {
        const activeArticle = document.querySelector("article.active");

        if (activeArticle) {
            console.log("Active section ID:", activeArticle.id);
        }

        if (activeArticle && activeArticle.id === "work") {
            let bgElement = document.getElementById("bg");
            if (bgElement) {
                console.log("Changing background to:", workBackground);
                bgElement.style.backgroundImage = `url('${workBackground}')`;
            } else {
                console.log("Error: #bg element not found!");
            }
        }
    }

    // Use MutationObserver to detect when "Work" becomes active
    const observer = new MutationObserver(changeBackground);
    observer.observe(document.getElementById("wrapper"), { childList: true, subtree: true });

    console.log("Observer setup complete.");
});
