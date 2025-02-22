document.addEventListener("DOMContentLoaded", function () {
    // Create overlay elements
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;"; // 'X' Close icon
    closeButton.classList.add("close-overlay");

    const overlayImage = document.createElement("img");
    overlayImage.style.maxWidth = "100%";
    overlayImage.style.borderRadius = "5px";

    const overlayText = document.createElement("p");

    // Append elements to overlay
    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(overlayImage);
    overlayContent.appendChild(overlayText);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    // Select all images inside work gallery
    const images = document.querySelectorAll(".work-gallery img");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent other event listeners from firing

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt");

            // Set the overlay content
            overlayImage.src = imgSrc;
            overlayText.textContent = imgAlt || "Image description unavailable";

            // Show the overlay
            overlay.classList.add("active");
        });
    });

    // Prevent click inside the modal from closing it
    overlayContent.addEventListener("click", function (event) {
        event.stopPropagation(); // Stops click from affecting parent elements
    });

    // Close overlay when clicking the close button
    closeButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent unwanted navigation
        overlay.classList.remove("active");
    });

    // Close overlay when clicking outside the modal, but stay on the same page
    overlay.addEventListener("click", function () {
        overlay.classList.remove("active");
    });
});
