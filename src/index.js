// Date
const date = new Date();
const month = date.toLocaleDateString("default", { month: "short" });
const day = date.toLocaleDateString("default", { day: "numeric" });
const year = date.toLocaleDateString("default", { year: "numeric" });
const weekday = date.toLocaleDateString("default", { weekday: "long" });

console.log(weekday, month, day, year);

const dateInput = document.querySelector(".content>h3");
dateInput.textContent = `${weekday}, ${month} ${day}, ${year}`;

// get Input value

const inputElement = document.getElementById("input");

inputElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const msg = event.target[0].value;
  if (msg) {
    objectTodoHandler(msg);
  }
  event.target[0].value = "";
});

// put input value into an object and put the object into and array
let objectTodo = [];
function objectTodoHandler(msg) {
  let i = objectTodo.length;
  const id = `todo-${i}`;
  let obj = {};
  obj[id] = msg;
  const listElement = document.querySelector(".list");
  listElement.classList.remove("hide");
  objectTodo.push(obj);
  let str = JSON.stringify(objectTodo);
  if (localStorage.getItem("todo-list")) {
    localStorage.removeItem("todo-list");
  }
  localStorage.setItem("todo-list", str);
  showDOM(id, msg);
}

// Show the objects of todo
let list = document.getElementById("show-todo");

function showTodoHandler(arr) {
  arr.forEach((element) => {
    const id = Object.keys(element)[0];
    const msg = element[id];
    showDOM(id, msg);
  });
}

function showDOM(id, msg) {
  const newLi = document.createElement("li");
  const newInput = document.createElement("input");
  const newLabel = document.createElement("label");
  newInput.type = "checkbox";
  newInput.id = id;
  newLabel.setAttribute("for", id);
  newLabel.textContent = msg;
  newLi.append(newInput);
  newLi.append(newLabel);
  list.append(newLi);
}

//  fetch data from local storage and populate dom

if (localStorage.getItem("todo-list")) {
  objectTodo = JSON.parse(localStorage.getItem("todo-list"));
  showTodoHandler(objectTodo);
}
if (objectTodo.length === 0) {
  const listElement = document.querySelector(".list");
  listElement.classList.add("hide");
  // console.log(listElement);
}

//  strike through

const showTodoElement = document.querySelector("#show-todo");
// console.log(showTodoElement);

showTodoElement.addEventListener("change", (event) => {
  // console.log(event.target.id);
  const id = event.target.id;
  const lableSelect = document.querySelector(`label[for=${id}]`);
  lableSelect.classList.toggle("done");
});

//  Clear all
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  localStorage.clear();
  document.location.href = "/";
});
