let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    let taskName = document.getElementById("task").value;
    let subject = document.getElementById("subject").value;
    let priority = document.getElementById("priority").value;

    if (taskName === "" || subject === "") {
        alert("Please enter task and select subject!");
        return;
    }

    tasks.push({
        name: taskName,
        subject: subject,
        priority: priority,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task").value = "";
    document.getElementById("subject").value = "";

    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
            <div class="task">
                <div class="task-info ${task.completed ? 'completed' : ''}">
                    <h3>${task.name}</h3>
                    <p>📖 ${task.subject} | ⭐ ${task.priority}</p>
                </div>

                <div class="actions">
                    <button onclick="completeTask(${index})">
                        ${task.completed ? "Undo" : "Done"}
                    </button>

                    <button class="delete" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });

    updateStats();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function updateStats() {
    let total = tasks.length;
    let completed = tasks.filter(task => task.completed).length;
    let pending = total - completed;

    document.getElementById("total").innerText = total;
    document.getElementById("completed").innerText = completed;
    document.getElementById("pending").innerText = pending;
}

displayTasks();