document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    const closeButton = document.createElement("div");
    closeButton.classList.add("overlay-close-button");
    closeButton.addEventListener("click", function () {
        closeOverlay();
    });

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("overlay-image-container");

    const overlayImage = document.createElement("img");
    overlayImage.classList.add("overlay-image");

    const overlayImageCaption = document.createElement("p");
    overlayImageCaption.classList.add("overlay-image-caption");

    overlayImageCaption.style.letterSpacing = "0.2rem";
    overlayImageCaption.style.fontSize = "0.7rem";
    overlayImageCaption.style.opacity = "0.75";
    overlayImageCaption.style.marginBottom = "2px";
    overlayImageCaption.style.textTransform = "uppercase";
    overlayImageCaption.style.marginTop = "10px";

    imageContainer.appendChild(overlayImage);
    imageContainer.appendChild(overlayImageCaption);

    const textContainer = document.createElement("div");
    textContainer.classList.add("overlay-text-container");

    const overlayText = document.createElement("p");
    overlayText.classList.add("overlay-description");

    overlayText.style.letterSpacing = "0.2rem";
    overlayText.style.fontSize = "0.8rem";
    overlayText.style.opacity = "0.75";
    overlayText.style.marginBottom = "0";
    overlayText.style.textTransform = "uppercase";

    textContainer.appendChild(overlayText);

    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(imageContainer);
    overlayContent.appendChild(textContainer);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    const images = document.querySelectorAll(".work-gallery img");

    images.forEach(img => {
        img.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();

            const imgSrc = img.getAttribute("src");
            const imgAlt = img.getAttribute("alt") || "No title available";
            const imgDescription = img.getAttribute("data-description") || "No additional info available.";

            overlayImage.src = imgSrc;
            overlayImageCaption.textContent = imgAlt;
            overlayText.innerHTML = imgDescription;

            adjustImageSize();

            // Lock scrolling without altering position
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            document.body.addEventListener("touchmove", preventTouchScroll, { passive: false });

            overlay.classList.add("active");
            window.addEventListener("resize", adjustImageSize);
            document.addEventListener("keydown", closeOnEscape, { capture: true });
        });
    });

    function adjustImageSize() {
        const maxHeight = window.innerHeight * 0.8;
        overlayImage.style.maxHeight = `${maxHeight}px`;
        overlayImage.style.width = "auto";
    }

    function closeOverlay() {
        overlay.classList.remove("active");
        window.removeEventListener("resize", adjustImageSize);
        document.removeEventListener("keydown", closeOnEscape, { capture: true });

        // Unlock scrolling without forcing repositioning
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.body.removeEventListener("touchmove", preventTouchScroll, { passive: false });
    }

    function preventTouchScroll(event) {
        if (!overlayContent.contains(event.target)) {
            event.preventDefault();
        }
    }

    function closeOnEscape(event) {
        if (event.key === "Escape") {
            event.stopImmediatePropagation();
            event.preventDefault();
            closeOverlay();
        }
    }

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            event.stopPropagation();
            closeOverlay();
            event.preventDefault();
        }
    });

    overlayContent.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
    });
});