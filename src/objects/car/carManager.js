import { Entity } from "playcanvas";
import { ObjectFactory } from "../../template/objectFactory";
import { Car } from "./car";

export class CarManager extends Entity {
  constructor(){
    super();
    this.cars = [];
    this._initCar();
  }

  _initCar(){
    this.carPolice = new Car("car_police");
    this.addChild(this.carPolice);
    this.carTaxi = new Car("car_taxi");
    this.addChild(this.carTaxi);
    this.cars.push(this.carPolice, this.carTaxi);
  }

  changeModel(modelAsset){

  }

  destroy(){
    this.car.destroy();
  }
}