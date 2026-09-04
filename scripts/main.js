const contactButton = document.querySelector(".contact-button");
const contactPopup = document.getElementById("contact-popup");
const closeButton = document.querySelector(".close-button");

if (contactButton) {
    contactButton.setAttribute("href", "#");
    contactButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (contactPopup) {
            contactPopup.classList.add("active");
        }
    });
}

if (closeButton && contactPopup) {
    closeButton.addEventListener("click", function () {
        contactPopup.classList.remove("active");
    });
}

if (contactPopup) {
    contactPopup.addEventListener("click", function (event) {
        if (event.target === contactPopup) {
            contactPopup.classList.remove("active");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            contactPopup.classList.remove("active");
        }
    });
}