const submitButton = document.querySelector(".form-group > div > button");
const allInputs = document.querySelectorAll("input");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phone-number");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const errorContainer = document.querySelectorAll(".error");

submitButton.addEventListener("click", () => {
    for (let i = 0; i < allInputs.length; i++) { 
        if (allInputs[i].value === "" || allInputs[i].value === undefined) {
            allInputs[i].classList.add("invalid");
            errorContainer[i].classList.contains("hide") ? errorContainer[i].classList.remove("hide") : errorContainer[i].classList.remove("hide-error");
            setErrorMessage(errorContainer[i], "This is a required field.");
        } 
    }
})

allInputs.forEach((field, index) => {
    field.addEventListener("input", () => hideError(errorContainer[index], field))
})

firstName.addEventListener("input", (e) => {
    checkName(e.target, 0)
})

lastName.addEventListener("input", (e) => {
    checkName(e.target, 1)
})

email.addEventListener("input", () => {
    if (email.value === "") return;
    if (!email.checkValidity()) {
        email.classList.add("invalid");
        errorContainer[2].classList.contains("hide") ? errorContainer[2].classList.remove("hide") : errorContainer[2].classList.remove("hide-error");
        setErrorMessage(errorContainer[2], "Invalid email address.");
    }
})

phoneNumber.addEventListener("focusout", () => { 
    if (phoneNumber.value === "") return;
    if (/\D/g.test(phoneNumber.value) || phoneNumber.value.length < 10) {
        phoneNumber.classList.add("invalid");
        errorContainer[3].classList.contains("hide") ? errorContainer[3].classList.remove("hide") : errorContainer[3].classList.remove("hide-error");
        setErrorMessage(errorContainer[3], "Invalid phone number.");
    } else {
        phoneNumber.value = phoneNumber.value.replace(/\D/g, '');
        let formattedNumber = phoneNumber.value.match(/^(\d{3})(\d{3})(\d{5})$/);
        phoneNumber.value = '(' + formattedNumber[1] + ')' + ' ' + formattedNumber[2] + '-' + formattedNumber[3];
    }
})

password.addEventListener("input", () => {
    if (password.value === "") return;
    if (password.value === confirmPassword.value) hideError(errorContainer[5], confirmPassword);
    if (password.value.length < 8) {
        password.classList.add("invalid");
        errorContainer[4].classList.contains("hide") ? errorContainer[4].classList.remove("hide") : errorContainer[4].classList.remove("hide-error");
        setErrorMessage(errorContainer[4], "Invalid password.");
    }
})

confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value === "") return;
    if (confirmPassword.value !== password.value) {
        confirmPassword.classList.add("invalid");
        errorContainer[5].classList.contains("hide") ? errorContainer[5].classList.remove("hide") : errorContainer[5].classList.remove("hide-error");
        setErrorMessage(errorContainer[5], "Password does not match.");
    }
})

function checkName(name, errorIndex) {
    name.addEventListener("input", () => {
        if (!/[a-zA-Z]/g.test(name.value)) {
            if (name.value === "") return;
            name.classList.add("invalid");
            errorContainer[errorIndex].classList.contains("hide") ? errorContainer[errorIndex].classList.remove("hide") : errorContainer[errorIndex].classList.remove("hide-error");
            setErrorMessage(errorContainer[errorIndex], "Invalid name.");
        } 
    })
}

function hideError(error, field) {
    if (!error.classList.contains("hide")) error.classList.add("hide-error");
    if (error.classList.contains("hide-error")) {
        if (field.classList.contains("invalid")) field.classList.remove("invalid");
    }
}

function setErrorMessage(errorMessage, message) {
    if (!errorMessage.classList.contains("hide" && "hide-error")) {
        errorMessage.textContent = message;
        return;
    }
    errorContainer.forEach(error => {
        error.addEventListener("animationend", () => {
            errorMessage.textContent = message;
        })
    })
}