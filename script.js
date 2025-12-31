// Simple in-browser task manager (no backend needed)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} 
                onclick="toggleTask(${index}, this.checked)">
            ${task.title}
            <button onclick="deleteTask(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if(input.value.trim() === "") return;

    tasks.push({ title: input.value, completed: false });
    input.value = "";
    saveTasks();
    loadTasks();
}

function toggleTask(index, completed) {
    tasks[index].completed = completed;
    saveTasks();
    loadTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
}

// Initial load
loadTasks();
