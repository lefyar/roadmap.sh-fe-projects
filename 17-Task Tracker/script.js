let tasks = loadTasks();
let nextId = Math.max(0, ...tasks.map((task) => task.id || 0)) + 1;

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(description) {
  const text = description.trim();
  if (!text) return;
  tasks.push({ id: nextId++, description: text, completed: false });
  saveTasks();
  renderTasks();
}

function addTaskFromButton() {
  const input = document.getElementById("taskInput");
  addTask(input.value);
  input.value = "";
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.replaceChildren();

  const sorted = [...tasks].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  sorted.forEach((task) => {
    const li = document.createElement("li");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", task.description);

    const span = document.createElement("span");
    span.textContent = task.description;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "\u2715";
    deleteBtn.setAttribute("aria-label", `Delete ${task.description}`);

    taskDiv.append(checkbox, span, deleteBtn);
    li.append(taskDiv);
    taskList.append(li);

    checkbox.addEventListener("change", () => toggleTask(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
  });
}

document.addEventListener("DOMContentLoaded", renderTasks);

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask(event.target.value);
    event.target.value = "";
  }
}
