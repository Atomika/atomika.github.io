document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("overlay-image-container");

    const overlayImage = document.createElement("img");
    overlayImage.classList.add("overlay-image"); // Added a class for styling

    imageContainer.appendChild(overlayImage);

    // Create text container (side panel)
    const textContainer = document.createElement("div");
    textContainer.classList.add("overlay-text-container");

    const overlayText = document.createElement("p");
    overlayText.classList.add("overlay-description");

    textContainer.appendChild(overlayText);

    // Append elements to overlay
    overlayContent.appendChild(imageContainer);
    overlayContent.appendChild(textContainer);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    // Select all images inside work gallery
    const images = document.querySelectorAll(".work-gallery img");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation();

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt");
            const imgText = img.nextElementSibling?.textContent || "No additional info available."; // Get text from HTML

            // Set the overlay content
            overlayImage.src = imgSrc;
            overlayText.textContent = imgText; // Display text from the HTML

            // Show the overlay
            overlay.classList.add("active");

            // Add Escape key event listener
            document.addEventListener("keydown", closeOnEscape, { capture: true });
        });
    });

    // Function to close the overlay
    function closeOverlay() {
        overlay.classList.remove("active");
        document.removeEventListener("keydown", closeOnEscape, { capture: true });
    }

    // Function to close overlay with Escape key
    function closeOnEscape(event) {
        if (event.key === "Escape") {
            event.stopImmediatePropagation();
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
});
