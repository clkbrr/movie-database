import { LitElement, html, css } from "lit-element";

export class Popup extends LitElement {

  static styles = css`
  .popup {
  width: 90%;
  height:90%;
  display:flex;
  flex-direction:row;
  background-color: #FF9494;
  border-radius: 6px;
  box-sizing: border-box;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  top:50%;
  left: 50%;
  text-align:center;
  padding: 0 30px 30px;
  color: #333;
  transition: transform 0.4s, top 0.4s;
}

.popup .close_btn {
    position:absolute;
    font-size:20px;
    border: none;
    margin-right:80px;
    right:0;
    top:0;
    border-radius:50%;
    background: transparent;
    opacity:0.8;
    cursor:pointer;
}

.close_btn:hover {
  opacity: 1;
}

.close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: #333;
}

.close_btn:after {
  transform: rotate(-45deg);
}

.popup img {
  margin-top:10%;
}

.info {
  display:flex;
  flex-direction:column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  padding-bottom: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.info p {
  display:inline-block;
  box-sizing: border-box;
  color: whitesmoke;
  text-align: start;
  font-size-adjust: 0.58;
  margin-bottom:10px;
}

.info p span {
  color: white;
  font-weight:600;
}

.info .title {
  font-size:25px;
  text-align:center;
}
 `;

  static get properties() {
    return {
      id: { type: Number },

      title: { type: String },

      year: { type: Number },

      poster: { type: String },

      director: { type: String },

      actors: {},

      actor: { type: String },

      description: { type: String },

      categories: {},

      category: { type: String },

      country: { type: String }
    }
  }
  constructor() {
    super();

    this.id = this.getAttribute('film_id');
    this.title = this.getAttribute('title');
    this.year = this.getAttribute('year');
    this.poster = this.getAttribute('poster');
    this.director = this.getAttribute("director");
    this.actors = this.getAttribute("actors");
    this.actor = this.getAttribute("actor");
    this.categories = this.getAttribute('category');
    this.country = this.getAttribute('country');
    this.description = this.getAttribute('description');
  }

  render() {
    return html`
        <div class="popup" id="popup">
              <button type="button" class="close_btn" @click="${() => {
        document.querySelector('.popup').removeChild(this);
      }}">X</button>
              
              <img src=${this.getAttribute("poster")} />

              <div class="info">

              <h3 class="title">${this.title}</h3>

              <p class="year"><span>Year:&nbsp;</span>${this.getAttribute('year')}</p>

              <p class="country"><span>Country:&nbsp;</span>${this.country}</p>

              <p class="category"><span>Category:&nbsp;</span>${this.getAttribute('category')}</p>

              <p class="director"><span>Director:&nbsp;</span>${this.director}</p>

              <p class="actors"><span>Stars:&nbsp;</span>${this.actor}</p>

              <p class="desc"><span>Plot:&nbsp;</span>${this.description}</p>
              </div>
        </div>
        
        `;
  }
}

customElements.define('lit-popup', Popup);