document.addEventListener("DOMContentLoaded", function () {
    // Create overlay elements
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

    // Select all images inside work gallery
    const images = document.querySelectorAll(".work-gallery img");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent unwanted event bubbling

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt");

            // Set the overlay content
            overlayImage.src = imgSrc;
            overlayText.textContent = imgAlt || "Image description unavailable";

            // Show the overlay
            overlay.classList.add("active");

            // Disable site's Escape key navigation
            disableEscapeNavigation();

            // Add Escape key event listener to close overlay
            document.addEventListener("keydown", closeOnEscape, { capture: true });
        });
    });

    // Function to close the overlay
    function closeOverlay() {
        overlay.classList.remove("active");
        document.removeEventListener("keydown", closeOnEscape, { capture: true });

        // Re-enable site's Escape key navigation after closing overlay
        enableEscapeNavigation();
    }

    // Function to close overlay with Escape key while blocking site navigation
    function closeOnEscape(event) {
        if (event.key === "Escape") {
            event.stopImmediatePropagation(); // Fully blocks other Escape event listeners
            event.preventDefault(); // Prevents default Escape behavior
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

    // Function to disable site's Escape key navigation
    function disableEscapeNavigation() {
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.stopImmediatePropagation(); // Block any Escape event from reaching the site's navigation
                event.preventDefault();
            }
        }, { capture: true });
    }

    // Function to re-enable site's Escape key navigation when overlay is closed
    function enableEscapeNavigation() {
        document.removeEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.stopImmediatePropagation();
                event.preventDefault();
            }
        }, { capture: true });
    }
});
