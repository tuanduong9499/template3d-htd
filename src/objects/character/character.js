import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objects/objectFactory";
import { AssetLoader } from "../../assetLoader/assetLoader";

export class Character extends Entity {
  constructor(){
    super();
    this.isEnable = false;
    this._createModel();
    this._initAnimation();
  }

  _createModel(){
    this.character = ObjectFactory.createModel("character");
    this.addChild(this.character);
  }

  _initAnimation(){
    this.character.addComponent("animation", {
      assets : [AssetLoader.getAssetByKey("anim_idle")],
      activate : true,
      loop : true,
    });

    document.addEventListener("pointerdown", () => {
      this.isEnable = !this.isEnable;
      if(this.isEnable){
        this.character.animation.enabled = true;
      }else{
        this.character.animation.enabled = false;
      }
    });
  }
}