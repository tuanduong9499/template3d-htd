import { ADDRESS_REPEAT, Asset, AssetListLoader, CanvasFont, Color, FILTER_LINEAR, Sprite, Texture, TextureAtlas, Vec2, Vec4 } from "playcanvas";
import assetData from "../../assets/jsons/assetData.json";
import { AssetConfig } from "./assetConfigtor";
export class AssetLoader {
  static loadAssets(app, callback) {
    this.app = app;
    this.textures = [];
    this._loadedTexture = 0;
    this._textureAtlases = [];
    this.assets = [];
    assetData.forEach((data) => {
      if (data.type === "sprite") {
        this.createTexture(data.src, data.key);
      } else {
        let asset = new Asset(data.key, data.type, {
          url: data.src,
        });
        this.assets.push(asset);
      }
    });
    	//console.log(this.assetScripts)
    const assetListLoader = new AssetListLoader(
      this.assets,
      this.app.assets
    );

    assetListLoader.load(() => {
      this._loadTextures(() => {
        this._loadTextureAtlases();
        this._loadSpriteAssets();
        AssetConfig.config(this.app);
        callback();
      });
    });
  }

  static getAssetByKey(id) {
    return this.assets.find((asset) => asset.name === id);
  }

  static createTexture(src, key) {
    let tex = new Texture(this.app.graphicsDevice);
    tex.src = src;
    tex.name = key;
    this.textures.push(tex);
    return tex;
  }



  static _loadSpriteAssets() {
    this._textureAtlases.forEach((tex) => {
      let sprite = new Sprite(this.app.graphicsDevice);
      sprite.atlas = tex;
      sprite.frameKeys = Object.keys(tex.frames);
      sprite.pixelsPerUnit = 100;
      let asset = new Asset(tex.texture.name, "sprite");
      asset.resource = sprite;
      asset.loaded = true;
      this.app.assets.add(asset);
      this.assets.push(asset);
    });
  }

  static _loadTextureAtlases() {
    this.textures.forEach((tex) => {
      let textureAtlas = new TextureAtlas();
      textureAtlas.texture = tex;
      textureAtlas.frames = this.getAtlasFrame(tex);
      this._textureAtlases.push(textureAtlas);
    });
  }

  static registerAsset(object, key, type) {
    let asset = new Asset(key, type, null);
    asset.resource = object;
    asset.loaded = true;
    this.app.assets.add(asset);
    this.assets.push(asset);
  }

  static getAtlasFrame(texture) {
    let frames = {};
    frames[texture.name] = {
      rect: new Vec4(0, 0, texture.width, texture.height),
      pivot: new Vec2(0.5, 0.5),
      border: new Vec4(0, 0, 0, 0),
    };
    return frames;
  }

  static _loadTextures(onLoad) {
    this.onLoadTextures = onLoad;
    for (let index = 0; index < this.textures.length; index++) {
      this._loadTexture(this.textures[index]);
    }
  }

  static _loadTexture(texture) {
    texture.minFilter = FILTER_LINEAR;
    texture.mapFilter = FILTER_LINEAR;
    texture.addressU = ADDRESS_REPEAT;
    texture.addressV = ADDRESS_REPEAT;

    let img = document.createElement("img");
    img.onload = () => {
      texture.setSource(img);
      texture.mipmaps = true;
      this._onOneTextureLoaded();
    };
    img.src = texture.src;
  }

  static _onOneTextureLoaded() {
    this._loadedTexture++;
    if (this._loadedTexture >= this.textures.length) {
      this.onLoadTextures && this.onLoadTextures();
    }
  }

  static createCanvasFont(text, name, fontSize, fontWeight) {
    let canvasFontArial = new CanvasFont(this.app, {
      color: new Color(1, 1, 1),
      fontName: name,
      fontSize: fontSize,
      fontWeight: fontWeight,
    });
    canvasFontArial.createTextures(text);
    let fontAsset = new Asset("CanvasFont", "font", {});
    fontAsset.resource = canvasFontArial;
    fontAsset.loaded = true;
    this.app.assets.add(fontAsset);
    return fontAsset;
  }

}