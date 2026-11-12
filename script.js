const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAllTasks);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function updateTaskCount() {
  taskCount.textContent = `Total Tasks: ${tasks.length}`;
}

function clearAllTasks() {
  const confirmed = confirm("Are you sure you want to delete all tasks?");

  if (!confirmed) {
    return;
  }

  tasks = [];

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskList.innerHTML = "";

  updateTaskCount();
}

function renderTask(taskText) {
  // Create task item
  const li = document.createElement("li");

  // Create task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Complete button
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.classList.add("complete-btn");

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  completeBtn.addEventListener("click", function () {
    span.classList.toggle("completed");
  });

  deleteBtn.addEventListener("click", function () {
    li.remove();

    tasks = tasks.filter(function (task) {
      return task !== taskText;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCount();
  });

  const buttonContainer = document.createElement("div");

  buttonContainer.appendChild(completeBtn);
  buttonContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonContainer);

  taskList.appendChild(li);
}
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push(taskText);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(tasks);

  renderTask(taskText);
  updateTaskCount();

  taskInput.value = "";
}

tasks.forEach(function (task) {
  renderTask(task);
});

updateTaskCount();
