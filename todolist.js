const DOMElements = {
  form: document.getElementById("form"),
  input: document.getElementById("input"),
  list: document.getElementById("list"),
  clearAll: document.getElementById("clearAll"),
};

function createTask(text) {
  return {
    id: crypto.randomUUID(),
    text,
    isDone: false,
    isEditing: false,

    toggleDone() {
      this.isDone = !this.isDone;
    },
    startEdit() {
      this.isEditing = true;
    },
    finishEdit(newText) {
      if (typeof newText === "string" && newText !== "") {
        this.text = newText;
      }
      this.isEditing = false;
    },
  };
}

const taskList = {
  tasks: [],
  activeId: null,

  add(item) {
    this.tasks.push(item);
    return item;
  },

  remove(id) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    if (this.activeId === id) this.activeId = null;
  },

  getById(id) {
    return this.tasks.find((task) => task.id === id) || null;
  },

  setActive(id) {
    this.activeId = id;
  },

  getActive() {
    return this.getById(this.activeId);
  },

  clear() {
    this.tasks = [];
    this.activeId = null;
  },

  getTasks() {
    return this.tasks;
  },
};

function updateList() {
  let html = "";

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

  taskList.tasks.forEach((task) => {
    const mainContentHTML = task.isEditing
      ? `
        <input
          type="text"
          class="edit-input"
          value="${task.text}"
          data-id="${task.id}"
          data-role="edit-input"
        />
      `
      : `
        <p
          class="todo-text"
          style="text-decoration: ${task.isDone ? "line-through" : "none"}"
        >
          ${task.text}
        </p>
      `;

    html += `
      <div class="todo-item" data-id="${task.id}">
        ${mainContentHTML}
        ${actionsHTML}
      </div>
    `;
  });

  DOMElements.list.innerHTML = html;
  DOMElements.clearAll.style.display = taskList.tasks.length > 0 ? "" : "none";
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

DOMElements.input.addEventListener("input", (event) => {
  taskInput.changeInput(event.target.value);
});

DOMElements.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = taskInput.getValue();
  if (!text) return;

  const task = createTask(text);
  taskList.add(task);
  taskInput.reset();
  updateList();
});

DOMElements.list.addEventListener("click", (event) => {
  const taskElement = event.target.closest(".todo-item");
  if (!taskElement) return;

  const id = taskElement.dataset.id;
  if (!id) return;

  const buttonElement = event.target.closest("button.icon-btn");
  if (!buttonElement) return;

  const actionName = buttonElement.dataset.action;
  const foundTask = taskList.getById(id);
  if (!foundTask) return;

  if (actionName === "mark") {
    foundTask.toggleDone();
    updateList();
    return;
  }

  if (actionName === "edit") {
    if (!foundTask.isEditing) {
      taskList.setActive(id);
      foundTask.startEdit();
      updateList();
    } else {
      const inputElement = taskElement.querySelector(
        '[data-role="edit-input"]'
      );
      const newText = inputElement ? inputElement.value : "";
      foundTask.finishEdit(newText);
      taskList.setActive(null);
      updateList();
    }
    return;
  }

  if (actionName === "delete") {
    taskList.remove(id);
    updateList();
    return;
  }
});

DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

DOMElements.clearAll.style.display = "none";
