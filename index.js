let todos = [];

async function getTodos() {
  const url = new URL(
    `https://66d556e5f5859a704265a896.mockapi.io/api/v1/todos?sortBy=message&order=${orderInc}`
  );
  // url.searchParams.append("sortBy", "message");

  // url.searchParams.append("order", orderInc);
  await fetch(url)
    .then((response) => response.json())
    .then((data) => (todos = data));
}

async function addTodos() {
  const newTaskName = todoName.value;
  await fetch("https://66d556e5f5859a704265a896.mockapi.io/api/v1/todos", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      message: newTaskName,
      done: false,
    }),
  });
}

async function deleteTodos(id) {
  await fetch(
    "https://66d556e5f5859a704265a896.mockapi.io/api/v1/todos/" + id,
    {
      method: "DELETE",
    }
  );
}

const todoName = document.getElementById("todo_name");
const addButton = document.getElementById("add_button");
const nameResults = document.getElementById("name_results");
const messageResults = document.getElementById("message_results");
const increasingButton = document.getElementById("increasing_button");
const decreasingButton = document.getElementById("decreasing_button");

let orderInc = "asc";

document.addEventListener("DOMContentLoaded", async function () {
  await getTodos();
  displayTasks();
  addButton.addEventListener("click", addTaskName);
  todoName.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTaskName();
    }
  });

  increasingButton.addEventListener("click", increasingSortTask);
  decreasingButton.addEventListener("click", decreasingSortTask);
});

async function addTaskName() {
  const newTaskName = todoName.value;
  if (newTaskName !== "") {
    await addTodos();
    displayTasks();

    todoName.value = "";
  }
}

async function displayTasks() {
  await getTodos();

  nameResults.innerHTML = "";
  todos.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" 
        id="input_${index}" ${item.done ? "checked" : ""}>
        <p id="todo-${index}" class="todo-p ${item.done ? "disabled" : ""}" 
        onclick="editTask(${index})"> ${item.message} </p>
        <button id="${index}" class="delete-task" onclick="deleteTask(${
      item.id
    })">Delete</button>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toogleTask(index)
    );

    nameResults.appendChild(p);
  });
}

async function editTodos(id, updateText) {
  await fetch(
    `https://66d556e5f5859a704265a896.mockapi.io/api/v1/todos/` + id,
    {
      headers: { "content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        message: updateText,
      }),
    }
  );
}

function editTask(index) {
  const todoTask = document.getElementById(`todo-${index}`);
  const existingText = todos[index].message;
  const InputTask = document.createElement("input");

  InputTask.value = existingText;
  todoTask.replaceWith(InputTask);
  InputTask.focus();

  //CSS
  InputTask.style["border-radius"] = "10px";
  InputTask.style["padding"] = "10px";
  InputTask.style["margin"] = "15px";

  InputTask.addEventListener("blur", async function () {
    const updateText = InputTask.value.trim();
    if (updateText) {
      await editTodos(todos[index].id, updateText);
      console.log("hello");
    }

    displayTasks();
  });

  InputTask.addEventListener("keydown", async function (event) {
    if (event.key === "Enter") {
      const updateText = InputTask.value.trim();
      if (updateText) {
        await editTodos(todos[index].id, updateText);
      }
      displayTasks();
    }
  });
}

async function toogleTask(index) {
  todos[index].done = !todos[index].done;

  await fetch(
    `https://66d556e5f5859a704265a896.mockapi.io/api/v1/todos/${todos[index].id}`,
    {
      headers: { "content-type": "application/json" },
      method: "PUT",
      body: JSON.stringify(todos[index]),
    }
  );

  displayTasks();
}

async function deleteTask(id) {
  await deleteTodos(id);

  displayTasks();
}

async function increasingSortTask() {
  orderInc = "asc";

  displayTasks();
}

async function decreasingSortTask() {
  orderInc = "desc";

  displayTasks();
}

function sortTasks() {
  if (orderInc === "asc") {
    increasingSortTask();
  } else {
    decreasingSortTask();
  }
}
