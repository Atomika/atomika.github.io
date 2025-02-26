document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("image-overlay");

    const overlayContent = document.createElement("div");
    overlayContent.classList.add("overlay-content");

    const closeButton = document.createElement("div");
    closeButton.classList.add("overlay-close-button");
    closeButton.addEventListener("click", closeOverlay);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("overlay-image-container");

    const overlayImage = document.createElement("img");
    overlayImage.classList.add("overlay-image");

    const overlayImageCaption = document.createElement("p");
    overlayImageCaption.classList.add("overlay-image-caption");

    imageContainer.appendChild(overlayImage);
    imageContainer.appendChild(overlayImageCaption);

    const textContainer = document.createElement("div");
    textContainer.classList.add("overlay-text-container");

    const overlayText = document.createElement("p");
    overlayText.classList.add("overlay-description");

    textContainer.appendChild(overlayText);

    // Create navigation divs
    const prevButton = document.createElement("div");
    prevButton.classList.add("overlay-nav-button", "overlay-prev-button");
    prevButton.innerHTML = "&#10094;"; // Left arrow (❮)
    prevButton.addEventListener("click", () => changeImage(-1));

    const nextButton = document.createElement("div");
    nextButton.classList.add("overlay-nav-button", "overlay-next-button");
    nextButton.innerHTML = "&#10095;"; // Right arrow (❯)
    nextButton.addEventListener("click", () => changeImage(1));

    overlay.appendChild(prevButton);
    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(imageContainer);
    overlayContent.appendChild(textContainer);
    overlay.appendChild(nextButton);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    const images = Array.from(document.querySelectorAll(".work-gallery img"));
    let currentIndex = 0;
    let isTransitioning = false;

    images.forEach((img, index) => {
        img.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();
            openOverlay(index);
        });
    });

    function openOverlay(index) {
        currentIndex = index;
        updateOverlayContent(true);
        overlay.classList.add("active");

        window.addEventListener("resize", adjustImageSize);
        document.addEventListener("keydown", handleKeyPress, { capture: true });
    }

    function closeOverlay() {
        overlay.classList.remove("active");
        window.removeEventListener("resize", adjustImageSize);
        document.removeEventListener("keydown", handleKeyPress, { capture: true });
    }

    function updateOverlayContent(skipTransition = false) {
        if (isTransitioning) return;

        isTransitioning = true;
        overlayImage.classList.add("fade-out");

        setTimeout(() => {
            const img = images[currentIndex];
            overlayImage.src = img.getAttribute("src");
            overlayImageCaption.textContent = img.getAttribute("alt") || "No title available";
            overlayText.innerHTML = img.getAttribute("data-description") || "No additional info available.";

            adjustImageSize();

            overlayImage.classList.remove("fade-out");
            overlayImage.classList.add("fade-in");

            setTimeout(() => {
                overlayImage.classList.remove("fade-in");
                isTransitioning = false;
            }, 300); // Matches CSS animation duration
        }, skipTransition ? 0 : 300);
    }

    function adjustImageSize() {
        const maxHeight = window.innerHeight * 0.8;
        overlayImage.style.maxHeight = `${maxHeight}px`;
        overlayImage.style.width = "auto";
    }

    function changeImage(direction) {
        if (isTransitioning) return;
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < images.length) {
            currentIndex = newIndex;
            updateOverlayContent();
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Escape") {
            closeOverlay();
        } else if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        }
    }

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    overlayContent.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
