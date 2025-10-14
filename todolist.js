const DOMElements = {
  form: document.getElementById("form"),
  input: document.getElementById("input"),
  list: document.getElementById("list"),
};

const todoManager = {
  todos: [],
  add(text) {
    const todo = { id: crypto.randomUUID(), text };
    this.todos.push(todo);
    return todo;
  },
};

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

/***********************
 * Kreiranje JEDNE stavke (sa FA ikonicama)
 ***********************/
function createTodoElement(text) {
  const el = document.createElement("div");
  el.className = "todo-item";

  el.innerHTML = `
    <span class="todo-text">${escapeHtml(text)}</span>
    <div class="actions">
      <button class="icon-btn" title="Mark"><i class="fa-regular fa-square-check"></i></button>
      <button class="icon-btn" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="icon-btn" title="Delete"><i class="fa-solid fa-trash"></i></button>
    </div>
  `;

  el.querySelector(".todo-text").textContent = text;
  return el;
}

/***********************
 * LISTENERS
 ***********************/
DOMElements.input.addEventListener("input", (e) =>
  inputManager.setFromEvent(e)
);

DOMElements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = inputManager.textValue.trim();
  if (!text) return;

  const todo = todoManager.add(text);
  const node = createTodoElement(todo.text);
  DOMElements.list.appendChild(node);

  inputManager.clear();
});
