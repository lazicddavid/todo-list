/*
const DOMElements = {
  buttonNewBook = document.getElementById("btnNewBook");
}
const bookManager = {
  library: [],
  addBook(book) {
    this.library.push(book)
  }
} 

const inputManager = {
  titleValue: "";
}
*/

console.log("---------------------------");

const DOMElements = {
  form: document.getElementById("form"),
  input: document.getElementById("input"),
  list: document.getElementById("list"),
};

const taskList = {
  tasks: [],
  add(text) {
    const item = { id: crypto.randomUUID(), text };
    this.tasks.push(item);
    return item;
  },
};

const taskInput = {
  text: "",
  changeInput(e) {
    this.text = e.target.value;
  },
  reset() {
    this.text = "";
    DOMElements.input.value = "";
  },
};

function createTodoElement(text, id) {
  const element = document.createElement("div");
  element.className = "todo-item";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.innerHTML = `
    <button class="icon-btn" title="Mark"><i class="fa-regular fa-square-check"></i></button>
    <button class="icon-btn" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="icon-btn" title="Delete"><i class="fa-solid fa-trash"></i></button>
  `;

  element.append(span, actions);
  return element;
}

DOMElements.input.addEventListener("input", (e) => taskInput.changeInput(e));

DOMElements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.text.trim();
  if (!text) return;

  const item = taskList.add(text);
  const newTask = createTodoElement(item.text, item.id);
  DOMElements.list.appendChild(newTask);

  taskInput.reset();
});
