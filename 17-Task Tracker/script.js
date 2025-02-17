let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log("Task found:" + tasks.length);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(description) {
  if (description.trim() === "") return;
  tasks.push({ description, completed: false });
  saveTasks();
  renderTasks();
}

function addTaskFromButton() {
  const input = document.getElementById("taskInput");
  addTask(input.value);
  input.value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.sort((a, b) => a.completed - b.completed);

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
                    <div class="task">
                    <input type="checkbox" ${
                      task.completed ? "checked" : ""
                    } onclick="toggleTask(${index})">
                    <span>${task.description}</span>
                    </div>
                    <button class="delete" onclick="deleteTask(${index})">&#128465;</button>
                `;
    taskList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", renderTasks);

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask(event.target.value);
    event.target.value = "";
  }
}
