import { LitElement, html, css } from "lit-element";
import { deleteFavourites, getFavs, isFavExist, postFavourites, prepareComment, preparePopup } from "../../assets/js/app";
import heartFilled from '@alaskaairux/icons/dist/icons/interface/heart-filled_es6';
import heartStroke from '@alaskaairux/icons/dist/icons/interface/heart-stroke_es6';
import informationStroke from "@alaskaairux/icons/dist/icons/alert/information-stroke_es6";
import searchSvg from "@alaskaairux/icons/dist/icons/interface/search_es6";

export class MovieCard extends LitElement {

  static styles = css`
  .movie-container {
  display:flex;
  position:relative;
  flex-wrap:wrap;
  width:90%;
  box-sizing: border-box;
  margin: auto;
  background-color: #f4f4f4;
  margin-left:70px;
  border: 1px solid #c00000;
  border-bottom: 3px solid #c00000;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top:15px;
}

.movie-container h4 {
  color:blue;
  position: absolute;
  right:0;
  top:-5%;
  margin-right:10px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin:auto;
}

.image-container img {
  width: 130px;
  height: 130px;
  border-radius: 50%;
}

.info {
  display:flex;
  flex-wrap:wrap;
  height: 100%;
  width: 90%;
  box-sizing: border-box;
  padding: 0 10px;
  padding-bottom: 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.info p {
  display:inline-block;
  width: 250px;
  box-sizing: border-box;
  color: #666;
  text-align: start;
  font-size-adjust: 0.58;
  margin-bottom:10px;
}

.info p span {
  color: #FA7070;
}

.info .title {
  font-size:15px;
}

.action_container{
  width:90px;
  text-align:center;
  position: absolute;
  right: 0;
  bottom:0;
  text-align:end;
}

.action_container:after {
    position: absolute;
    content: '';
    width: 50px;
    height: 50px;
  }

.action_btn > svg {
  pointer-events: none;
}

.detailsBtn_container {
  display:flex;
  justify-content:start;
  position:absolute;
  width:90px;
  text-align:center;
  left:0;
}

.detailsBtn_container:after {
    position:absolute;
    content: '';
    width: 50px;
    height: 50px;
  }

.detailsBtn_container:after{
  pointer-events: none;
}
  .detailsBtn_container > svg {
  pointer-events: none;
}

.button {
  width: 40%;
  border:none;
  background:transparent;
  cursor:pointer;
}

.details_button {
  width: 40%;
  border:none;
  background:transparent;
  color:blue;
  cursor:pointer;
}

.commments_button {
  width: 40%;
  border:none;
  background:transparent;
  color:blue;
  cursor:pointer;
}
`;

  static get properties() {

    return {

      id: { type: Number },

      title: { type: String },

      release_year: { type: Number },

      imdb: { type: Number },

      poster: { type: String },

      director: { type: String },

      actors: {},

      actor: { type: String },

      description: { type: String },

      categories: {},

      category: { type: String },

      country: { type: String },

      movie: {}
    }

  }

  constructor() {
    super();

    this.movie = this.getAttribute('movie');

    this.id = this.getAttribute('film_id');
    this.title = this.getAttribute('title');
    this.release_year = this.getAttribute('year');
    this.imdb = this.getAttribute('imdb');
    this.poster = this.getAttribute('poster');
    this.director = this.getAttribute("director");
    this.actors = this.getAttribute("actors");
    this.actor = this.getAttribute("actor");
    this.categories = this.getAttribute('categories');
    this.category = this.getAttribute('category');
    this.country = this.getAttribute('country');
  }

  updated() {
    // Film veritabaninda favoriler tablosunda ekli mi diye bakar
    var favsButton;

    if (isFavExist(parseInt(this.getAttribute('film_id')))) {
      favsButton = this.shadowRoot.getElementById(`${this.getAttribute('film_id')}`);
      favsButton.innerHTML = `<span class="button__text" style="color: red">${heartFilled.svg}</span>`;
    }
    else {
      favsButton = this.shadowRoot.getElementById(`${this.getAttribute('film_id')}`);
      favsButton.innerHTML = `<span class="button__text" style="color: red">${heartStroke.svg}</span>`;
    }

    //------------------------------------------------------------------------------------------------------

    //Kullanici login degilse fav butonlari disable olur
    let btnFavs = this.shadowRoot.querySelector('.btnPostFavs');

    if (localStorage.getItem('currentUser') == null) {
      btnFavs.style.display = 'none';
    }
  }

