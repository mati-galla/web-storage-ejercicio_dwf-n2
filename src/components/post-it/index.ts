export function initPostIt() {
  class PostItCE extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
    }

    render() {
      const originalText = this.textContent;
      const div = document.createElement("div");
      div.classList.add("post-it");
      div.tabIndex = -1;
      div.innerHTML = `
      <label for="">
      <p>${originalText}</p>
      <div class='post-it__icons-container'>
      <input type="checkbox" class="post-it__checkbox"/>
      <img src="" alt="" class="post-it__delete-button" >
      </div>
      </label>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
      .post-it {
        box-sizing: border-box;
        min-height: 110px;
        width: 310px;
        border-radius: 4px;
        padding: 20px;
        background-color: #fff599;
      }

      label {
        min-height: 70px;
        height: 100%;
        display: flex;
        justify-content: space-between;
      }
      
      .post-it__icons-container {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
      }

      input {
        width: 22px;
        height: 22px;
        flex: 0 0 22px;
      }

      input:hover {
        cursor: pointer;
      }
      
      img {
        display: none;
        width: 22px;
        height: 22px;
        flex: 0 0 22px;
        margin: 0 auto;
      }

      .post-it:focus img {
        display: initial;
      }

      img:hover {
        cursor: pointer;
      }

      `;

      const img = div.querySelector("img");
      // Genera ruta para poder importar la imagen al usar parcel.
      const src = new URL("../../icons/delete-icon.svg", import.meta.url);
      img.setAttribute("src", src.toString());

      // Marca como checked los checkbox de las tareas completadas
      if (!this.id.includes("incomplete") && this.id.includes("complete")) {
        const checkbox = div.querySelector("input");
        checkbox.checked = true;
      }

      this.shadow.appendChild(style);
      this.shadow.appendChild(div);
    }
  }

  customElements.define("post-it-ce", PostItCE);
}
