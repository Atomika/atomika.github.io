document.addEventListener("DOMContentLoaded", function () {
    console.log("Background script loaded!");

    const workBackground = "images/pic02.jpg";

    function changeBackground() {
        setTimeout(() => { // Delay to ensure it overrides other scripts
            let bgElement = document.getElementById("bg");
            if (bgElement) {
                console.log("Forcing background change to:", workBackground);
                bgElement.style.setProperty("background-image", `url('${workBackground}')`, "important");
            } else {
                console.log("Error: #bg element not found!");
            }
        }, 500); // Wait 0.5s to ensure override
    }

    // MutationObserver to detect when "Work" becomes active
    const observer = new MutationObserver(changeBackground);
    observer.observe(document.getElementById("wrapper"), { childList: true, subtree: true });

    console.log("Observer setup complete.");
});