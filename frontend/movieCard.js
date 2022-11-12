import { LitElement, html } from 'lit-element';

export class MovieCard extends LitElement {

  constructor() {
    super();

    /* if (this.getAttribute('title') == null) {
      console.log("null");
    }
    else {
      console.log(this.getAttribute('title'));
      if (this.shadowRoot.querySelector('h2')) {
        this.shadowRoot.querySelector('h2').innerHTML = this.getAttribute('title');

      } else {
        console.log("Cannot do h2.innerHTML. Value is: " + this.shadowRoot.getElementById('baslik'))
      }
    } */
  }

  render() {
    return html`
      <style>
h2{
    color: green;
}

img{
    width: 100px;
    height: 100px;
    border-radius : 50%;
}
</style>
<h2>${this.getAttribute('title')}</h2>
<img src=${this.getAttribute('poster')}/>
<div>
    <p style="font-weight: bold;">
    <slot name="year"></slot>
    </p>
    <p>
    <slot name="type"></slot>
    </p>
</div>
<p>
<slot></slot>
</p>
    `;
  }
}

customElements.define('movie-card', MovieCard);