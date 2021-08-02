import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicles: Vehicle[] = [
    new Vehicle(
      'abc',
      'Volkswagen',
      'Jetta',
      'Black',
      '1997',
      1
    ),
    new Vehicle(
      'def',
      'Yamaha',
      'R1',
      'Black',
      '2000',
      2
    ),
  ];

  constructor() { }

  insert(vehicle: Vehicle) {
    this.vehicles.unshift(vehicle);
  }

  getOne(id: string) {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  getAll() {
    return this.vehicles;
  }

  update(id: string, vehicle: Vehicle) {
    const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    this.vehicles[index] = vehicle;

    // const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    // this.vehicles.fill(vehicle, index, index + 1);

    // if (toUpdateVehicle) {
    //   toUpdateVehicle.brand = vehicle.brand;
    //   toUpdateVehicle.color = vehicle.color;
    //   toUpdateVehicle.model = vehicle.model;
    //   toUpdateVehicle.type = vehicle.type;
    //   toUpdateVehicle.year = vehicle.year;
    // }
  }

  delete(id: string) {
    this.vehicles = this.vehicles.filter(vehicle => vehicle.id !== id);

    // const index = this.vehicles.findIndex(vehicle => vehicle.id === id);
    // this.vehicles.splice(index, 1);
  }

}
