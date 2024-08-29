let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoName = document.getElementById("todo_name");
const addButton = document.getElementById("add_button");
const nameResults = document.getElementById("name_results");
const deleteAllButton = document.getElementById("delete_all_button");
const messageResults = document.getElementById("message_results");
const increasingButton = document.getElementById("increasing_button");
const decreasingButton = document.getElementById("decreasing_button");

let orderInc = "asc";

document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
  addButton.addEventListener("click", addTaskName);
  todoName.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTaskName();
    }
  });
  deleteAllButton.addEventListener("click", deleteAllTasks);
  increasingButton.addEventListener("click", increasingSortTask);
  decreasingButton.addEventListener("click", decreasingSortTask);
});

function addTaskName() {
  const newTaskName = todoName.value.trim();
  if (newTaskName !== "") {
    todos.push({
      name: newTaskName,
      disabled: false,
    });

    sortTasks();

    todoName.value = "";
  }
}

function displayTasks() {
  nameResults.innerHTML = "";
  todos.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" 
        id="input_${index}" ${item.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="todo-p ${item.disabled ? "disabled" : ""} 
        onClick="editTask(${index})"> ${item.name} </p>
        <button id="${index}" class="delete-task" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toogleTask(index)
    );
    nameResults.appendChild(p);
  });
}

// function editTask(index) {
//   const todoTask = documen.getElementById(`todo-${index}`);
//   const exsitingText = todos[index].name;
//   const editOldTask = document.createElement("input");

//   editOldTask.value = exsitingText;
//   todoTask.replaceWith(editOldTask);
//   editOldTask.focus();

//   editOldTask.addEventListener("blur", function () {
//     const updateText = editOldTask.value.trim();
//     if (updateText) {
//       todos[index].name = updateText;
//       saveToLocalStorage();
//     }
//     displayTasks();
//   });
// }

function toogleTask(index) {
  todos[index].disabled = !todos[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllTasks() {
  todos = [];
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function increasingSortTask() {
  orderInc = "asc";
  todos.sort((a, b) => a.name.localeCompare(b.name));
  saveToLocalStorage();
  displayTasks();
}

function decreasingSortTask() {
  orderInc = "desc";
  todos.sort((a, b) => b.name.localeCompare(a.name));
  saveToLocalStorage();
  displayTasks();
}

function sortTasks() {
  if (orderInc === "asc") {
    increasingSortTask();
  } else {
    decreasingSortTask();
  }
}
