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

    let siteEscapeHandlerDisabled = false; // Flag to track if we disabled the site's Escape navigation

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

            // Fully block the site's Escape navigation
            blockSiteEscape();
        });
    });

    // Function to close the overlay
    function closeOverlay() {
        overlay.classList.remove("active");

        // Re-enable the site's Escape navigation
        restoreSiteEscape();
    }

    // Function to close overlay with Escape key
    function closeOnEscape(event) {
        if (event.key === "Escape") {
            event.stopImmediatePropagation(); // Fully block site navigation
            event.preventDefault(); // Prevent default Escape behavior
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

    // Function to temporarily block the site's Escape key listener
    function blockSiteEscape() {
        if (!siteEscapeHandlerDisabled) {
            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    event.stopImmediatePropagation(); // Fully block any Escape key listeners on the site
                    event.preventDefault(); // Prevent default behavior
                }
            }, { capture: true });
            siteEscapeHandlerDisabled = true;
        }

        // Add our own Escape event listener to close the overlay
        document.addEventListener("keydown", closeOnEscape, { capture: true });
    }

    // Function to restore the site's Escape key navigation when overlay closes
    function restoreSiteEscape() {
        document.removeEventListener("keydown", closeOnEscape, { capture: true });
        siteEscapeHandlerDisabled = false;
    }
});
