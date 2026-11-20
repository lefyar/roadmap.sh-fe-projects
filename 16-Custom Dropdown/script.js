const dropdownButton = document.getElementById("dropdownButton");
const dropdownList = document.getElementById("dropdownList");
const dropdownText = document.getElementById("dropdownText");
const dropdownArrow = document.getElementById("dropdownArrow");
const dropdownItems = Array.from(document.querySelectorAll(".dropdown-list li"));

let open = false;
let selectedIndex = -1;

function setItemStates() {
  dropdownItems.forEach((item, index) => {
    item.setAttribute("role", "option");
    item.setAttribute("tabindex", open ? "0" : "-1");
    item.setAttribute("aria-selected", String(index === selectedIndex));
    item.classList.toggle("selected", index === selectedIndex);
  });
}

function focusItem(index) {
  dropdownItems[index].focus();
}

function setOpen(isOpen) {
  open = isOpen;
  dropdownList.style.display = isOpen ? "block" : "none";
  dropdownArrow.textContent = isOpen ? "▲" : "▼";
  dropdownButton.setAttribute("aria-expanded", String(isOpen));
  dropdownList.setAttribute("role", "listbox");
  setItemStates();
}

function select(index, item) {
  selectedIndex = index;
  dropdownText.textContent = item.textContent;
  setItemStates();
  setOpen(false);
  dropdownButton.focus();
}

dropdownButton.setAttribute("aria-haspopup", "listbox");

dropdownButton.addEventListener("click", () => setOpen(!open));

dropdownButton.addEventListener("keydown", (event) => {
  if (
    event.key === "Enter" ||
    event.key === " " ||
    event.key === "Spacebar" ||
    event.key === "ArrowDown"
  ) {
    event.preventDefault();
    setOpen(true);
    focusItem(Math.max(selectedIndex, 0));
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setOpen(true);
    focusItem(dropdownItems.length - 1);
  }
});

dropdownItems.forEach((item, index) => {
  item.addEventListener("click", () => select(index, item));

  item.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "Spacebar" ||
      event.key === "Tab"
    ) {
      event.preventDefault();
      select(index, item);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem((index + 1) % dropdownItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem((index - 1 + dropdownItems.length) % dropdownItems.length);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      dropdownButton.focus();
    }
  });
});

document.addEventListener("click", (event) => {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownList.contains(event.target)
  ) {
    setOpen(false);
  }
});
