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

const inputState = {
  text: "",
  change(e) {
    this.text = e.target.value;
  },
  clear() {
    this.text = "";
    DOMElements.input.value = "";
  },
};

function createTodoElement(text) {
  const el = document.createElement("div");
  el.className = "todo-item";

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

  el.append(span, actions);
  return el;
}
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
