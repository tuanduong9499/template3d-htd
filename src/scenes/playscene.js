import { Color, ELEMENTTYPE_IMAGE, Entity, Plane, Ray, StandardMaterial, Vec2, Vec3, Vec4, app } from "playcanvas";
import { AssetLoader } from "../assetLoader/assetLoader";

export class PlayScene extends Entity {
  constructor(){
    super();  
    this._setup();
  }

  _setup(){
    this._initCamera();
    this._initLight();
    this._initPlane();
    this._initBox();
    this._initModelCharacter();
    this._initScreen();
    this.rayCastMouseWithModel();
    //this._initBackground();
  }

  _initCamera(){
    this.camera = new Entity("camera");
    this.camera.addComponent("camera", {
      clearColor: new Color(0.1, 0.1, 0.1),
    });
    this.camera.setLocalPosition(5, 5 , 5);
    this.camera.setEulerAngles(-30, 45, 0);
    this.addChild(this.camera);
  }

  _initLight(){
    this.light = new Entity("light");
    this.light.addComponent("light", {
      type: "directional",
      color: new Color(1, 1, 1),
      castShadows: true,
      shadowResolution: 2048,
      shadowBias: 0.2,
      normalOffsetBias: 0.5,
      intensity: 1,
      shadowIntensity: 1
    });
    this.light.setLocalPosition(2, 2, -2);
    this.light.setEulerAngles(45, 135, 0);
    this.addChild(this.light);
  }

  _initPlane(){
    this.plane = new Entity();
    this.plane.addComponent("model",{
      type : "plane",
    })
    this.plane.setLocalScale(8, 1, 8);
    this.addChild(this.plane);  

    let material = new StandardMaterial();
    material.diffuse = new Color(0.32, 0.5, 0.1);
    this.plane.model.meshInstances[0].material = material;
  }

  _initBox(){
    this.box = new Entity();
    this.box.addComponent("model", {
      type : "box",
      castShadow: true,
    });
    this.box.setLocalPosition(0, 0.5, 0);
    this.addChild(this.box);

    let material = new StandardMaterial();
    material.diffuse = new Color(1, 0, 0);
    this.box.model.meshInstances[0].material = material;
  }

  _initModelCharacter(){
    this.character = new Entity();
    this.character.addComponent("model", {
      asset: AssetLoader.getAssetByKey("character1")
    })
    this.addChild(this.character);

    let material0 = new StandardMaterial();
    material0.diffuseMap = AssetLoader.getAssetByKey("materialCharacterBody").resource;
    this.character.model.meshInstances[0].material = material0;

    let material1 = new StandardMaterial();
    material1.diffuseMap = AssetLoader.getAssetByKey("materialCharacterClothes").resource;
    this.character.model.meshInstances[1].material = material1;

    let material2 = new StandardMaterial();
    material2.diffuseMap = AssetLoader.getAssetByKey("materialCharacterEye").resource;
    this.character.model.meshInstances[2].material = material2;

     let material3 = new StandardMaterial();
    material2.diffuseMap = AssetLoader.getAssetByKey("materialCharacter3").resource;
    this.character.model.meshInstances[3].material = material3;
  }

  _initScreen(){
    this.screen = new Entity();
    this.screen.addComponent("screen", {
      referenceResolution: new pc.Vec2(1280, 720),
      resolution: new pc.Vec2(1280, 720),
      scaleMode: pc.SCALEMODE_BLEND,
      screenSpace: true,
      anchor: new Vec4(0.5, 0.5, 0.5, 0.5),
      pivot: new Vec2(0.5, 0.5)
    });
    this.addChild(this.screen);
  }

  _initBackground(){
    this.bg = new Entity();
    this.bg.addComponent("sprite", {
      type : ELEMENTTYPE_IMAGE,
      spriteAsset: AssetLoader.getAssetByKey("background"),
    });
    this.addChild(this.bg);
    this.bg.setPosition(0, 0, 0)
    this.bg.setLocalScale(30, 30, 30);
    console.log(this.bg)
  }

  rayCastMouseWithModel(){
    this.ray = new Ray();
    this.hitPosition = new Vec3();
    document.addEventListener("pointerdown", (e) => {
      let from = this.camera.camera.screenToWorld(
        e.clientX,
        e.clientY,
        this.camera.camera.nearClip,
        this.ray.direction
      );
      let to = this.camera.camera.screenToWorld(
        e.clientX,
        e.clientY,
        this.camera.camera.farClip,
        this.ray.origin
      );
      this.ray.direction.sub(this.ray.origin).normalize();

      let boundingBox = this.box.model.meshInstances[0]._aabb;
      
      let rs = boundingBox.intersectsRay(this.ray, this.hitPosition);
      console.log(rs)
    })
  }


  update(dt){
    //this.box.rotate(dt * 10, dt * 10, 0)
  }
}