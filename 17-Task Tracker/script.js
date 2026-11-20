const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const list = document.querySelector("#taskList");
const empty = document.querySelector("#emptyTasks");
const notice = document.querySelector("#taskNotice");
let tasks = readTasks();

function readTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(saved) ? saved.filter(task => task && typeof task.description === "string"
      && ["number", "string"].includes(typeof task.id)) : [];
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch {
    notice.textContent = "Browser storage is unavailable. Tasks will last for this visit.";
  }
}

function render(focusId) {
  empty.hidden = tasks.length > 0;
  list.replaceChildren();
  const sorted = [...tasks].sort((a, b) => Number(Boolean(a.completed)) - Number(Boolean(b.completed)));
  for (const task of sorted) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.completed);
    const description = document.createElement("span");
    description.textContent = task.description;
    label.append(checkbox, description);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", `Delete ${task.description}`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      save();
      render(task.id);
    });
    remove.addEventListener("click", () => {
      const position = sorted.indexOf(task);
      tasks = tasks.filter(candidate => candidate.id !== task.id);
      save();
      render((sorted[position + 1] ?? sorted[position - 1])?.id);
      if (tasks.length === 0) input.focus();
    });
    item.append(label, remove);
    list.append(item);
    if (task.id === focusId) checkbox.focus();
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const description = input.value.trim();
  if (!description) {
    input.setCustomValidity("Enter a task description.");
    input.reportValidity();
    return;
  }
  tasks.push({ id: crypto.randomUUID(), description, completed: false });
  save();
  render();
  input.value = "";
  input.focus();
});
input.addEventListener("input", () => input.setCustomValidity(""));
render();
