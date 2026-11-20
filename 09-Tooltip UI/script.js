for (const item of document.querySelectorAll(".navbar li")) {
  const trigger = item.querySelector("a");
  const reset = () => { delete item.dataset.dismissed; };
  item.addEventListener("pointerleave", reset);
  trigger.addEventListener("focus", reset);
  trigger.addEventListener("blur", reset);
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".navbar li:hover, .navbar li:focus-within")
      .forEach(item => { item.dataset.dismissed = ""; });
  }
});
