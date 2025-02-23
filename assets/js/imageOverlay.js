document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    // Create image container
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("overlay-image-container");

    const overlayImage = document.createElement("img");
    overlayImage.classList.add("overlay-image");

    const overlayImageCaption = document.createElement("p");
    overlayImageCaption.classList.add("overlay-image-caption");

    imageContainer.appendChild(overlayImage);
    imageContainer.appendChild(overlayImageCaption);

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
            event.preventDefault(); // Prevent navigation issues

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt") || "No title available";
            const imgDescription = img.getAttribute("data-description") || "No additional info available.";

            // Set the overlay content
            overlayImage.src = imgSrc;
            overlayImageCaption.textContent = imgAlt; // Show alt text under the image
            overlayText.innerHTML = imgDescription; // Use innerHTML to render formatted description

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

    // Close overlay when clicking outside of the overlay content (but NOT the overlay itself)
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            event.stopPropagation();
            closeOverlay();
            event.preventDefault();
        }
    });

    // Prevent clicking anywhere inside the overlay (including around the image & text) from closing it
    overlayContent.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
});
