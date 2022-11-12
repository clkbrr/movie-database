import { LitElement, html, css } from 'lit-element';
import { prepareTable } from "../../assets/js/app";

class AppHeader extends LitElement {

    static styles = css`
    * {
      box-sizing:border-box;
      margin:0;
      padding:0;
      background-color:red;  
    }

    h2 {
        color:white;
    }

    li, a {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight:500;
        font-size:16px;
        color:#edf0f1;
        text-decoration:none;
    }

    header {
         display:flex;
         justify-content:space-between;
         align-items:center;
         padding: 30px 10%;
     }

     .nav_links {
        list-style:none;
     }

     .nav_links li {
        display:inline-block;
        padding: 0px 20px;
     }

     .nav_links li a {
        transition:all 0.3s ease 0s;
     }

     .nav_links li a:hover {
        color:#0088a9;
     }
  `;

    constructor() {
        super();
    }

    updated() {
        super.updated();

        let a = this.shadowRoot.querySelector('.login_logout');
        let profile_li = this.shadowRoot.querySelector('.profile_li');

        if (localStorage.getItem('currentUser') == null) {
            profile_li.style.display = 'none';
            a.innerHTML = "";
            a.href = "";
            a.innerHTML = 'Sign In';
            a.href = '../dev/signin.html';
            a.addEventListener('click', () => {

            });
        } else {
            a.innerHTML = "";
            a.href = "";
            a.innerHTML = 'Logout';
            a.href = '../dev/index.html';
            a.addEventListener('click', () => {
                this.logout();
            });
        }

        let favsBtn = this.shadowRoot.querySelector('.favs');

        if (localStorage.getItem('currentUser') == null) {
            favsBtn.style.display = 'none';
        }
    }

    logout() {
        localStorage.removeItem('tokenKey');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
    }

    render() {
        return html`
        <header>
           <h2>Movie Database</h2>

           <nav>
            <ul class="nav_links">
                <li><a href="#" @click="${() => { location.reload(); }}">Movies</a></li>
                <li class="favs"><a href="#" @click="${() => {
                prepareTable();
            }}">Favourites</a></li>
                <li class="profile_li"><a class="profile" href="../dev/profile.html">Profile</a></li>
                <li><a class="login_logout" href="../dev/signin.html">Sign In</a></li>
            </ul>
           </nav>
        </header>
        `;
    }
}

customElements.define("app-header", AppHeader);