export const state = {
  data: {
    incomplete: [],
    complete: [],
    erased: [],
  },

  listeners: [],

  // Descarga data desde localStorage.
  downloadState() {
    const responseStringi = localStorage.getItem("data");
    const response = JSON.parse(responseStringi);
    this.data.complete = response?.complete || [];
    this.data.incomplete = response?.incomplete || [];
    this.data.erased = response?.erased || [];
  },

  // Guarda data en localStorage.
  uploadState() {
    const dataStringi = JSON.stringify(this.data);
    console.log(dataStringi);
    localStorage.setItem("data", dataStringi);
  },

  // Devuelve data.
  getState() {
    this.downloadState();
    return this.data;
  },

  // Establece data.
  setState(newState) {
    this.data = newState;
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  // Agrega tarea incompleta.
  addIncomplete(newIncomplete) {
    this.data.incomplete.push(newIncomplete);
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  // Agrega tarea completa.
  addComplete(newComplete) {
    this.data.complete.push(newComplete);
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  // Remueve tarea incompleta y llama a agregarla como completa.
  changeToIncomplete(id) {
    const index = Number(id.match(/\d+/)[0]);
    const incompleteTask = this.data.complete
      .reverse()
      .splice(index, 1)
      .toString();
    this.data.complete.reverse();
    this.addIncomplete(incompleteTask);
  },

  // Remueve tarea completa y llama a agregarla como incompleta.
  changeToComplete(id) {
    const index = Number(id.match(/\d+/)[0]);
    const completeTask = this.data.incomplete
      .reverse()
      .splice(index, 1)
      .toString();
    this.data.incomplete.reverse();
    this.addComplete(completeTask);
  },

  // Borra tarea.
  eraseTask(id) {
    const index = Number(id.match(/\d+/)[0]);
    if (!id.includes("incomplete") && id.includes("complete")) {
      const erasedTask = this.data.complete
        .reverse()
        .splice(index, 1)
        .toString();
      this.data.complete.reverse();
      this.data.erased.push(erasedTask);
    } else {
      const erasedTask = this.data.incomplete
        .reverse()
        .splice(index, 1)
        .toString();
      this.data.complete.reverse();
      this.data.erased.push(erasedTask);
    }

    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
    console.log(this.data);
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
