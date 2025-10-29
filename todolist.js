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
/*
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

  finishEditing(id, newText) {
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
//napraviti ovo kao u primeru ispod sa innerHTMl
function updateList() {
  // 1. Krenemo od praznog HTML-a za listu
  let html = "";

  // 2. Prolazimo kroz sve taskove i za svaki gradimo jedan blok HTML-a
  taskList.tasks.forEach((item) => {
    // deo za glavni sadržaj (text ili input u zavisnosti od isEditing)
    const mainContentHTML =
      item.isEditing === true
        ? `
        <input
          type="text"
          class="edit-input"
          value="${item.text}"
          data-id="${item.id}"
          data-role="edit-input"
        />
      `
        : `
        <p
          class="todo-text"
          style="text-decoration: ${item.isDone ? "line-through" : "none"}"
        >
          ${item.text}
        </p>
      `;
    // jedna kartica taska (todo-item)
    html += `
      <div class="todo-item" data-id="${item.id}">
        ${mainContentHTML}
        ${actionsHTML}
      </div>
    `;
  });

  // 3. Upis u DOM samo jednom
  DOMElements.list.innerHTML = html;

  // 4. Sad moramo da vratimo ponašanje za input (blur i Enter)
  // zato što sa innerHTML više nemamo addEventListener iznad
  const editInputs = DOMElements.list.querySelectorAll('[data-role="edit-input"]');
  editInputs.forEach((inputEl) => {
    const currentId = inputEl.getAttribute("data-id");

    inputEl.addEventListener("blur", () => {
      taskList.finishEditing(currentId, inputEl.value);
      updateList();
    });

    inputEl.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        taskList.finishEditing(currentId, inputEl.value);
        updateList();
      }
    });
  });
}
    const actions = document.createElement("div");
    actions.className = "actions";
    const isEdit = false;
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
  //napraviti funkciju getTasks
  /*
  if (taskList.tasks.length > 0) {
    DOMElements.clearAll.style.display = "";
  } else {
    DOMElements.clearAll.style.display = "none";
  }
}
  

  function clearButtons() {
    const tasks = taskList.getTasks().length > 0;
    DOMElements.clearAll.style.display = tasks ? "" : "none";
  }
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
    return this.value.trim();
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
  if (!id) return;

  const btn = e.target.closest("button.icon-btn");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "mark") {
    taskList.toggleDone(id);
    updateList();
    return;
  }

  if (action === "edit") {
    ("");
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
//napraviti edit sa ovim event target propagation

DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

*/
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

  finishEditing(id, newText) {
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

  // Dodato jer si koristio getTasks() u jednoj verziji
  getTasks() {
    return this.tasks;
  },
};

function updateList() {
  // HTML koji ćemo ubaciti u listu
  let html = "";

  // HTML za dugmad (akcije)
  const actionsHTML = `
    <div class="actions">
      <button class="icon-btn" data-action="mark" title="Mark">
        <i class="fa-regular fa-square-check"></i>
      </button>
      <button class="icon-btn" data-action="edit" title="Edit">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button class="icon-btn" data-action="delete" title="Delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  // Prolazimo kroz sve taskove i pravimo kartice
  taskList.tasks.forEach((item) => {
    // Ako je u režimu editovanja -> prikaži <input>
    // Ako nije -> prikaži <p>
    const mainContentHTML =
      item.isEditing === true
        ? `
        <input
          type="text"
          class="edit-input"
          value="${item.text}"
          data-id="${item.id}"
          data-role="edit-input"
        />
      `
        : `
        <p
          class="todo-text"
          style="text-decoration: ${item.isDone ? "line-through" : "none"}"
        >
          ${item.text}
        </p>
      `;

    html += `
      <div class="todo-item" data-id="${item.id}">
        ${mainContentHTML}
        ${actionsHTML}
      </div>
    `;
  });

  // Upiši sve u DOM odjednom
  DOMElements.list.innerHTML = html;

  // Podesi vidljivost dugmeta "Clear All"
  DOMElements.clearAll.style.display = taskList.tasks.length > 0 ? "" : "none";

  // Ponovo vežemo event listenere za edit input polja
  const editInputs = DOMElements.list.querySelectorAll(
    '[data-role="edit-input"]'
  );

  editInputs.forEach((inputEl) => {
    const currentId = inputEl.getAttribute("data-id");

    // Kada izgubi fokus -> sačuvaj izmene
    inputEl.addEventListener("blur", () => {
      taskList.finishEditing(currentId, inputEl.value);
      updateList();
    });

    // Kada pritisne Enter -> sačuvaj izmene
    inputEl.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        taskList.finishEditing(currentId, inputEl.value);
        updateList();
      }
    });

    // (bonus kvalitet života) Auto fokus i selekcija teksta kad uđeš u edit
    inputEl.focus();
    inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
  });
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
    return this.value.trim();
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
  // Pronađi ceo task na koji je kliknuto
  const taskEl = e.target.closest(".todo-item");
  if (!taskEl) return;

  const id = taskEl.dataset.id;
  if (!id) return;

  // Proveri koji je tačno button kliknut
  const btn = e.target.closest("button.icon-btn");
  if (!btn) return;

  const action = btn.dataset.action;

  if (action === "mark") {
    taskList.toggleDone(id);
    updateList();
    return;
  }

  if (action === "edit") {
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

//napraviti edit sa ovim event target propagation

// Clear All
DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

DOMElements.clearAll.style.display = "none";
