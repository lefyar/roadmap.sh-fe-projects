const form = document.querySelector("#profileForm");
const name = form.querySelector("#name");
const email = form.querySelector("#email");
const password = form.querySelector("#password");
const confirmation = form.querySelector("#confirm-password");
const meter = form.querySelector("#strengthMeter");
const strength = form.querySelector("#strengthText");
const status = form.querySelector("#formStatus");
let submitted = false;

const fields = [
  [name, "nameError", () => name.value.trim() ? "" : "Enter your name."],
  [email, "emailError", () => email.validity.valid ? "" : "Enter a valid email address."],
  [password, "passwordError", () => password.value.length >= 8 ? "" : "Enter at least 8 characters."],
  [confirmation, "confirmError", () => confirmation.value && confirmation.value === password.value
    ? "" : "Enter the same password again."],
];

function validate([field, errorId, message]) {
  const error = message();
  form.querySelector(`#${errorId}`).textContent = error;
  field.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

function updateStrength() {
  const value = password.value;
  const score = [value.length >= 8, /[A-Z]/.test(value), /[a-z]/.test(value), /\d/.test(value),
    /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
  meter.dataset.score = value.length >= 8 ? score : 0;
  strength.textContent = value.length < 8 ? "Enter at least 8 characters."
    : (["", "Weak", "Weak", "Fair", "Strong", "Very strong"][score]);
}

form.addEventListener("input", event => {
  status.textContent = "";
  if (event.target === password) updateStrength();
  if (submitted) fields.forEach(validate);
});

form.addEventListener("submit", event => {
  event.preventDefault();
  submitted = true;
  const results = fields.map(validate);
  const firstInvalid = results.indexOf(false);
  if (firstInvalid !== -1) {
    status.textContent = "Check the highlighted fields.";
    fields[firstInvalid][0].focus();
    return;
  }
  password.value = "";
  confirmation.value = "";
  updateStrength();
  submitted = false;
  status.textContent = "Profile details passed validation.";
});

form.querySelector("#submitBtn").disabled = false;
