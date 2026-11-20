const textarea = document.querySelector("#myTextarea");
const count = document.querySelector("#charCounter");
const copy = document.querySelector("#copyBtn");
const status = document.querySelector("#toast");

function update() {
  const length = textarea.value.length;
  count.textContent = `${length} / ${textarea.maxLength}`;
  textarea.closest(".textarea").classList.toggle("at-limit", length >= textarea.maxLength);
  copy.disabled = length === 0;
}

textarea.addEventListener("input", () => {
  status.textContent = "";
  update();
});
copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textarea.value);
    status.textContent = "Copied.";
  } catch {
    textarea.select();
    status.textContent = "Text selected. Use your keyboard or device menu to copy.";
  }
});
update();
