import { initPostIt } from "./components/post-it";
import { state } from "./state";

(function () {
  // localStorage.removeItem("data");
  initPostIt();
  function renderTasksList() {
    const data = state.getState();
    console.log(data);
    const incompleteTasks = data.incomplete.toReversed();
    const completeTasks = data.complete.toReversed();

    postItContainer.innerHTML = "";

    incompleteTasks.forEach((t, i) => {
      postItContainer.innerHTML =
        postItContainer.innerHTML +
        `<post-it-ce id='incomplete-task-${i}'>${t}</post-it-ce>`;
    });

    completeTasks.forEach((t, i) => {
      postItContainer.innerHTML =
        postItContainer.innerHTML +
        `<post-it-ce id='complete-task-${i}' style='text-decoration: line-through'>${t}</post-it-ce>`;
    });

    const postItCE = document.querySelectorAll("post-it-ce");
    postItCE.forEach((e) => {
      const postItCheckbox =
        e.shadowRoot.querySelector<HTMLInputElement>(".post-it__checkbox");
      postItCheckbox.addEventListener("change", function () {
        if (this.checked) {
          state.changeToComplete(e.id);
        } else {
          state.changeToIncomplete(e.id);
        }
      });

      const deleteButton = e.shadowRoot.querySelector(
        ".post-it__delete-button"
      );
      deleteButton.addEventListener("click", () => {
        state.eraseTask(e.id);
      });
    });
  }
  state.suscribe(() => {
    renderTasksList();
  });

  const addTaskButton = document.getElementById("add-task-button");
  addTaskButton.addEventListener("click", () => {
    state.addIncomplete(addTaskInpunt.value);
    addTaskInpunt.value = "";
  });

  const addTaskInpunt =
    document.querySelector<HTMLInputElement>("#add-task-input");
  addTaskInpunt.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.code == "Enter") {
      addTaskButton.click();
    }
  });

  const postItContainer = document.querySelector("#post-it-container");
  renderTasksList();
})();
