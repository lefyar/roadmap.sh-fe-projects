const tabs = [...document.querySelectorAll('[role="tab"]')];

function activate(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    item.classList.toggle("active", selected);
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    panel.hidden = !selected;
    panel.classList.toggle("active", selected);
  }
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activate(tab));
  tab.addEventListener("keydown", event => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    activate(tabs[next]);
    tabs[next].focus();
  });
});
