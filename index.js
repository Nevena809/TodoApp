let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoName = document.getElementById("todo_name");
const userMessage = document.getElementById("user_message");
const addButton = document.getElementById("button");
const nameResults = document.getElementById("name_results");
const messageResults = document.getElementById("message_results");

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTaskName);
  todoName.addEventListener("keydown", function (e) {
    if (e.key === "Entry") {
      e.preventDefault();
      addTaskName();
      addTaskMessage();
      console.log(todo);
    }
  });
});

function addTaskName() {
  const newTaskName = todoName.value.trim();
  const newTaskMessage = userMessage.value.trim();
  if (newTaskName !== "" && newTaskMessage !== "") {
    todo.push({
      name: newTaskName,
      message: newTaskMessage,
    });
    saveToLocalStorage();
    todoName.value = "";
    userMessage.value = "";
    displayTasks();
  }
}

function displayTasks() {
  // nameResults.innerHTML = "";
  // todo.forEach((item, index) => {
  //   const text = document.createElement("p");
  //   package.innerHTML = `
  //     <div class="todo-container">
  //     </div>
  //   `;
  // });
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
