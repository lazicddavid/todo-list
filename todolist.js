const DOMElements = {
  form: document.getElementById("form"),
  input: document.getElementById("input"),
  list: document.getElementById("list"),
  clearAll: document.getElementById("clearAll"),
};
function createTask(text) {
  const item = {
    id: crypto.randomUUID(),
    text,
    isDone: false,
    isEditing: false,
  };
  return item;
}
const taskList = {
  tasks: [],

  add(item) {
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

  taskList.tasks.forEach((item) => {
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

  DOMElements.list.innerHTML = html;

  DOMElements.clearAll.style.display = taskList.tasks.length > 0 ? "" : "none";

  const editInputs = DOMElements.list.querySelectorAll(
    '[data-role="edit-input"]'
  );

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
  const task = createTask(text);
  taskList.add(task);
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

DOMElements.clearAll.addEventListener("click", () => {
  if (!taskList.tasks.length) return;
  taskList.clear();
  updateList();
});

DOMElements.clearAll.style.display = "none";
