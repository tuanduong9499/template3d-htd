import { Color, ELEMENTTYPE_IMAGE, Entity, Plane, Ray, StandardMaterial, Vec2, Vec3, Vec4, app } from "playcanvas";
import { AssetLoader } from "../assetLoader/assetLoader";
import { ObjectFactory } from "../template/objectFactory";

export class PlayScene extends Entity {
  constructor(){
    super();  
    this._setup();
  }

  _setup(){
    this._initCamera();
    this._initLight();
    this._initPlane(); 
    this._initModelCar();
  }

  _initCamera(){
    this.camera = new Entity("camera");
    this.camera.addComponent("camera", {
      clearColor: new Color(0.1, 0.1, 0.1),
    });
    this.camera.setLocalPosition(7, 6 , 6);
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
    material.diffuse = new Color(1, 1, 1);
    this.plane.model.meshInstances[0].material = material;
  }

  

  _initModelCar(){
    this.carPolice = new Entity();
    this.carPolice.addComponent("model", {
      asset : AssetLoader.getAssetByKey("car_police")
    });
    this.addChild(this.carPolice);
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