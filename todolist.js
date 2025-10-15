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
const taskInput = {
  value: "",
  changeInput(value) {
    this.value = value;
  },
  reset() {
    this.value = "";
  },
  getValue() {
    return this.value;
  },
};
function createTask(textValue) {
  return {
    text: textValue,
    id: crypto.randomUUID(),
    reset() {
      this.text = "";
    },
    getText() {
      return this.text;
    },
  };
}

DOMElements.input.addEventListener("input", (e) =>
  taskInput.changeInput(e.target.value)
);

DOMElements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = createTask(taskInput.getValue());
  console.log(task);
  taskList.add(task);
  const newTask = createTodoElement(item.text, item.id);
  DOMElements.list.appendChild(newTask);

  taskInput.reset();
});

//brisanje
//prikazivanje

//izbaciti item.text i item.id
