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

//napravi metodu editTask
//da se precrta kad je uradjen
//dodaj dugme clear all tasks
//ono treba da bude vidljivo samo ako ima jedan ili vise taskova
//kad se klikne na njega svi se taskovi isprazne

const taskList = {
  tasks: [],
  add(text) {
    const item = { id: crypto.randomUUID(), text, isDone: false };
    this.tasks.push(item);
    return item;
  },
  remove(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  },
};

function createTodoElement(item) {
  const element = document.createElement("div");
  element.className = "todo-item";
  element.dataset.id = item.id;

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = item.text;

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
    DOMElements.input.value = "";
  },
  getValue() {
    return this.value;
  },
};

DOMElements.input.addEventListener("input", (e) => {
  taskInput.changeInput(e.target.value);
});

DOMElements.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.getValue().trim();
  if (!text) return;

  //prikazivaanje//
  const item = taskList.add(text);
  const newTask = createTodoElement(item);

  DOMElements.list.appendChild(newTask);

  taskInput.reset();
});

DOMElements.list.addEventListener("click", (e) => {
  if (e.target.closest(".fa-trash")) {
    const taskEl = e.target.closest(".todo-item");
    if (!taskEl) return;

    const id = taskEl.dataset.id;
    taskList.tasks = taskList.tasks.filter((item) => item.id !== id);
    taskList.remove(id);
    taskEl.remove();
  }
});

DOMElements.list.addEventListener("click", (e) => {
  if (e.target.closest(".fa-solid.fa-pen-to-square")) {
    const taskList = {
      tasks: [],
      edit(id, newText) {
        const item = this.tasks.find((task) => task.id === id);
        if (item) item.text = newText;
      },
    };
    taskList.edit(id, newText);
  }
});
