let taskInput = document.querySelector("#input-text");
let filterInput = document.querySelector("#filter-tasks");
let taskList = document.querySelector("#task-list-items");
let form = document.querySelector("#input-form");
let clearBtn = document.querySelector(".clear-tasks");

form.addEventListener("submit", addItem);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTasks);
filterInput.addEventListener("keyup", filterTasks);

function addItem(e) {
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
}

function clearTasks(e) {
  taskList.innerHTML = "";
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
