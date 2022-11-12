import { LitElement, html, css } from 'lit-element';
import { login, returnStatus } from '../../assets/js/login';

export class LoginPage extends LitElement {

    static styles = css`
    * {
        font-family:'Roboto', sans-serif;
    }

    .login {
        width:360px;
        height:320px;
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
        margin-top:-20px;
    }

    p a {
        color:#40c1a2;
    }
    `;

    constructor() {
        super();
    }


    async loginUser() {
        let username = this.shadowRoot.querySelector('.username');
        let pass = this.shadowRoot.querySelector('.pass');
        let status;

        await login(username.value, pass.value);

        setTimeout(() => {
            status = returnStatus();
            console.log(status)
        }, 300);

        setTimeout(() => {
            if (status == true) {
                window.location.href = 'index.html'
            } else {
                let errorLabel = this.shadowRoot.querySelector('.errorLabel');
                errorLabel.innerHTML = 'Wrong username or password';
                errorLabel.style.color = "red";
            }
        }, 300);
    }

    render() {
        return html`
        <div class="login">
            <h1>Login</h1>
            <form>
                <label class="errorLabel"></label>
                <label class="username_label">Username</label>
                <input class="username" type="text" />
                <label class="pass_label">Password</label>
                <input class="pass" type="password" />
                <input type="button" value="submit" @click="${this.loginUser}"/>
            </form>
        </div>
        <p>Don't have an account? <a href="register.html">Sign Up Here</a></p>
        `;
    }
}

customElements.define('lit-login', LoginPage);