  // Iconlar icin
  generateIconHtml(svgContent) {
    const dom = new DOMParser().parseFromString(svgContent, 'text/html'),
      svg = dom.body.firstChild;

    return svg
  }

  postFavs() {
    postFavourites(this.getAttribute('film_id'));
  }

  deleteFavs() {
    deleteFavourites(this.getAttribute('film_id'));
  }

  // Filmi favorilere ekler veya cikarir
  async isFavDelete() {
    var favsButton;
    var favList = await getFavs();

    var favExist = false;

    if (favList.favMovies != undefined) {
      for (let i = 0; i < favList.favMovies.length; i++) {
        if (parseInt(this.getAttribute('film_id')) == favList.favMovies[i].filmId) {
          favExist = true;

        }
      }
    }

    if (favExist) {
      this.deleteFavs();
      favsButton = this.shadowRoot.getElementById(`${this.getAttribute('film_id')}`);
      favsButton.innerHTML = `<span class="button__text" style="color: red">${heartStroke.svg}</span>`;
    } else {
      this.postFavs();
      favsButton = this.shadowRoot.getElementById(`${this.getAttribute('film_id')}`);
      favsButton.innerHTML = `<span class="button__text" style="color: red">${heartFilled.svg}</span>`;
    }
  }

  openPopup(movie) {
    preparePopup(movie);
  }

  openCommentsPage(movie) {
    prepareComment(movie);
  }

  render() {
    return this.actors
      ? html`
      
          <div class="movie-container">
             <h4>Imdb: <span style="color:green">${this.imdb}</span></h4>
              <div class="action_container">
              <button type="button" class="button btnPostFavs" id="${this.getAttribute('film_id')}" @click="${this.isFavDelete}">
                <span class="button__text">${this.generateIconHtml(heartStroke.svg)}</span>
              </button>
              </div>
              <div class="detailsBtn_container">
                <button type="submit" class="details_button" @click="${() => this.openPopup(this.movie)
        }">${this.generateIconHtml(searchSvg.svg)}</button>
        <button type="submit" class="commments_button" @click="${() => this.openCommentsPage(this.movie)
        }">${this.generateIconHtml(informationStroke.svg)}</button>
              </div>
            <div class="image-container">
              <img src=${this.getAttribute("poster")} />
            </div>

            <div class="info" id="info">
              <h3 class="title">${this.title}</h3>

              <p class="category"><span>Genre:&nbsp;</span>${this.getAttribute('categories')}</p>

              <p class="year"><span>Year:&nbsp;</span>${this.getAttribute('year')}</p>

              <p class="director"><span>Director:&nbsp;</span>${this.director}</p>

              <p class="actors"><span>Stars:&nbsp;</span>${this.actors}</p>
            </div>
          </div>       `
      : html`
          <div class="movie-container">
            <h4>Imdb: <span style="color:green">${this.getAttribute('imdb')}</span></h4>
            <div class="action_container">
              <button type="button" class="button btnPostFavs" id="${this.getAttribute('film_id')}" @click="${this.isFavDelete}">
                <span class="button__text">${this.generateIconHtml(heartStroke.svg)}</span>
              </button>
            </div>
              <div class="detailsBtn_container">
                <button type="submit" class="details_button" @click="${() => this.openPopup(this.movie)
        }">${this.generateIconHtml(searchSvg.svg)}</button>
        <button type="submit" class="commments_button" @click="${() => this.openCommentsPage(this.movie)
        }">${this.generateIconHtml(informationStroke.svg)}</button>
              </div>
            <div class="image-container">
              <img src=${this.getAttribute("poster")} />
            </div>

            <div class="info" id="info">
              <h3 class="title">${this.title}</h3>

              <p class="category"><span>Genre:&nbsp;</span>${this.getAttribute('categories')}</p>

              <p class="star"><span>Star:&nbsp;</span>${this.actor}</p>

              <p class="year"><span>Year:&nbsp;</span> ${this.getAttribute('year')}</p>

              <p class="director"><span>Director:&nbsp;</span>: ${this.director}</p>
            </div>
          </div>
        `;
  }
}

customElements.define('movie-card', MovieCard);