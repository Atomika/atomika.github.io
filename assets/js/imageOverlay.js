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
    Object.assign(overlayImageCaption.style, {
        letterSpacing: "0.2rem",
        fontSize: "0.7rem",
        opacity: "0.75",
        marginBottom: "2px",
        textTransform: "uppercase",
        marginTop: "10px"
    });

    imageContainer.appendChild(overlayImage);
    imageContainer.appendChild(overlayImageCaption);

    const textContainer = document.createElement("div");
    textContainer.classList.add("overlay-text-container");

    const overlayText = document.createElement("p");
    overlayText.classList.add("overlay-description");
    Object.assign(overlayText.style, {
        letterSpacing: "0.2rem",
        fontSize: "0.8rem",
        opacity: "0.75",
        marginBottom: "0",
        textTransform: "uppercase"
    });

    textContainer.appendChild(overlayText);

    // Navigation container
    const navContainer = document.createElement("div");
    navContainer.classList.add("overlay-nav-container");

    const prevButton = document.createElement("div");
    prevButton.classList.add("overlay-nav-button", "overlay-prev-button");
    prevButton.textContent = "❮";
    prevButton.addEventListener("click", showPreviousImage);

    const nextButton = document.createElement("div");
    nextButton.classList.add("overlay-nav-button", "overlay-next-button");
    nextButton.textContent = "❯";
    nextButton.addEventListener("click", showNextImage);

    navContainer.appendChild(prevButton);
    navContainer.appendChild(nextButton);

    overlayContent.appendChild(closeButton);
    overlayContent.appendChild(imageContainer);
    overlayContent.appendChild(textContainer);
    overlayContent.appendChild(navContainer);
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);

    const images = Array.from(document.querySelectorAll(".work-gallery img"));
    let currentIndex = 0;

    images.forEach((img, index) => {
        img.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();
            openOverlay(index);
        });
    });

    function openOverlay(index) {
        currentIndex = index;
        const img = images[currentIndex];
        overlayImage.src = img.getAttribute("src");
        overlayImageCaption.textContent = img.getAttribute("alt") || "No title available";
        overlayText.innerHTML = img.getAttribute("data-description") || "No additional info available";

        adjustImageSize();
        overlay.classList.add("active");

        window.addEventListener("resize", adjustImageSize);
        document.addEventListener("keydown", handleKeyPress, { capture: true });
    }

    function closeOverlay() {
        overlay.classList.remove("active");
        window.removeEventListener("resize", adjustImageSize);
        document.removeEventListener("keydown", handleKeyPress, { capture: true });
    }

    function adjustImageSize() {
        const maxHeight = window.innerHeight * 0.8;
        overlayImage.style.maxHeight = `${maxHeight}px`;
        overlayImage.style.width = "auto";
    }

    function showPreviousImage(event) {
        if (event) event.stopPropagation();
        if (currentIndex > 0) {
            openOverlay(currentIndex - 1);
        }
    }

    function showNextImage(event) {
        if (event) event.stopPropagation();
        if (currentIndex < images.length - 1) {
            openOverlay(currentIndex + 1);
        }
    }

    function handleKeyPress(event) {
        event.stopImmediatePropagation();
        event.preventDefault();
        if (event.key === "Escape") {
            closeOverlay();
        } else if (event.key === "ArrowLeft") {
            showPreviousImage();
        } else if (event.key === "ArrowRight") {
            showNextImage();
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