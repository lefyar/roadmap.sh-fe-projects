const dropdownButton = document.getElementById("dropdownButton");
const dropdownList = document.getElementById("dropdownList");
const dropdownText = document.getElementById("dropdownText");
const dropdownArrow = document.getElementById("dropdownArrow");
const dropdownItems = document.querySelectorAll(".dropdown-list li");

dropdownButton.addEventListener("click", () => {
    const isOpen = dropdownList.style.display === "block";
    dropdownList.style.display = isOpen ? "none" : "block";
    dropdownArrow.textContent = isOpen ? "▼" : "▲";
});

dropdownItems.forEach(item => {
    item.addEventListener("click", (event) => {
        dropdownText.textContent = event.target.textContent;
        dropdownList.style.display = "none";
        dropdownArrow.textContent = "▼";
        dropdownItems.forEach(i => i.classList.remove("selected"));
        event.target.classList.add("selected");
    });
});

document.addEventListener("click", (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownList.contains(event.target)) {
        dropdownList.style.display = "none";
        dropdownArrow.textContent = "▼";
    }
});