const contactButton = document.querySelector(".contact-button");
const contactPopup = document.getElementById("contact-popup");
const closeButton = document.querySelector(".close-button");

function setContactPopupState(isOpen) {
    if (!contactPopup) {
        return;
    }

    contactPopup.classList.toggle("active", isOpen);
    contactPopup.setAttribute("aria-hidden", String(!isOpen));
}

setContactPopupState(false);

if (contactButton) {
    contactButton.setAttribute("href", "#");
    contactButton.addEventListener("click", function (event) {
        event.preventDefault();
        setContactPopupState(true);
    });
}

if (closeButton && contactPopup) {
    closeButton.addEventListener("click", function () {
        setContactPopupState(false);
    });
}

if (contactPopup) {
    contactPopup.addEventListener("click", function (event) {
        if (event.target === contactPopup) {
            setContactPopupState(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setContactPopupState(false);
        }
    });
}