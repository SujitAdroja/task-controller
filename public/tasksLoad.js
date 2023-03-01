const addTasks = document.querySelector(".btn-add-task");
const taskName = document.querySelector(".task-name");
const taskContainer = document.querySelector(".task-container");
const btnRemove = document.querySelector(".btn-remove");
const clearTask = document.querySelector(".btn-clear");
const loader = document.querySelector(".loader");
let tasks = [];

const addTaksInList = function () {
  const task = taskName.value;
  if (task === " ") return;
  const markup = `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="task-description">${task}</div>
        <button type="button" class="btn btn-primary btn-remove">X</button>
    </li>
      `;

  taskContainer.insertAdjacentHTML("afterbegin", markup);
  taskName.value = " ";
  tasks.push(task);
  addToLocalStorage();
};

const removetasks = function (e) {
  if (e.target.classList.contains("btn-remove")) {
    if (confirm("Are you really sure . You Want to delete the task ??? ")) {
      removeFromLocalStorage(e.target.parentElement);
      e.target.parentElement.remove();
    }
  }
};

const clearAllTasks = function () {
  // taskContainer.innerHTML = "";
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }

  tasks = [];
  localStorage.clear();
};

const addToLocalStorage = function () {
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeFromLocalStorage = function (taskItem) {
  const itemValue = taskItem.querySelector(".task-description");
  const items = JSON.parse(localStorage.getItem("tasks"));
  items.forEach((item, index) => {
    if (item === itemValue.textContent) tasks.splice(index, 1);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTaks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null) tasks = [];
  if (!tasks) return;
  const markup = tasks.map(
    (task) => `
  <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <div class="task-description">${task}</div>
      <button type="button" class="btn btn-primary btn-remove">X</button>
  </li>
  `
  );
  taskContainer.insertAdjacentHTML("afterbegin", markup);
};

window.addEventListener("load", loadTaks);
addTasks.addEventListener("click", addTaksInList);
taskContainer.addEventListener("click", removetasks);
clearTask.addEventListener("click", clearAllTasks);
