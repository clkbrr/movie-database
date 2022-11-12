import { LitElement, html, css } from "lit-element";
import '../avatar/user-avatar';

export class UserProfile extends LitElement {
    static styles = css`

.container {
    display:flex;
    flex-direction:row;
}
`;

    constructor() {
        super();
    }

    render() {
        return html`
              <div class="container">
            <div class="avatar">
                <user-avatar></user-avatar>
            </div>

            <div class="info">

            </div>
        </div>
        `;
    }
}

customElements.define('user-profile', UserProfile);