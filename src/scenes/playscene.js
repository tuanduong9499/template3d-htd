import { Color, ELEMENTTYPE_IMAGE, Entity, Plane, Ray, StandardMaterial, Vec2, Vec3, Vec4, app } from "playcanvas";
import { AssetLoader } from "../assetLoader/assetLoader";
import { ObjectFactory } from "../template/objectFactory";
import { Car } from "../objects/car/car";
import { SelectCarScreen } from "../screens/selectCarScreen/selectCarScreen";
import { CarManager } from "../objects/car/carManager";
import { buttonChangeCarEvent } from "../screens/selectCarScreen/changeModelCarPanel";

export class PlayScene extends Entity {
  constructor(app){
    super();  
    this.app = app;
    this._setup();
  }

  _setup(){
    this.app.scene.skybox = AssetLoader.getAssetByKey("cm_skybox").resource;
    this._initCamera();
    this._initLight();
    this._initPlane(); 
    this._initCarManager();
    this._initSelectCarScreen();
  }

  _initCamera(){
    this.camera = new Entity("camera");
    this.camera.addComponent("camera", {
      clearColor: new Color(0.1, 0.1, 0.1),
    });
    this.camera.setLocalPosition(7, 6 , 6);
    this.camera.setEulerAngles(-30, 45, 0);
    this.addChild(this.camera);

    this.camera.addComponent("script");
    this.camera.addComponent("script");
    this.camera.script.create("orbitCamera", {
      attributes: {
        inertiaFactor: 0.2,
      },
    });
    this.camera.script.create("orbitCameraInputMouse");
    this.camera.script.create("orbitCameraInputTouch");
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

  _initCarManager(){
    this.carManager = new CarManager();
    this.addChild(this.carManager);
  }

  _initSelectCarScreen(){
    this.selectCarScreen = new SelectCarScreen();
    this.addChild(this.selectCarScreen);

    this.selectCarScreen.changeModelCar.on("tap", (type) => {
      if(type === buttonChangeCarEvent.btnPolice){
        this.carManager.changeModel("car_police");
      }
      else if(type === buttonChangeCarEvent.btnTaxi){
        this.carManager.changeModel("car_taxi");
      }
    });
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