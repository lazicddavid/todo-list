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
console.log("-----------------------");
/*************************
 * 1) DOM ELEMENTI
 *************************/
const DOMElements = {
  form: document.getElementById("form"), // <form id="form"> (preporučeno da dodaš oko inputa)
  input: document.getElementById("input"),
  list: document.getElementById("list"), // <div id="list" class="todo-list">
};

/*************************
 * 2) STATE & LOGIKA (Manager)
 *************************/
const todoManager = {
  todos: [],

  addTodo(text) {
    const todo = {
      id: crypto.randomUUID(),
      text: text,
      done: false,
      createdAt: Date.now(),
    };
    this.todos.push(todo);
  },

  toggleDone(id) {
    const item = this.todos.find((t) => t.id === id);
    if (item) item.done = !item.done;
  },

  removeTodo(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  },
};

/*************************
 * 3) INPUT MANAGER
 *************************/
const inputManager = {
  textValue: "",

  setFromEvent(e) {
    this.textValue = e.target.value;
  },

  clear() {
    this.textValue = "";
    DOMElements.input.value = "";
  },
};

/*************************
 * RENDER (uvek iz niza)
 *************************/
function render() {
  DOMElements.list.innerHTML = "";
  todoManager.todos.forEach((t) => {
    const div = document.createElement("div");
    div.className = "todo-item";
    div.dataset.id = t.id;

    div.innerHTML = `
      <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
        <input type="checkbox" ${t.done ? "checked" : ""} />
        <span style="${
          t.done ? "text-decoration: line-through; opacity: .6;" : ""
        }">
          ${t.text}
        </span>
      </label>
      <button class="btn-remove" style="margin-left:auto;">✕</button>
    `;

    // mala raspodela da dugme ode desno
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "10px";

    DOMElements.list.appendChild(div);
  });
}

/*************************
 * LISTENERS (selektori su gore)
 *************************/
// 1) unos teksta u input
DOMElements.input.addEventListener("input", (e) => {
  inputManager.setFromEvent(e);
});

// 2) submit forme (Enter u inputu)
if (DOMElements.form) {
  DOMElements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = inputManager.textValue.trim();
    if (!text) return;

    todoManager.addTodo(text);
    inputManager.clear();
    render();
  });
}

// 3) delegacija nad listom: checkbox toggle + brisanje
DOMElements.list.addEventListener("click", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;

  const id = item.dataset.id;

  // klik na dugme za brisanje
  if (e.target.classList.contains("btn-remove")) {
    todoManager.removeTodo(id);
    render();
    return;
  }
});

DOMElements.list.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"]')) {
    const id = e.target.closest(".todo-item").dataset.id;
    todoManager.toggleDone(id);
    render();
  }
});

// inicijalno
render();
