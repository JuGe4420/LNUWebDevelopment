function isValidPassword(password) {
    return password.length >= 8
        && (password.match(/[A-Z]/g) || []).length >= 2
        && /[0-9]/.test(password)
        && /[^A-Za-z0-9]/.test(password);
}

const loginForm = document.getElementById("login-form");
const passwordInput = document.getElementById("password");
const loginStatus = document.getElementById("login-status");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const password = passwordInput.value;

        if (isValidPassword(password)) {
            loginStatus.textContent = "Valid password! Login successful.";
            loginStatus.style.color = "#4caf50";
            loginStatus.hidden = false;
        } else {
            loginStatus.textContent = "Invalid password. It must contain at least 8 characters, 2 capital letters, 1 number, and 1 special character.";
            loginStatus.style.color = "var(--orange)";
            loginStatus.hidden = false;
        }
    });
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function () {
        alert("Thank you! Your message is being sent.");
    });
}
