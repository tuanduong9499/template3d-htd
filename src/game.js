import { Application, ElementInput, Keyboard, Mouse, TouchDevice } from "playcanvas";
import { PlayScene } from "./scenes/playscene";
import { AssetLoader } from "./assetLoader/assetLoader";

export class Game {
  constructor(){
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    this.app = new Application(canvas, {
      elementInput : new ElementInput(canvas),
      keyboard : new Keyboard(canvas),
      mouse : new Mouse(canvas),
      touch : new TouchDevice(canvas),
    });
    this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    this.app.setCanvasResolution(pc.RESOLUTION_AUTO);
    this.app.graphicsDevice.maxPixelRatio = window.devicePixelRatio;
    window.addEventListener("resize", () => this.app.resizeCanvas());
    
    AssetLoader.loadAssets(this.app, () => {
      this.app.scene.skybox = AssetLoader.getAssetByKey("cm_skybox").resource;
      this.app.start();
      this.app.on("update", (dt) => this.update(dt))
      this._initPlayScene();
    })
  }

  _initPlayScene(){
    this.playScene = new PlayScene();
    this.app.root.addChild(this.playScene);
  }

  update(dt){
    //this.playScene.update(dt);
  }
}