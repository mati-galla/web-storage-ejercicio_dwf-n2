export const state = {
  data: {
    incomplete: [],
    complete: [],
    erased: [],
  },

  listeners: [],

  downloadState() {
    const responseStringi = localStorage.getItem("data");
    console.log(responseStringi);
    const response = JSON.parse(responseStringi);
    this.data.complete = response?.complete || [];
    this.data.incomplete = response?.incomplete || [];
    this.data.erased = response?.erased || [];
  },

  uploadState() {
    const dataStringi = JSON.stringify(this.data);
    console.log(dataStringi);
    localStorage.setItem("data", dataStringi);
  },

  getState() {
    this.downloadState();
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  addIncomplete(newIncomplete) {
    this.data.incomplete.push(newIncomplete);
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  addComplete(newComplete) {
    console.log(newComplete);
    this.data.complete.push(newComplete);
    this.uploadState();
    for (const cb of this.listeners) {
      cb();
    }
  },

  changeToIncomplete(id) {
    const index = Number(id.match(/\d+/)[0]);
    const incompleteTask = this.data.complete
      .reverse()
      .splice(index, 1)
      .toString();
    this.data.complete.reverse();
    this.addIncomplete(incompleteTask);
  },

  changeToComplete(id) {
    const index = Number(id.match(/\d+/)[0]);
    const completeTask = this.data.incomplete
      .reverse()
      .splice(index, 1)
      .toString();
    this.data.incomplete.reverse();
    this.addComplete(completeTask);
  },

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
