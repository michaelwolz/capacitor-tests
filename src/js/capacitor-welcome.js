import { CameraPreview } from "@capacitor-community/camera-preview";
import { Camera } from "@capacitor/camera";
import { SplashScreen } from "@capacitor/splash-screen";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

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
          <button class="button" id="openCameraPreview">Open Camera</button>
          <button class="button" id="closeCamera">Close camera</button> 
          <button class="button" id="takePicture">Take picture</button> 
          <input id="qual" value="85" />
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#openCameraPreview")
        .addEventListener("click", async function (e) {
          const permissionStatus = await Camera.checkPermissions();

          if (permissionStatus.camera !== "granted") {
            await Camera.requestPermissions();
          }

          const options = {
            position: "rear",
            enableZoom: false,
            toBack: true,
            enableHighResolution: true
          };

          await CameraPreview.start(options);
        });

      self.shadowRoot
        .querySelector("#closeCamera")
        .addEventListener("click", async function (e) {
          await CameraPreview.stop();
        });

      self.shadowRoot
        .querySelector("#takePicture")
        .addEventListener("click", async function (e) {
          const foo = await CameraPreview.capture({
            quality: parseInt(self.shadowRoot.querySelector("#qual").value),
          });
          await CameraPreview.stop();
          console.log(`data:image/jpeg;base64,${foo.value}`);
        });
    }
  }
);

window.customElements.define(
  "capacitor-welcome-titlebar",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
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
