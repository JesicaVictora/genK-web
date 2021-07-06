import { css, html, LitElement, render } from 'lit';
import logo from "../assets/img/logo.png";
import './menu.component.css'

export class MenuComponent extends LitElement {

  constructor() {
    super();

  }

  static get styles() {
    return css`
      
       
        `
  }

  render() {

    return html`
        <div class="nav__container">
        <img src="${logo}" alt="PokePortal logo">
        <nav>
            <ul id="menu">
                <li><a href="/">Home</a></li>
                <li><a href="/pokedex">Pokedex</a></li>
                <li><a href="/pokemon">Pokemon List</a></li>

            </ul>
        </nav>
        <div class="icon" @click="${() => this.showMenu()}"> 
            <div class="stripe"></div>
            <div class="stripe"></div>
            <div class="stripe"></div>  
        </div>

    </div>
     `;
  }

  createRenderRoot() {
    return this;
  }

  showMenu() {

    //let menu = this.shadowRoot.getElementById("menu");
    let menu = document.getElementById("menu");
    console.log(menu);
    if (menu.style.visibility === "visible") {

      menu.style.visibility = "hidden";

    } else {
      menu.style.visibility = "visible";

    }
  };

}

customElements.define('menu-component', MenuComponent);