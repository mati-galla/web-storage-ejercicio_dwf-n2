import { initPostIt } from "./components/post-it";
import { state } from "./state";

// Obtiene las tareas incompletas y completas del state y crea los post its.
// Inicia la función handlePostItEvents.
function renderTasksList() {
  const postItContainer = document.querySelector("#post-it-container");
  const data = state.getState();
  const incompleteTasks = data.incomplete.toReversed();
  const completeTasks = data.complete.toReversed();

  postItContainer.innerHTML = "";

  incompleteTasks.forEach((t, i) => {
    postItContainer.innerHTML =
      postItContainer.innerHTML +
      `<post-it-ce id='incomplete-task-${i}' tabindex="-1">${t}</post-it-ce>`;
  });

  completeTasks.forEach((t, i) => {
    postItContainer.innerHTML =
      postItContainer.innerHTML +
      `<post-it-ce id='complete-task-${i}' style='text-decoration: line-through' tabindex="-1">${t}</post-it-ce>`;
  });
  const postItEls = document.querySelectorAll("post-it-ce");
  postItEls.forEach((e: HTMLElement) => {
    handlePostItEvents(e);
  });
}

// Crea los listeners para los eventos del post it: marcar tareas como completas
// e incompletas, y eliminarlas.
function handlePostItEvents(postItCE: HTMLElement) {
  const postItDiv = postItCE.shadowRoot.querySelector<HTMLElement>(".post-it");
  postItDiv.addEventListener("click", () => {
    postItDiv.focus();
  });

  const postItCheckbox =
    postItCE.shadowRoot.querySelector<HTMLInputElement>(".post-it__checkbox");
  postItCheckbox.addEventListener("change", function () {
    if (this.checked) {
      state.changeToComplete(postItCE.id);
    } else {
      state.changeToIncomplete(postItCE.id);
    }
  });

  const deleteButton = postItCE.shadowRoot.querySelector(
    ".post-it__delete-button"
  );
  deleteButton.addEventListener("click", () => {
    state.eraseTask(postItCE.id);
  });
}

// Crea los listeners para los eventos del input: capitalizar primera letra en
// el textbox, crear nueva tarea al dar Enter o clickear el boton de "Agregar"
function handleInputEvents() {
  const addTaskInput =
    document.querySelector<HTMLInputElement>("#add-task-input");
  addTaskInput.addEventListener("input", function () {
    if (this.value.length > 0) {
      this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    }
  });

  const addTaskButton = document.getElementById("add-task-button");
  addTaskButton.addEventListener("click", () => {
    state.addIncomplete(addTaskInput.value);
    addTaskInput.value = "";
  });

  addTaskInput.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.code == "Enter" || event.code == "NumpadEnter") {
      addTaskButton.click();
    }
  });
}

// Importa el Custom Element, suscribe la lista de tareas al state e
// inicia las funciones renderTasksList y handleInputEvents
(function () {
  // localStorage.removeItem("data");
  initPostIt();
  state.suscribe(() => {
    renderTasksList();
  });

  renderTasksList();
  handleInputEvents();
})();
