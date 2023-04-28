import { Color, ELEMENTTYPE_IMAGE, Entity, Plane, Quat, Ray, StandardMaterial, Vec2, Vec3, Vec4, app } from "playcanvas";
import { AssetLoader } from "../assetLoader/assetLoader";
import { Character } from "../objects/character/character";

export class PlayScene extends Entity {
  constructor(){
    super();  
    this._setup();
  }

  _setup(){
    this._initCamera();
    this._initLight();
    this._initRay();
    this._initGround();
    this._initCharacter();
    this.rayCastMouseWithGround();
  }

  _initCamera(){
    this.camera = new Entity("camera");
    this.camera.addComponent("camera", {
      clearColor: new Color(0.1, 0.1, 0.1),
    });
    this.camera.setLocalPosition(0.322, 6.234 , 10);
    this.camera.setEulerAngles(-13.68, -1.61, -0.47);
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
    this.light.setLocalPosition(-0.206, 3.478, 1.882);
    this.light.setEulerAngles(45, 64.2, 0);
    this.addChild(this.light);
  }

  _initGround(){
    this.ground = new Entity();
    this.ground.addComponent("model",{
      type : "plane",
    })
    this.ground.setLocalScale(8, 1, 142);
    this.addChild(this.ground);  

    let material = new StandardMaterial();
    material.diffuse = new Color(1, 1, 1);
    this.ground.model.meshInstances[0].material = material;
  }

  _initCharacter(){
    this.character = new Character();
    this.addChild(this.character);
  }

  _initRay(){
    this.ray = new Ray();
    this.hitPosition = new Vec3();
  }

  rayCastMouseWithGround(dt){
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

      let boundingBox = this.ground.model.meshInstances[0]._aabb;
      
      let rs = boundingBox.intersectsRay(this.ray, this.hitPosition);

      console.log(rs)
    })
  }


  update(dt){
  }
}