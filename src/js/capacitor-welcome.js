import { SplashScreen } from '@capacitor/splash-screen';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          This demo shows how CapacitorHttp is sending out malformed multipart/form-data requests.
        </p>
        <p>
          <button class="button" id="makeRequest">Make request</button>
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#makeRequest').addEventListener('click', async function (e) {
        const carzyUrl = `https://example.com/${encodeURIComponent(';')}/${encodeURIComponent('%')}?param=${encodeURIComponent(
          ';:@&=+$,/?%#[]'
        )}#${encodeURIComponent(':')}`;

        // Does not resolve due to non existing port but shows that it generally works:
        const carzyUrlWithPort = `https://example.com:8080/${encodeURIComponent(';')}/${encodeURIComponent('%')}?param=${encodeURIComponent(
          ';:@&=+$,/?%#[]'
        )}#${encodeURIComponent(':')}`;

        try {
          await fetch(carzyUrl);
        } catch (error) {
          console.error('Error:', error);
        }

        try {
          await fetch(carzyUrlWithPort);
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
