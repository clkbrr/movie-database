import { LitElement, html, css } from "lit-element";
import { displayButtons } from "../../assets/js/displayButtons.js";
import { paginate } from "../../assets/js/paginate.js";
import { getFavourites, getUser, getUserComments, postAvatar } from "../../assets/js/profile.js";


const avatars = [
  "http://localhost:8000/dev/avatars/captain.png",
  "http://localhost:8000/dev/avatars/clapperboard.png",
  "http://localhost:8000/dev/avatars/countdown.png",
  "http://localhost:8000/dev/avatars/film-reel.png",
  "http://localhost:8000/dev/avatars/ghost-mask.png",
  "http://localhost:8000/dev/avatars/marilyn-monroe.png",
  "http://localhost:8000/dev/avatars/saw.png",
  "http://localhost:8000/dev/avatars/silhouette.png",
  "http://localhost:8000/dev/avatars/theatre.png",
  "http://localhost:8000/dev/avatars/vendetta.png"
]

export class Avatar extends LitElement {
  static styles = css`
  .Card {
    width:345px;
    margin-top:50px;
    margin-left:20px;
    background-color:#EEEEEE;
  }

  .CardMedia {
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .CardMedia img {
    width:270px;
    height:270px;
    margin-top:30px;
  }

  .content {
    background-color:#EAEAEA;
    text-align:center;
  }

  .content p {
    color:#B2B2B2;
  }

  .action {
    display:flex;
    align-items:center;
    justify-content:center;
  }

  button {
    background-color:transparent;
    color:#7978FF;
    cursor:pointer;
  }

  button:hover {
    background-color:#EEEEEE;
  }

  /* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 30%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.images {
  width:90px;
  height:90px;
  margin-top:10px;
}

.container {
  display:flex;
  flex-direction:row;
}

.favs {
    max-width: 900px;
    border: 1px solid #00bcd4;
    background-color: #efefef33;
    padding: 15px;
    overflow: auto;
    margin: auto;
    margin-top:50px;
    margin-left: 30px;
    border-radius: 4px;
    position:relative;
}

table {
    width: 100%;
    font-size: 13px;
    color: #444;
    white-space: nowrap;
    border-collapse: collapse;
    overflow-y: scroll;
    overflow-x: hidden;
}
table>thead {
    background-color: #00bcd4;
    color: #fff;
}
table>thead th {
    padding: 15px;
    cursor:pointer;
}
table th,
table td {
    border: 1px solid #00000017;
    padding: 10px 15px;
}

table>tbody>tr {
    background-color: #fff;
    transition: 0.3s ease-in-out;
    text-align:center;
}
table>tbody>tr:nth-child(even) {
    background-color: rgb(238, 238, 238);
}
table>tbody>tr:hover{
    filter: drop-shadow(0px 2px 6px #0002);
}

.comments {
    margin-top:40px;
}

.user_activity {
  margin-top:10px;
  margin-left:20px;
  border: 1px solid gray;
}

.user_activity p {
  padding:10px;
}

.user_activity p .username{
  color:blue;
}

.user_activity p .mov{
  color:red;
}
  `;

  static get properties() {
    return {
      favs: {},
      comments: {},
      commentCount: { type: Number }
    }
  }

  constructor() {
    super();

    setTimeout(async () => {
      this.favs = await getFavourites();
    }, 100);

    this.getUserActivity();

    this.commentCount = 0;
  }

  async firstUpdated() {
    super.firstUpdated();

    // Get the modal
    var modal = this.shadowRoot.getElementById("myModal");

    modal.style.display = "none";

    // Get the button that opens the modal
    var btn = this.shadowRoot.querySelector(".btn");

    // Get the <span> element that closes the modal
    var span = this.shadowRoot.querySelector(".close");

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    // Avatari DB'den ceker 
    let avatarImg = this.shadowRoot.querySelector('.avatarImg');

    if (avatarImg.src != "../dev/avatars/default.png") {
      let user = await getUser();
      avatarImg.src = user.avatar;
    }
    //-------------------------------------------------------------
  }

  changeAvatar() {
    let avatars = this.shadowRoot.querySelectorAll('#myRadio');
    let avatarImg = this.shadowRoot.querySelector('.avatarImg');
    let labelImgs = this.shadowRoot.querySelectorAll('.images');

    for (let i = 0; i < avatars.length; i++) {
      if (avatars[i].checked == true) {
        avatarImg.src = labelImgs[i].src;
      }
    }
  }

  async getUserActivity() {
    this.comments = await getUserComments(localStorage.getItem('username'));
  }

  render() {
    return html`
    <div class="container">
      <div class="Card">
          <div class="CardMedia">
                  <img class="avatarImg" src="../dev/avatars/default.png" alt="user-avatar">
          </div>
          <div class="content">
                 <h5>${localStorage.getItem('username')}</h5>
          </div>
          <div class="action">
            <button type="button" class="btn">Change Avatar</button>
          </div>

    <div id="myModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="${async () => {
        let avatarImg = this.shadowRoot.querySelector('.avatarImg');
        postAvatar(localStorage.getItem('username'), avatarImg.src);
      }}">&times;</span>
          <ul>
            ${avatars.map((source, index) => {
        return html`
              <li>
                <input type="radio" id="myRadio" name="myRadio" @click="${() => {
            this.changeAvatar();
          }}"/>
                <label for="myRadio"><img src="${source}" class="images" /></label>
              </li>
              `
      })}
          </ul>
        </div>
    </div>
    </div>

    <div class="favs">
      <h2>Favourites</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actors</th>
            <th>Director</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          ${this.favs.favMovies.map((mov, index) => {
        return html`
            <tr>
              <td>${mov.title}</td>
              <td>${mov.actors}</td>
              <td>${mov.director}</td>
              <td>${mov.year}</td>
            </tr>
            `
      })}
        </tbody>
      </table>
      <div class="pagination">

      </div>
    </div>
    <div class="comments">
      ${this.comments.map((comment, index) => {
        if (this.commentCount <= 2) {
          this.commentCount++;
          return html`
        <div class="user_activity">
          <p><span class="username">${localStorage.getItem('username')}</span> commented on <span class="mov">${comment.film_title}</span> :</p>
          <p>"${comment.comment}"</p>
        </div>
        `
        }
      })
      }
    </div >
    </div >

  `;
  }
}

customElements.define('user-avatar', Avatar);