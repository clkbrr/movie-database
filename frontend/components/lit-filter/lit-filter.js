import { LitElement, html, css } from 'lit-element';

export class LitFilter extends LitElement {

    static styles = css` 

    * {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    .container {
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content:start;
        align-items:start;
    }

    .imdb_btn_container {
        display:flex;
        flex-direction:row;
        margin-left:10px;
        margin-top:10px;
    }
    
    .imdb_score {
        width: 25px;
        height: 20px;
        color: #AEBDCA;
        background: transparent;
        border: groove #BCCEF8;
        font-weight: bold;
        border-radius: 3px;
        cursor:pointer;
        transition: 0.3s ease-in-out;
    }

    .imdb_score:hover {
       box-shadow: 0 3px 8px #0003;
    }

    label span {
        font-size:15px;
        color: gray;
    }

    .category_container {
        display:flex;
        flex-direction:row;
        width:100%;
        margin-left:10px;
    }

    .first_part, .second_part {
        display:flex;
        flex-direction:column;
    }

    .second_part {
        margin-left:20px;
    }

    .category_btn {
        width:90px;
        height:25px;
        background-color: #AEBDCA;
        margin-top:7px;
        border:none;
        border-radius:5px;
        cursor:pointer;
        transition: 0.3s ease-in-out;
    }

    .category_btn:hover {
       box-shadow: 0 3px 8px #0003;
    }
    .filter_btn_container {
        display:flex;
        flex-direction:row;
        position:absolute;
        right:15%;
        bottom:5%;
    }

    .remove_filter {
        margin-left:30px;
        cursor:pointer;
    }

    .filter_movies {
         margin-left:10px;
         cursor:pointer;
    }
    `;

    static get properties() {
        return {
            movies: {},

            isImdbBtnClicked: { type: Boolean },

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

            sortDirection: { tyep: Boolean }

        }
    }

    constructor() {
        super();

        //this.movies = this.getAttribute('movies');
        /*         this.title = this.getAttribute('title');
                this.release_year = this.getAttribute('year');
                this.imdb = this.getAttribute('imdb');
                this.poster = this.getAttribute('poster');
                this.director = this.getAttribute("director");
                this.actors = this.getAttribute("actor");
                this.categories = this.getAttribute('category');
                this.country = this.getAttribute('country'); */
    }

    render() {
        return html`
        <div class="container">         
           <div class="imdb_btn_contanier">
                <label style="margin-left:10px;"><span>Filter by Imdb Score:</span></label>
                <button type="button" class="imdb_score">^</button>
           </div>
           <label style="margin-left:10px; margin-top:7px;">Genre:</label>
           <div class="category_container">
            <div class="first_part">
                <button type="button" class="category_btn">Drama</button>
                <button type="button" class="category_btn">Romance</button>
                <button type="button" class="category_btn">Horror</button>
                <button type="button" class="category_btn">Action</button>
                <button type="button" class="category_btn">History</button>
            </div>

             <div class="second_part">
                <button type="button" class="category_btn">Crime</button>
                <button type="button" class="category_btn">Thriller</button>
                <button type="button" class="category_btn">Mystery</button>
                <button type="button" class="category_btn">Scifi</button>
            </div>
           </div>
           <div class="filter_btn_container">
            <button type="button" class="filter_movies">Get Movies</button>
            <button type="button" class="remove_filter">Clear Filter</button>
           </div>
        </div>
        `;
    }
}

customElements.define('lit-filter', LitFilter);