const form = document.querySelector("form");
const language = document.querySelector("#language-select");
const result = document.querySelector("#result-container");
const status = document.querySelector("#status-message");
const submit = document.querySelector("#fetch-button");
let request;
let previous;

try { sessionStorage.removeItem("github_token"); } catch { /* Storage may be unavailable. */ }

function display(repo) {
  const heading = document.createElement("h2");
  const link = document.createElement("a");
  link.href = "https://github.com/" + repo.full_name.split("/").map(encodeURIComponent).join("/");
  link.textContent = repo.full_name;
  heading.append(link);
  const description = document.createElement("p");
  description.textContent = repo.description || "No description provided.";
  const stats = document.createElement("p");
  stats.textContent = `${repo.stargazers_count} stars · ${repo.forks_count} forks · ${repo.open_issues_count} open issues`;
  result.replaceChildren(heading, description, stats);
  result.hidden = false;
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  request?.abort();
  const controller = new AbortController();
  request = controller;
  submit.disabled = true;
  status.textContent = "Looking for repositories…";
  const params = new URLSearchParams({ q: `language:${language.value} is:public`,
    sort: "stars", order: "desc", per_page: "50" });
  try {
    const response = await fetch(`https://api.github.com/search/repositories?${params}`, {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
    });
    if (response.status === 403 || response.status === 429) throw new Error("GitHub is limiting requests. Try again in a minute.");
    if (!response.ok) throw new Error("GitHub could not complete the search. Try again.");
    const { items } = await response.json();
    if (controller.signal.aborted) return;
    if (items.length === 0) {
      result.hidden = true;
      status.textContent = "No repositories found.";
      return;
    }
    const pool = items.length > 1 ? items.filter(repo => repo.id !== previous) : items;
    const repo = pool[Math.floor(Math.random() * pool.length)];
    previous = repo.id;
    display(repo);
    status.textContent = `Found ${repo.full_name}.`;
    submit.textContent = "Find another";
  } catch (error) {
    if (!controller.signal.aborted) status.textContent = error.name === "Error"
      ? error.message : "Could not reach GitHub. Try again.";
  } finally {
    if (request === controller) submit.disabled = false;
  }
});

language.addEventListener("change", () => {
  request?.abort();
  submit.disabled = false;
  submit.textContent = "Find repository";
  status.textContent = "";
  result.hidden = true;
});
