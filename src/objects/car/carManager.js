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
    this.carPolice = new Car("car_police", 250, 300, 90);
    this.carPolice.isDefault = true;
    this.addChild(this.carPolice);
    this.carTaxi = new Car("car_taxi", 180, 220, 70);
    this.addChild(this.carTaxi);
    this.cars.push(this.carPolice, this.carTaxi);
    this.cars.forEach((car) => {
      car.hide();
      if(car.isDefault){
        car.show();
      }
    })
  }

  changeModel(modelAsset){
    this.cars.forEach((car) => {
      if(car.name === modelAsset){
        car.show();
      }else{
        car.hide();
      }
    })
  }

}