import { LitElement, html, css } from "lit-element";
import { postComment, prepareComment } from "../../assets/js/app";

export class Comment extends LitElement {

    static styles = css`
.container {
  width:100%;
  display:flex;
  flex-direction:row;
}

.movie_details {
  width: 50%;
  height:95vh;
  display:flex;
  flex-direction:row;
  background-color: #AEBDCA;
  box-sizing: border-box;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align:center;
  color: #333;
  transition: transform 0.4s, top 0.4s;
}

.movie_details img {
  width:350px;
  height:350px;
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
  color: black;
  text-align: start;
  font-size-adjust: 0.58;
  margin-bottom:10px;
}

.info p span {
  color: black;
  font-weight:600;
}

.info .title {
  font-size:25px;
  text-align:center;
}

.comment_section {
    width:100%;
    display:flex;
    flex-direction:column;
    background-color:#AEBDCA;
}

.comment_section .textArea {
    width:92%;
    height:100px;
    margin:20px 0px 10px 10px;
    background-color:#EDEDED;
    color: #666666;
    padding:1em;
    border-radius:5px;
    border: 2px solid transparent;
    outline:none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight:500px;
    font-size:16px;
    line-height:1.4;
    resize: none;
    transition:all 0.2s;
}

.comment_section .textArea:hover {
    cursor:pointer;
    background-color:#EEF1FF;
}

.comment_section button {
    width:80px;
    height:30px;
    float:right;
    margin-right:15px;
    border-radius:5px;
    border: .2px ridge gray;
    cursor: pointer;
    background-color:#EDEDED;
    transition:all 0.2s;
}

.comment_section button:hover {
    background-color:#EDEDED;
}

.comments {
    margin:5px 0px 10px 10px;
    display:flex;
    flex-direction:column;
}

.comments textarea {
  background-color:#EEEEEE;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius:0.5rem;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
  padding: 5px;
  margin-top:20px;
  resize:none;
  cursor:default;
}

.comments label {
    background-color:transparent;
    color:gray;
    margin-top:10px;   
}

.usrImgSpan {
    position: absolute;
    content: '';
    width: 30px;
    height: 30px;
    border-radius:50%;
  }

  .usrSpan {
    margin-left:20px;
  }

.comment_section .textArea:focus {
    cursor:text;
    color:#333333;
    background-color:white;
    border-color:#333333;
}

a {
    margin-left:35px;
}
    `

    static get properties() {
        return {
            movie: {},

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

            country: { type: String },

            comments: {},

            comments_container: {},

            txtArea: {},

            commentText: { type: String },

            isGetAllWorked: { type: Boolean },

            username: { type: String }
        }
    }

    constructor() {
        super();

        this.movie = this.getAttribute('movie');
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

    firstUpdated() {
        super.firstUpdated();
        this.comments_container = this.shadowRoot.querySelector('.comments')
        this.getAllComments();
    }

    updated() {
        super.updated();

        var btnSubmit = this.shadowRoot.querySelector('.sbmt');
        this.txtArea = this.shadowRoot.querySelector('.textArea');

        if (localStorage.getItem('currentUser') == null) {
            this.txtArea.style.display = 'none';
            btnSubmit.style.display = 'none';
        }

        this.txtArea.addEventListener('change', () => {
            this.commentText = this.txtArea.value;
        });
    }

    getAllComments() {
        this.comments = JSON.parse(this.getAttribute('comments'));

        this.comments.map((comment, index) => {
            var txtArea = document.createElement("textarea");
            var usernameLabel = document.createElement("label");
            var userLink = document.createElement('a');
            var imagee = document.createElement('img');

            txtArea.setAttribute('readonly', 'readonly');
            if (comment == "Henüz yorum yapılmamış.") {
                usernameLabel.innerHTML = "";
                txtArea.innerHTML = "Henüz yorum yapılmamış."
            }
            else {
                txtArea.innerHTML = "";
                txtArea.innerHTML = comment.comment;
                imagee.src = comment.avatar;
                imagee.classList.add('usrImgSpan');
                userLink.href = "../dev/other-profile.html"
                usernameLabel.appendChild(imagee);
                userLink.innerHTML = `${comment.username}`;
                userLink.addEventListener('click', () => {
                    localStorage.setItem('clickedUser', userLink.innerHTML);
                });

                usernameLabel.appendChild(userLink);
            }

            this.comments_container.appendChild(usernameLabel);
            this.comments_container.appendChild(txtArea);
        });
    }

    postComments() {
        postComment(parseInt(this.getAttribute('film_id')), this.commentText);

        setTimeout(() => {
            prepareComment(this.getAttribute('movie'));
        }, 100);

    }

    render() {
        return html`
        <div class="container">
            <div class="movie_details">

                <img src=${this.getAttribute('poster')} />

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

            <div class="comment_section">
                <form class="form">
                    <textarea class="textArea write_comment"  placeholder="Write a comment..."></textarea>
                    <button type="button" class="sbmt" @click="${this.postComments}">Submit</button>
                </form>
             
                <div class="comments">

                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('lit-comment', Comment);