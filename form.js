
document.querySelector('#myForm').addEventListener('submit', (e) => validation(e));
document.querySelector('#email').addEventListener('change', () => validationEmail());
document.querySelector('#password').addEventListener('change', () => validationPassword());
document.querySelector('#rePassword').addEventListener('change', () => validationRePassword());
document.querySelector('#zipcode').addEventListener('change', () => validationZipCode());

const validation = (e) => {
    console.log(!(validationZipCode() && validationEmail() && validationPassword() && validationRePassword()))
    if (!(validationZipCode() && validationEmail() && validationPassword() && validationRePassword())) {
        e.preventDefault();
    }
};

const inputValidation = (regexp, msgError, msgValid, elementId) => {
    const element = document.querySelector("#" + elementId);
    const regex = regexp;
    const valid = regex.test(element.value);
    element.style.borderColor = valid ? "green" : "red";
    const message = valid ? msgValid : msgError;

    // add style
    const messageBox = document.querySelector("#message");
    messageBox.innerHTML = message;
    valid ? messageBox.classList.add("verif") : messageBox.classList.remove("verif")
    valid ? messageBox.classList.remove("error") : messageBox.classList.add("error")
    return valid;
}

const validationPassword = (passwordId = "") => {
    const elementId = passwordId == "" ? "password" : passwordId;
    const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}|;':",.<>?/\\])(?!.*\s).{10,}$/;
    const msgError = "Le mot de passe doit avoir<br>Au moins 1 caractère minuscule.<br>Au moins 1 chiffre.<br>Au moins 1 caractère spécial.<br>Minimum 10 caractères";
    const msgValid = "mot de pass valid";
    return inputValidation(regexp, msgError, msgValid, elementId);
}

const validationRePassword = () => {
    const elementId = "rePassword";
    const element = document.querySelector("#" + elementId);
    const valid = element.value === document.querySelector('#password').value;
    element.style.borderColor = valid ? "green" : "red";
    const check = validationPassword(elementId);
    if (!valid) {
        const messageBox = document.querySelector("#message");
        messageBox.innerHTML = "Mot de passe de vérification invalid";
        messageBox.classList.add("error")
        messageBox.classList.remove("verif")
    }
    return valid && check;
}

const validationEmail = () => {
    const elementId = "email";
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const msgError = "Email valid";
    const msgValid = "Email invalid";
    return inputValidation(regexp, msgError, msgValid, elementId);
}

const validationZipCode = (e) => {
    const elementId = "zipcode";
    const regexp = /^(?:[0-8]\d|9[0-8])\d{3}$/;
    const msgValid = "Code postal valid";
    const msgError = "Code postal invalid";
    return inputValidation(regexp, msgError, msgValid, elementId);
}