document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    const overlayImage = document.createElement("img");
    overlayImage.style.maxWidth = "100%";
    overlayImage.style.borderRadius = "5px";

    const overlayText = document.createElement("p");

    // Append elements to overlay
    overlayContent.appendChild(overlayImage);
    overlayContent.appendChild(overlayText);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    let originalEscapeHandler = null; // Store site's Escape key listener

    // Select all images inside work gallery
    const images = document.querySelectorAll(".work-gallery img");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation();

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt");

            // Set the overlay content
            overlayImage.src = imgSrc;
            overlayText.textContent = imgAlt || "Image description unavailable";

            // Show the overlay
            overlay.classList.add("active");

            // Temporarily remove the site's Escape key event listener
            blockSiteEscape();
        });
    });

    // Function to close the overlay
    function closeOverlay() {
        overlay.classList.remove("active");

        // Restore the original Escape key behavior
        restoreSiteEscape();
    }

    // Function to close overlay with Escape key
    function closeOnEscape(event) {
        if (event.key === "Escape") {
            event.stopPropagation();
            event.preventDefault();
            closeOverlay();
        }
    }

    // Close overlay when clicking outside of the modal
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            event.stopPropagation();
            closeOverlay();
            event.preventDefault();
        }
    });

    // Function to temporarily remove the site's Escape key listener
    function blockSiteEscape() {
        // Get all event listeners on the document
        const listeners = getEventListeners(document);
        if (listeners.keydown) {
            listeners.keydown.forEach(listener => {
                if (listener.listener.toString().includes("Escape")) {
                    originalEscapeHandler = listener.listener;
                    document.removeEventListener("keydown", listener.listener, listener.options);
                }
            });
        }

        // Add our custom Escape key listener
        document.addEventListener("keydown", closeOnEscape, true);
    }

    // Function to restore the site's Escape key listener
    function restoreSiteEscape() {
        if (originalEscapeHandler) {
            document.addEventListener("keydown", originalEscapeHandler, true);
            originalEscapeHandler = null;
        }
        document.removeEventListener("keydown", closeOnEscape, true);
    }
});
