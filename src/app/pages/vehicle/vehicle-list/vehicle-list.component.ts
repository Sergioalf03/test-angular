import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicule.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicles: any[] = [];
  shownVehicles: any[] = [];

  showForm = false;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.vehicles = this.vehicleService
      .getAll()
      .map(vehicle => { return {
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        type: vehicle.type,
      }});

    this.shownVehicles = this.vehicles;
  }

  onOpenForm(id?: string) {
    // if (id) {
    //   this.router.navigateByUrl(`/vehicle/form/${id}`);
    // } else {
    //   this.router.navigateByUrl(`/vehicle/form`);
    // }
    this.showForm = true;
    if (id) {
      const vehicle = this.vehicleService.getOne(id);
      if (vehicle) {
        this.vehicleService
          .setVehicleForm(vehicle);
      }
    }
  }

  onFilterByType(type: number) {
    if (type === 0) {
      this.shownVehicles = this.vehicles;
    } else {
      this.shownVehicles = this.vehicles.filter(vehicle => vehicle.type === type);
    }
  }


  hideForm(value: any) {
    console.log(value);
    this.showForm = false;
  }

}
