// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add Task
addBtn.addEventListener("click", addTask);

function addTask() {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = "";
}

// Create task list item
function createTaskElement(taskText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = taskText;

    let btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit");
    editBtn.onclick = () => editTask(span);

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => deleteTask(li, span.textContent);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
}

// Edit Task
function editTask(span) {
    let updated = prompt("Edit your task:", span.textContent);
    if (updated !== null && updated.trim() !== "") {
        updateTask(span.textContent, updated.trim());
        span.textContent = updated;
    }
}

// Delete Task
function deleteTask(li, taskText) {
    li.remove();
    removeTask(taskText);
}

// LocalStorage Operations
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function updateTask(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let index = tasks.indexOf(oldTask);
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
