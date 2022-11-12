import { LitElement, html, css } from 'lit-element';
import { ifUserExists, registerUser } from '../../assets/js/register';

export class RegisterPage extends LitElement {

    static styles = css`

    * {
        font-family:'Roboto', sans-serif;
    }

    .signup {
        width:360px;
        height:600px;
        margin:auto;
        background-color:white;
        border-radius:3px;
    }

    h1 {
        text-align:center;
        padding-top:15px;
    }

    form {
        width:300px;
        margin-left:20px;
    }

    form label {
        display:flex;
        margin-top:20px;
        font-size:18px;
    }

    form input {
        width:100%;
        padding:7px;
        border:none;
        border:1px solid gray;
        border-radius:6px;
        outline:none;
    }

    input[type="button"] {
        width:320px;
        height:35px;
        margin-top:20px;
        border:none;
        background-color:#40c1a2;
        color:white;
        font-size:18px;
        cursor:pointer;
    }

    p {
        text-align:center;
        font-size:15px;
        margin-top:-100px;
    }

    p a {
        color:#40c1a2;
    }

    .error {
        border-color:red;
    }

    #avatars {
        width:80%;
    }

    option {
        width:40px;
        height:40px;
    }
    `;

    constructor() {
        super();
    }

    async registerUserIfNotExists() {
        let username = this.shadowRoot.querySelector('.username');
        let pass = this.shadowRoot.querySelector('.pass');
        let mail = this.shadowRoot.querySelector('.mail');
        let passConfirm = this.shadowRoot.querySelector('.pass_confirm');
        let usernameLabel = this.shadowRoot.querySelector('.username_label');
        let passLabel = this.shadowRoot.querySelector('.pass_label');
        let result = await ifUserExists(username.value);

        if (result != null) {
            username.classList.add('error');
            usernameLabel.style.color = 'red';
            usernameLabel.innerHTML = 'this username already exists'
        }
        else {
            username.classList.remove('error');
            usernameLabel.style.color = 'black';
            usernameLabel.innerHTML = 'Username'

            if (username.value != '' && pass.value != '') {
                if (pass.value !== passConfirm.value) {
                    passLabel.innerHTML = 'Password not match';
                    passLabel.style.color = 'red';
                }
                else {
                    let avatarUrl = "http://localhost:8000/dev/default/.png";
                    registerUser(username.value, pass.value, mail.value, avatarUrl);
                    location.href = 'signin.html'
                }
            }
            else {
                alert('Username and Password fields can not be empty');
            }
        }
    }

    render() {
        return html`
        <div class="signup">
            <h1>Sign Up</h1>
            <form>
                <label class="username_label">Username</label>
                <input class="username" type="text" />
                <label>Email</label>
                <input class="mail" type="email" />
                <label class="pass_label">Password</label>
                <input class="pass" type="password" />
                <label>Confirm Password</label>
                <input class="pass_confirm" type="password" />
                <input type="button" value="submit" @click="${this.registerUserIfNotExists}"/>
            </form>
        </div>
        <p>Already have an account? <a href="signin.html">Login here</a></p>
        `;
    }
}

customElements.define('lit-register', RegisterPage);