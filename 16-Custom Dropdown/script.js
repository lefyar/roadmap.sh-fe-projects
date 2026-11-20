const trigger = document.querySelector("#dropdownButton");
const list = document.querySelector("#dropdownList");
const options = [...list.children];
const label = document.querySelector("#dropdownText");
let selected = -1;

function setOpen(open, choice = Math.max(0, selected)) {
  list.hidden = !open;
  trigger.setAttribute("aria-expanded", String(open));
  if (open) options[choice].focus();
}

function select(index) {
  selected = index;
  label.textContent = options[index].textContent;
  options.forEach((option, i) => {
    option.setAttribute("aria-selected", String(i === selected));
    option.classList.toggle("selected", i === selected);
  });
  setOpen(false);
  trigger.focus();
}

trigger.addEventListener("click", () => setOpen(list.hidden));
trigger.addEventListener("keydown", event => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    setOpen(true, selected < 0 && event.key === "ArrowUp" ? options.length - 1 : Math.max(0, selected));
  }
});

options.forEach((option, index) => {
  option.setAttribute("role", "option");
  option.setAttribute("aria-selected", "false");
  option.tabIndex = -1;
  option.addEventListener("click", () => select(index));
  option.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      setOpen(false);
      trigger.focus();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      trigger.focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(index);
    } else {
      const next = {
        ArrowDown: (index + 1) % options.length,
        ArrowUp: (index + options.length - 1) % options.length,
        Home: 0,
        End: options.length - 1,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      options[next].focus();
    }
  });
});

document.addEventListener("click", event => {
  if (!event.target.closest(".dropdown")) setOpen(false);
});
