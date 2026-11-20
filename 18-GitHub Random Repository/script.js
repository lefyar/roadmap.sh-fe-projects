document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.github.com/search/repositories";
  const languageSelect = document.getElementById("language-select");
  const resultContainer = document.getElementById("result-container");
  const statusMessage = document.getElementById("status-message");
  const fetchButton = document.getElementById("fetch-button");
  const refreshButton = document.getElementById("refresh-button");

  const tokenInput = document.getElementById("token-input");
  const saveTokenButton = document.getElementById("save-token");

  let token = "";
  localStorage.removeItem("github_token");
  const tokenStatus = document.getElementById("stored-token");
  tokenStatus.textContent = "Using public access.";

  function saveToken() {
    token = tokenInput.value.trim();
    tokenInput.value = "";
    tokenStatus.textContent = token ? "Token active for this page." : "Using public access.";
  }

  document.getElementById("clear-token").addEventListener("click", () => {
    tokenInput.value = "";
    saveToken();
  });

  saveTokenButton.addEventListener("click", saveToken);

  async function fetchRepository(language) {


    try {
      if (!language) {
        showStatus("Please select a language", "gray");
        return;
      }

      showStatus("Loading, please wait..", "gray");

      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `${apiUrl}?q=language:${encodeURIComponent(language)}&sort=stars&order=desc&page=${randomPage}`,
        {
          headers: token ? { Authorization: `token ${token}` } : {},
        }
      );

      if (response.status === 403) {
        showStatus("Rate limit exceeded. Try again later or use token.", "red");
        return;
      }

      if (!response.ok) throw new Error("Request failed");
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
    const card = document.createElement("div");
    card.className = "repo-card";
    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = "https://github.com/" + repo.full_name.split("/").map(encodeURIComponent).join("/");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = repo.name;
    title.append(link);
    const description = document.createElement("p");
    description.textContent = repo.description || "No description available.";
    const stats = document.createElement("p");
    stats.textContent = `${repo.stargazers_count} stars | ${repo.forks_count} forks | ${repo.open_issues_count} open issues`;
    card.append(title, description, stats);
    resultContainer.replaceChildren(card);
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
