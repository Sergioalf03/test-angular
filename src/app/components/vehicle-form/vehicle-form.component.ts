import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicule.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  form!: FormGroup;
  creatingVehicle = true;

  vehicleId = '';

  @Input() name!: string;
  @Output() hideForm = new EventEmitter<boolean>(false);

  vehicleSubscription!: Subscription;

  constructor(
    private vehicleService: VehicleService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.vehicleSubscription = this.vehicleService
      .getVehicleForm()
      .subscribe(vehicle => {
        this.creatingVehicle = false;
        this.vehicleId = vehicle.id;
        this.setVehicle(vehicle);
      });
  }

  private setVehicle(vehicle: Vehicle) {
    this.form.setValue({
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      color: vehicle.color,
      year: vehicle.year,
      type: vehicle.type,
    });
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

      this.rederictToList();
  }

  private updateVehicle(vehicle: Vehicle) {
    this.vehicleService
      .update(this.vehicleId, vehicle);

      this.rederictToList();
  }

  rederictToList() {
    this.hideForm.emit(true);
  }

  onDelete() {
    this.vehicleService
      .delete(this.vehicleId);

    this.rederictToList();
  }

}
