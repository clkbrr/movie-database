import { LitElement, html, css } from "lit-element";
import { prepareComment } from "../../assets/js/app";

export class LitCarousel extends LitElement {

    static styles = css`
     h2 {
        position:absolute;
        text-align:left;
        color:white;
        bottom:93%;
        margin-left:10px;
     }

     .container {
        display:flex;
        flex-direction:row;
        align-items:center;
        width:60%;
        height:250px;
        box-sizing: border-box;
        overflow:hidden;
        white-space: nowrap;
        background: #F8C4B4;
        margin-left:65px;
        //margin:auto;
        //animation: slide 7s linear alternate infinite;
    } 

    .slide {
        width:20%;
        flex:1;
        margin-left:15px;
        cursor:pointer;
        animation: slide 10s linear alternate infinite;
    }

    @keyframes slide {
        0% {
            transform: translateX(0);;
        }

        25% {
            transform: translateX(0);;
        }

        30% {
            transform: translateX(-100%);;
        }

        50% {
            transform: translateX(-100%);;
        }

        55% {
            transform: translateX(-200%);;
        }

        75% {
            transform: translateX(-200%);;
        }

        80% {
            transform: translateX(-300%);;
        }

        100% {
            transform: translateX(-300%);
        }  
}
    .container:hover .slide{
        animation-play-state:paused;
    } 

    .slide img{
        box-sizing:border-box;
        width:150px;
        height:170px;
        margin-top:15px;
        margin-left:10px;
        padding-left:15px; 
    }
    `;

    static get properties() {
        return {
            index: { type: Number },
            moviess: {},
            movies: {}
        }
    }

    constructor() {
        super();
        this.moviess = this.getAttribute('movies');
        this.index = 1;
    }

    firstUpdated() {
        super.firstUpdated();
        this.moviess = this.getAttribute('movies');

        this.moviess.forEach(movie => {

            this.movies = [
                { movie_: JSON.parse(movie[0].poster) }
            ]

        });
    }


    updated() {
        super.updated();

        this.moviess = this.getAttribute('movies');
        var container = this.shadowRoot.querySelector('.container');
        JSON.parse(this.moviess).forEach(movie => {

            if (movie.filmId == this.index && this.index <= 13) {
                var slide_container = document.createElement('div');
                slide_container.classList.add('slide');
                container.appendChild(slide_container);
                slide_container.innerHTML += `<img src='${movie.poster}'>`;

                slide_container.addEventListener('click', () => {
                    prepareComment(JSON.stringify(movie))
                })

                this.index += 2;
            }
        });

    }

    render() {
        return html`
         <div class="container">
            <h2>Editor's Choice</h2>
        </div>      

        `;
    }
}

customElements.define('lit-carousel', LitCarousel);