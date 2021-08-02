import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicule.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  form!: FormGroup;
  creatingVehicle = true;

  vehicleId = '';

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log(this.vehicleService.getAll());
    this.initForm();
    this.activatedRoute
      .paramMap
      .subscribe(paramMap => {
        if (paramMap.has('id')) {
          this.creatingVehicle = false;
          const id = paramMap.get('id');
          if (id) {
            this.vehicleId = id;
          }
          this.setVehicle();
        }
      });
  }

  private setVehicle() {
    const vehicle = this.vehicleService
      .getOne(this.vehicleId);

    if (vehicle) {
      this.form.setValue({
        id: vehicle.id,
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        year: vehicle.year,
        type: vehicle.type,
      })
    }

  }

  private initForm() {
    this.form = new FormGroup({
      id: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
        ]
      }),
      brand: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      model: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      color: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      year: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
      type: new FormControl('', {
        validators: [
          Validators.required,
        ]
      }),
    });
  }

  submit() {
    if (this.form.invalid) {
      console.log('Error, verifica el formulario');
      return;
    }

    const vehicle = new Vehicle(
      this.form.controls.id.value,
      this.form.controls.brand.value,
      this.form.controls.model.value,
      this.form.controls.color.value,
      this.form.controls.year.value,
      this.form.controls.type.value,
    );

    if (this.creatingVehicle) {
      this.createVehicle(vehicle);
    } else {
      this.updateVehicle(vehicle);
    }
  }

  private createVehicle(vehicle: Vehicle) {
    this.vehicleService
      .insert(vehicle);
      console.log(this.vehicleService.getAll());
  }

  private updateVehicle(vehicle: Vehicle) {
    this.vehicleService
      .update(this.vehicleId, vehicle);
      console.log(this.vehicleService.getAll());
  }

}
