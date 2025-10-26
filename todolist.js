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
    const item = {
      id: crypto.randomUUID(),
      text,
      isDone: false,
      isEditing: false,
    };
    this.tasks.push(item);
    return item;
  },

  remove(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  },

  editText(id, newText) {
    const item = this.tasks.find((task) => task.id === id);
    if (item) item.text = newText;
  },

  toggleDone(id) {
    const t = this.tasks.find((x) => x.id === id);
    if (t) t.isDone = !t.isDone;
  },

  startEdit(id) {
    const t = this.tasks.find((x) => x.id === id);
    if (t) t.isEditing = true;
  },

  finishEdit(id, newText) {
    const t = this.tasks.find((x) => x.id === id);
    if (!t) return;
    if (newText && newText.trim() !== "") {
      t.text = newText.trim();
    }
    t.isEditing = false;
  },

  clear() {
    this.tasks = [];
  },
};

// RENDER FUNKCIJA
function updateList() {
  DOMElements.list.innerHTML = "";

  taskList.tasks.forEach((item) => {
    // glavni kontejner za jedan task
    const taskEl = document.createElement("div");
    taskEl.className = "todo-item";
    taskEl.dataset.id = item.id;

    // LEVA STRANA: ili paragraf ili input, zavisi od isEditing
    let mainContentEl;
    if (item.isEditing === true) {
      // ako je u edit modu -> input
      const input = document.createElement("input");
      input.type = "text";
      input.value = item.text;
      input.className = "edit-input";

      // kad izgubi fokus ili Enter -> završavamo edit
      function saveAndClose() {
        taskList.finishEdit(item.id, input.value);
        updateList();
      }

      input.addEventListener("blur", saveAndClose);
      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          saveAndClose();
        }
      });

      // fokus odmah
      queueMicrotask(() => {
        input.focus();
        input.select();
      });

      mainContentEl = input;
    } else {
      // ako NIJE u edit modu -> normalan tekst
      const textEl = document.createElement("p");
      textEl.className = "todo-text";
      textEl.textContent = item.text;
      if (item.isDone) {
        textEl.style.textDecoration = "line-through";
      }
      mainContentEl = textEl;
    }

    // DESNA STRANA: dugmići
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.innerHTML = `
      <button class="icon-btn" data-action="mark" title="Mark">
        <i class="fa-regular fa-square-check"></i>
      </button>
      <button class="icon-btn" data-action="edit" title="Edit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon-btn" data-action="delete" title="Delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    taskEl.append(mainContentEl, actions);
    DOMElements.list.appendChild(taskEl);
  });

  // pokaži / sakrij Clear All
  if (taskList.tasks.length > 0) {
    DOMElements.clearAll.style.display = "";
  } else {
    DOMElements.clearAll.style.display = "none";
  }
}

// menadžer input polja na vrhu forme
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
    return this.value.trim();
  },
};

// kad kucaš u glavni input
DOMElements.input.addEventListener("input", (e) => {
  taskInput.changeInput(e.target.value);
});

// kad submituješ formu (Add task)
DOMElements.form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = taskInput.getValue();
  if (!text) return;

  taskList.add(text);
  taskInput.reset();
  updateList();
});

// delegacija klikova na dugmad unutar liste
DOMElements.list.addEventListener("click", (e) => {
  const taskEl = e.target.closest(".todo-item");
  if (!taskEl) return;

  const id = taskEl.dataset.id;
  if (!id) return;

  // vidimo koji je kliknuti action
  const btn = e.target.closest("button.icon-btn");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "mark") {
    taskList.toggleDone(id);
    updateList();
    return;
  }

  if (action === "edit") {
    // klik na Edit: samo postavi isEditing = true i rerenderuj
    taskList.startEdit(id);
    updateList();
    return;
  }

  if (action === "delete") {
    taskList.remove(id);
    updateList();
    return;
  }
});

// clear all dugme
DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

// inicijalni render
updateList();
