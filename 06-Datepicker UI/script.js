const dialog = document.querySelector("#calendar");
const input = document.querySelector("#dateInput");
const open = document.querySelector("#openButton");
const previous = document.querySelector("#prevButton");
const next = document.querySelector("#nextButton");
const today = document.querySelector("#todayButton");
const days = document.querySelector("#days");
let selected;
let active = new Date();

function dateAt(day, month = active.getMonth(), year = active.getFullYear()) {
  const date = new Date(active);
  date.setFullYear(year, month, day);
  return date;
}

function moveMonths(offset) {
  const month = active.getMonth() + offset;
  const last = dateAt(0, month + 1).getDate();
  active = dateAt(Math.min(active.getDate(), last), month);
}

function sameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString();
}

function render() {
  document.querySelector("#month").textContent = active.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  const start = dateAt(1).getDay();
  const last = dateAt(0, active.getMonth() + 1).getDate();
  const current = new Date();
  days.replaceChildren();
  for (let i = 0; i < start + last; i++) {
    const row = i % 7 === 0 ? days.insertRow() : days.rows[days.rows.length - 1];
    const cell = row.insertCell();
    const day = i - start + 1;
    if (day < 1) continue;
    const date = dateAt(day);
    cell.setAttribute("aria-selected", String(Boolean(sameDay(date, selected))));
    const button = document.createElement("button");
    button.type = "button";
    button.tabIndex = sameDay(date, active) ? 0 : -1;
    button.textContent = day;
    button.setAttribute("aria-label", date.toLocaleDateString("en-GB", { dateStyle: "full" }));
    if (sameDay(date, current)) button.setAttribute("aria-current", "date");
    button.addEventListener("click", () => {
      selected = date;
      input.value = selected.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
      dialog.close();
    });
    cell.append(button);
  }
  const finalRow = days.rows[days.rows.length - 1];
  while (finalRow.cells.length < 7) finalRow.insertCell();
}

function focusDay() { days.querySelector('[tabindex="0"]').focus(); }

for (const day of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) {
  const cell = document.createElement("th");
  cell.scope = "col";
  cell.textContent = day;
  document.querySelector("#weekdays").append(cell);
}

days.addEventListener("keydown", event => {
  const shifts = {
    ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7,
    Home: -active.getDay(), End: 6 - active.getDay(),
  };
  if (event.key === "PageUp" || event.key === "PageDown") {
    moveMonths((event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1));
  } else if (Object.hasOwn(shifts, event.key)) {
    active = dateAt(active.getDate() + shifts[event.key]);
  } else return;
  event.preventDefault();
  render();
  focusDay();
});

open.addEventListener("click", () => {
  active = selected || new Date();
  render();
  dialog.showModal();
  focusDay();
});
dialog.addEventListener("close", () => open.focus());
document.querySelector("#closeButton").addEventListener("click", () => dialog.close());
previous.addEventListener("click", () => { moveMonths(-1); render(); });
next.addEventListener("click", () => { moveMonths(1); render(); });
today.addEventListener("click", () => { active = new Date(); render(); focusDay(); });
