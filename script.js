let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let inputTask = document.querySelector("#task-input");
let addBtn = document.querySelector("#add-btn");

let taskList = document.querySelector("#task-container");

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((taskObj, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.textContent = taskObj.text;
    if (taskObj.completed) {
      taskText.style.textDecoration = "line-through";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.completed;

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);

      saveTasks();
      renderTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

addBtn.addEventListener("click", function () {
  const task = inputTask.value.trim();

  if (task !== "") {
    tasks.push({
      text: task.charAt(0).toUpperCase() + task.slice(1),
      completed: false,
    });

    saveTasks();
    renderTasks();
    inputTask.value = "";
  } else {
    alert("Please enter a task!");
  }
});

renderTasks();
