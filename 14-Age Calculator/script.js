const input = document.querySelector("#birthdate");
const ageLine = document.querySelector("#ageLine");
const nextLine = document.querySelector("#nextBirthday");
const copy = document.querySelector("#copyBtn");
const copyStatus = document.querySelector("#copyStatus");
const day = 86_400_000;

function today() {
  const date = new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

function addMonths(birthdate, months) {
  const date = new Date(birthdate);
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months + 1, 0);
  date.setUTCDate(Math.min(birthdate.getUTCDate(), date.getUTCDate()));
  return date;
}

function clearResult(message, invalid = false) {
  ageLine.textContent = message;
  ageLine.classList.toggle("error", invalid);
  input.setAttribute("aria-invalid", String(invalid));
  nextLine.textContent = "";
  copyStatus.textContent = "";
  copy.hidden = true;
}

function unit(count, label) {
  return `${count} ${label}${count === 1 ? "" : "s"}`;
}

input.max = today().toISOString().slice(0, 10);
input.addEventListener("input", () => clearResult("Calculate to see your age."));

document.querySelector("#age-form").addEventListener("submit", event => {
  event.preventDefault();
  const date = today();
  input.max = date.toISOString().slice(0, 10);
  if (!input.validity.valid || !input.value) {
    clearResult(input.validity.rangeOverflow ? "Your birth date cannot be in the future." : "Enter a valid birth date.", true);
    input.focus();
    return;
  }
  const birthdate = new Date(input.value);
  let months = (date.getUTCFullYear() - birthdate.getUTCFullYear()) * 12
    + date.getUTCMonth() - birthdate.getUTCMonth();
  if (addMonths(birthdate, months) > date) months--;
  const years = Math.floor(months / 12);
  const days = (date - addMonths(birthdate, months)) / day;
  const anniversary = addMonths(birthdate, years * 12);
  const nextBirthday = addMonths(birthdate, (years + 1) * 12);
  ageLine.textContent = `${unit(years, "year")}, ${unit(months % 12, "month")}, ${unit(days, "day")}`;
  ageLine.classList.remove("error");
  input.setAttribute("aria-invalid", "false");
  nextLine.textContent = +date === +anniversary
    ? "Today is your birthday!"
    : `${unit((nextBirthday - date) / day, "day")} until your next birthday`;
  copy.hidden = false;
});

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(`${ageLine.textContent}\n${nextLine.textContent}`);
    copyStatus.textContent = "Copied.";
  } catch {
    copyStatus.textContent = "Copy is unavailable. You can select and copy the result.";
  }
});
