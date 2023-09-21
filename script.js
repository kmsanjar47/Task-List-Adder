let taskInput = document.querySelector("#input-text");
let filterInput = document.querySelector("#filter-tasks");
let taskList = document.querySelector("#task-list-items");
let form = document.querySelector("#input-form");
let clearBtn = document.querySelector(".clear-tasks");

form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTasks);
filterInput.addEventListener("keyup", filterTasks);
document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);

//Event Functions
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please enter a valid input!!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
    addTaskInLocalStorage(taskInput.value);
  }
  taskInput.value = "";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let parent = e.target.parentElement;
      parent.remove();
    }
  }
  removeTaskFromLocalStorage();
}

function clearTasks(e) {
  taskList.innerHTML = "";
  clearFromLocalStorage();
}

function filterTasks(e) {
  let input = e.target.value.toLowerCase();
  [...taskList.children].forEach((child) => {
    if (child.firstChild.textContent.toLowerCase().indexOf(input) == -1) {
      child.style.display = "none";
    } else {
      child.style.display = "block";
    }
  });
}

//Local Storage Functions
function addTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasks);
  }
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function clearFromLocalStorage() {
  localStorage.removeItem("tasks");
}

function removeTaskFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = [...taskList.children];
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
