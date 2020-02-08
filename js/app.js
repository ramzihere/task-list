const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

function loadEventListeners(){
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

function getTasks(task){
  tasks = parseJson();
  tasks.forEach(function(task){
  createTaskListElement(task);
  });
}

function addTask(e){
  if (taskInput.value === "") {
    alert("Add a task");
  } else{
	createTaskListElement(taskInput.value);
	storeTaskInLocalStorge(taskInput.value);
  }

  taskInput.value = "";
  e.preventDefault();
}

function storeTaskInLocalStorge(task){
  tasks = parseJson();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e){
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  tasks = parseJson();
  tasks.forEach(function(task, index){
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(){
  // taskList.innerHTML = "";

  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else{
      task.style.display = "none";
    }
  })
}

function createTaskListElement(task){
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
}

function parseJson(){
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}