let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editIndex = null;

function displayTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let completed = 0;

    tasks.forEach((task, index) => {
        // Apply filter
        if (
            (currentFilter === "completed" && !task.completed) ||
            (currentFilter === "pending" && task.completed)
        ) {
            return;
        }

        // Create list item
        const li = document.createElement("li");

        // ---- CHECKBOX FOR COMPLETION ----
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
        };

        li.appendChild(checkbox);

        // ---- TASK TEXT ----
        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
        }

        li.appendChild(span);

        // ---- EDIT BUTTON ----
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = (e) => {
            e.stopPropagation();
            document.getElementById("taskInput").value = task.text;
            editIndex = index;
        };
        li.appendChild(editBtn);

        // ---- DELETE BUTTON ----
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
        };
        li.appendChild(deleteBtn);

        list.appendChild(li);

        if (task.completed) completed++;
    });

    // ---- TASK COUNTER ----
    document.getElementById("counter").textContent =
        `Total: ${tasks.length} | Completed: ${completed}`;
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    if (editIndex !== null) {
        tasks[editIndex].text = input.value.trim();
        editIndex = null;
    } else {
        tasks.push({ text: input.value.trim(), completed: false });
    }

    input.value = "";
    saveTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Initial display
displayTasks();
