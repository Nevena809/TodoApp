let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoName = document.getElementById("todo_name");
const addButton = document.getElementById("add_button");
const nameResults = document.getElementById("name_results");
const deleteButton = document.getElementById("delete_button");
const messageResults = document.getElementById("message_results");

document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
  addButton.addEventListener("click", addTaskName);
  todoName.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTaskName();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
});

function addTaskName() {
  const newTaskName = todoName.value.trim();
  if (newTaskName !== "") {
    todos.push({
      name: newTaskName,
      disabled: false,
    });
    saveToLocalStorage();
    todoName.value = "";
    displayTasks();
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
      <p id="${index}" class="${item.disabled ? "disabled" : ""} 
      onClick="editTask(${index})"> ${item.name} </p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toogleTask(index)
    );
    nameResults.appendChild(p);
  });
}

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
