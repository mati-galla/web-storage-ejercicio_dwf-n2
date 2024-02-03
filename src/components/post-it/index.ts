import { state } from "src/state";

export function initPostIt() {
  class PostItCE extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      state.suscribe(() => {
        this.render();
      });
      this.render();
    }

    render() {
      const div = document.createElement("div");
      div.classList.add("root");
      div.innerHTML = `
      <label for="">
      <input type="checkbox" />
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi tenetur incidunt quis aliquid quae alias et modi odio, eius necessitatibus illum quas ratione nihil ducimus culpa unde saepe. Assumenda, non.</p>
      </label>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
      .root {
        box-sizing: border-box;
        min-height: 110px;
        width: 310px;
        padding: 20px;
        background-color: #fff599;
      }

      .root label {
        display: flex;
        justify-content: space-between;
      }

      .root input {
        width: 20px;
        height: 20px;
        flex: 0 0 20px;
      }

      .root p {
        order: -1;
      }

      .root input:checked + p {
        text-decoration: line-through;
      }   
      `;

      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }

  customElements.define("post-it-ce", PostItCE);
}
