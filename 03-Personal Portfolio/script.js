const theme = localStorage.getItem("theme");

if (theme) {
  document.documentElement.setAttribute("theme", theme);
} else {
  document.documentElement.setAttribute("theme", "dark");
}

function toggleDarkMode() {
  const moonIcon = document.getElementById("moon_icon");
  const sunIcon = document.getElementById("sun_icon");
  const theme = document.documentElement.getAttribute("theme");
  document.documentElement.setAttribute(
    "theme",
    theme === "dark" ? "light" : "dark"
  );
  if (theme === "dark") {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
  }
}
