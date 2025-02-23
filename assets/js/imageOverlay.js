document.addEventListener("DOMContentLoaded", function () {
    // --- Existing overlay setup code ---
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
            overlayText.textContent = imgDescription; // Show description in side panel

            // Show the overlay
            overlay.classList.add("active");

            // Remove previous Escape event to avoid duplicates
            document.removeEventListener("keydown", closeOnEscape);

            // Add new Escape key event listener
            document.addEventListener("keydown", closeOnEscape);
        });
    });

    // --- Escape key handling logic ---
    function closeOverlay() {
        overlay.classList.remove("active");

        // Remove Escape key listener when overlay is closed
        document.removeEventListener("keydown", closeOnEscape);
    }

    // Function to close overlay with Escape key (blocks main.js)
    function closeOnEscape(event) {
        const isOverlayActive = overlay.classList.contains("active");
        const isArticleVisible = document.body.classList.contains("is-article-visible");

        if (isOverlayActive && event.key === "Escape") {
            console.log("ESCAPE PRESSED - Closing overlay only");
            event.stopImmediatePropagation(); // Fully blocks Escape from reaching main.js
            event.preventDefault(); // Prevents any default Escape action
            closeOverlay();
        }
        else if (isArticleVisible && event.key === "Escape") {
            console.log("ESCAPE PRESSED - Closing article");
            event.stopImmediatePropagation(); // Prevents the default action for the Escape key
            event.preventDefault();

            // Close the article (using the _hide method)
            const $main = $('#main');
            const $main_articles = $main.children('article');
            const $body = $('body');
            const delay = 325; // Assuming the same delay value as in your main.js

            // Handle closing of main article (similar to the behavior in the main.js file)
            $body.removeClass('is-article-visible');
            $main_articles.removeClass('active');
            $main_articles.hide();
            $main.hide();

            // Show header and footer again
            $('#header').show();
            $('#footer').show();

            // Allow the page to scroll again and re-enable interactions
            setTimeout(function () {
                $('html, body').scrollTop(0);
            }, delay);
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
    });
});
