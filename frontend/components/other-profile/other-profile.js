import { LitElement, html, css } from "lit-element";
import { getUserComments, getUserDetails } from "../../assets/js/profile";

export class OtherProfile extends LitElement {
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
    margin-right:50px;
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
      userDetails: {},
      comments: {},
      commentCount: { type: Number }
    }
  }
  constructor() {
    super();

    this.getUserDetails();

    this.getUserActivity();

    this.commentCount = 0;
  }

  async getUserDetails() {
    this.userDetails = await getUserDetails(localStorage.getItem('clickedUser'));
  }

  async getUserActivity() {
    this.comments = await getUserComments(localStorage.getItem('clickedUser'));
  }

  render() {
    return html`
    <div class="container">
      <div class="Card">
          <div class="CardMedia">
                  <img class="avatarImg" src=${this.userDetails[0].user.avatar} alt="user-avatar">
          </div>
          <div class="content">
                 <h5>${this.userDetails[0].user.username}</h5>
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
          ${this.userDetails.map((userDetail, index) => {
      return html`
            <tr>
              <td>${userDetail.film.title}</td>
              <td>${userDetail.actors}</td>
              <td>${userDetail.director}</td>
              <td>${userDetail.film.release_year}</td>
            </tr>
            `
    })}
        </tbody>
      </table>
    </div>
    <div class="comments">
      ${this.comments.map((comment, index) => {
      if (this.commentCount <= 2) {
        this.commentCount++;
        return html`
        <div class="user_activity">
          <p><span class="username">${localStorage.getItem('clickedUser')}</span> commented on <span class="mov">${comment.film_title}</span> :</p>
          <p>"${comment.comment}"</p>
        </div>
        `
      }
    })
      }
    </div >
    </div>
        
        `;
  }
}

customElements.define('other-profile', OtherProfile);