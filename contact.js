const form = document.querySelector(".contact-form");
const submitButton = form.querySelector("button");
const status = form.querySelector('[role="status"]');

form.addEventListener("submit", async event => {
  event.preventDefault();
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const message = form.querySelector("#message").value.trim();
  if (!name || !message) {
    status.textContent = "Enter your name and a message.";
    form.querySelector(name ? "#message" : "#name").focus();
    return;
  }
  try {
    await navigator.clipboard.writeText(`${message}\n\n${name}\n${email}`);
    status.textContent = "Draft copied.";
  } catch {
    status.textContent = "Copy is unavailable. You can select your message and copy it manually.";
  }
});

submitButton.disabled = false;
