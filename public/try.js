const addTasks = document.querySelector(".task-form");
const taskName = document.querySelector(".task-name");
const taskContainer = document.querySelector(".task-container");
const btnRemove = document.querySelector(".btn-remove");
const clearTask = document.querySelector(".btn-clear");
const API_URL = "http://localhost:3000/api/v1/";
//loader
const loading = function () {
  const markup = `
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
      <div class="wheel"></div>
      <div class="hamster">
        <div class="hamster__body">
          <div class="hamster__head">
            <div class="hamster__ear"></div>
            <div class="hamster__eye"></div>
            <div class="hamster__nose"></div>
          </div>
          <div class="hamster__limb hamster__limb--fr"></div>
          <div class="hamster__limb hamster__limb--fl"></div>
          <div class="hamster__limb hamster__limb--br"></div>
          <div class="hamster__limb hamster__limb--bl"></div>
          <div class="hamster__tail"></div>
        </div>
      </div>
      <div class="spoke"></div>
    </div>
  `;

  taskContainer.insertAdjacentHTML("afterbegin", markup);
};

//error message & no data found
const showError = function (message) {
  const markup = `
  <li
          class="list-group-item d-flex justify-content-between align-items-center bg-danger "
           
        >
          <div class="task-description text-light">${message}</div>
       </li>
  `;
  taskContainer.innerHTML = "";
  taskContainer.insertAdjacentHTML("afterbegin", markup);

  setTimeout(() => {
    clearError();
  }, 2000);
};
const clearError = function () {
  taskContainer.innerHTML = "";
};

//adding data
const addTaksInList = function (e) {
  e.preventDefault();
  const name = taskName.value;

  if (name === " ") return;

  fetch(`${API_URL}tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  taskName.value = "";
  loadTaks();
};

const removetasks = async function (e) {
  try {
    if (e.target.classList.contains("btn-remove")) {
      const res = await fetch(`${API_URL}tasks`);
      const tasks = await res.json();
      const allTasks = tasks.tasks;
      const id = e.target.parentElement.dataset.id;
      console.log(id);
      fetch(`${API_URL}tasks/${id}`, {
        method: "DELETE",
      });
    }
    loadTaks();
  } catch (err) {
    console.log(err);
  }
};

const clearAllTasks = async function () {
  const res = await fetch(`${API_URL}tasks`);
  const data = await res.json();
  const allTasks = data.tasks;
  allTasks.forEach((task) =>
    fetch(`${API_URL}tasks/${task._id}`, {
      method: "DELETE",
    })
  );
  loadTaks();
};

const loadTaks = async function () {
  try {
    const res = await fetch(`${API_URL}tasks`);
    const tasks = await res.json();
    const allTasks = tasks.tasks;
    console.log(allTasks);
    if (!res.ok) return;
    // check if data is there or not
    if (allTasks.length < 1) {
      showError("No Data Found Please Add Tasks");
      return;
    }
    const markup = allTasks
      .map(
        (task) => `
      <li
          class="list-group-item d-flex justify-content-between align-items-center"
          data-id=${task._id}
        >
          <div class="task-description">${task.name}</div>
          <button type="button" class="btn btn-primary btn-remove">X</button>
      </li>
      `
      )
      .join("");
    taskContainer.innerHTML = "";
    taskContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    showError(err.message);
  }
};

const loadRefreshWindow = async function () {
  try {
    loading();
    const res = await fetch(`${API_URL}tasks`);
    const tasks = await res.json();
    const allTasks = tasks.tasks;

    load = false;
    if (!res.ok) return;
    // check if data is there or not
    if (allTasks.length < 1) {
      showError("No Data Found Please Add Tasks");
      return;
    }
    const markup = allTasks
      .map(
        (task) => `
      <li
          class="list-group-item d-flex justify-content-between align-items-center"
          data-id=${task._id}
        >
          <div class="task-description">${task.name}</div>
          <button type="button" class="btn btn-primary btn-remove">X</button>
      </li>
      `
      )
      .join("");
    taskContainer.innerHTML = "";
    taskContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    showError(err.message);
  }
};
window.addEventListener("load", loadRefreshWindow);
addTasks.addEventListener("submit", addTaksInList);
taskContainer.addEventListener("click", removetasks);
clearTask.addEventListener("click", clearAllTasks);
