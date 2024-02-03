export const state = {
  data: {
    incomplete: [],
    complete: [],
    erased: [],
  },

  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
