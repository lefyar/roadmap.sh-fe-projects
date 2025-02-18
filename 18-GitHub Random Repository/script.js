document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.github.com/search/repositories";
  const languageSelect = document.getElementById("language-select");
  const resultContainer = document.getElementById("result-container");
  const statusMessage = document.getElementById("status-message");
  const fetchButton = document.getElementById("fetch-button");
  const refreshButton = document.getElementById("refresh-button");

  const tokenInput = document.getElementById("token-input");
  const saveTokenButton = document.getElementById("save-token");

  function getToken() {
    return localStorage.getItem("github_token") || "";
  }

  function saveToken() {
    const newToken = tokenInput.value.trim();
    if (newToken) {
      localStorage.setItem("github_token", newToken);
      alert("Token saved!");
      displayStoredToken();
    }
  }

  document.getElementById("clear-token").addEventListener("click", () => {
    localStorage.removeItem("github_token");
    alert("Token removed!");
    displayStoredToken();
  });

  function displayStoredToken() {
    const storedToken = getToken();
    document.getElementById("stored-token").textContent = storedToken
      ? `Stored Token: ${
          storedToken.length > 10
            ? storedToken.slice(0, 10) + "..."
            : storedToken
        }`
      : "Stored Token: None";
  }

  displayStoredToken();

  saveTokenButton.addEventListener("click", saveToken);

  async function fetchRepository(language) {
    const token = getToken();

    try {
      if (!language) {
        showStatus("Please select a language", "gray");
        return;
      }

      showStatus("Loading, please wait..", "gray");

      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `${apiUrl}?q=language:${language}&sort=stars&order=desc&page=${randomPage}`,
        {
          headers: token ? { Authorization: `token ${token}` } : {},
        }
      );

      if (response.status === 403) {
        showStatus("Rate limit exceeded. Try again later or use token.", "red");
        return;
      }

      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        showStatus("No repositories found.", "gray");
        return;
      }

      const randomRepo =
        data.items[Math.floor(Math.random() * data.items.length)];
      displayRepository(randomRepo);
    } catch (error) {
      showStatus("Error fetching repositories", "red");
    }
  }

  function displayRepository(repo) {
    resultContainer.innerHTML = `
            <div class="repo-card">
                <h3><a href="${repo.html_url}" target="_blank">${
      repo.name
    }</a></h3>
                <p>${repo.description || "No description available."}</p>
                <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🛠 ${
      repo.open_issues_count
    }</p>
            </div>
        `;
    statusMessage.textContent = "";
    refreshButton.style.display = "block";
  }

  function showStatus(message, color) {
    statusMessage.textContent = message;
    statusMessage.style.color = color;
    resultContainer.innerHTML = "";
    refreshButton.style.display = "none";
  }

  fetchButton.addEventListener("click", () => {
    fetchRepository(languageSelect.value);
  });

  refreshButton.addEventListener("click", () => {
    fetchRepository(languageSelect.value);
  });
});
