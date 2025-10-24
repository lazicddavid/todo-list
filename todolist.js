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

//napravi metodu editTask
//da se precrta kad je uradjen
//dodaj dugme clear all tasks
//ono treba da bude vidljivo samo ako ima jedan ili vise taskova
//kad se klikne na njega svi se taskovi isprazne

console.log("---------------------------");

const DOMElements = {
  form: document.getElementById("form"),
  input: document.getElementById("input"),
  list: document.getElementById("list"),
  clearAll: document.getElementById("clearAll"),
};

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
  edit(id, newText) {
    const item = this.tasks.find((task) => task.id === id);
    if (item) item.text = newText;
  },
  toggleDone(id) {
    const t = this.tasks.find((x) => x.id === id);
    if (t) t.isDone = !t.isDone;
  },
  clear() {
    this.tasks = [];
  },
};

function updateList() {
  DOMElements.list.innerHTML = "";
  taskList.tasks.forEach((item) => {
    const el = createTodoElement(item);
    DOMElements.list.appendChild(el);
  });

  if (taskList.tasks.length > 0) {
    DOMElements.clearAll.style.display = "";
  } else {
    DOMElements.clearAll.style.display = "none";
  }
}

function createTodoElement(item) {
  const element = document.createElement("div");
  element.className = "todo-item";
  element.dataset.id = item.id;

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = item.text;
  if (item.isDone) span.style.textDecoration = "line-through";

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

  const text = taskInput.getValue();
  if (!text) return;

  taskList.add(text);
  taskInput.reset();
  updateList();
});

DOMElements.list.addEventListener("click", (e) => {
  const taskEl = e.target.closest(".todo-item");
  if (!taskEl) return;
  const id = taskEl.dataset.id;

  if (e.target.closest('button[title="Mark"], .fa-square-check')) {
    taskList.toggleDone(id);
    updateList();
    return;
  }

  if (e.target.closest('button[title="Edit"], .fa-pen-to-square')) {
    const textEl = taskEl.querySelector(".todo-text");
    const currentText = textEl.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";

    taskEl.replaceChild(input, textEl);
    console.log(taskList);
    function saveChange() {
      const newText = input.value;
      if (newText) {
        taskList.edit(id, newText);
      }
      updateList();
    }

    return;
  }

  if (e.target.closest(".fa-trash")) {
    taskList.remove(id);
    updateList();
  }
});

DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

updateList();

updateList();
