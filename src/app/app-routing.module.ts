
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

const APP_ROUTES : Routes = [
  {path: '', pathMatch : 'full', redirectTo : 'home'},
  {path: 'home', component : AppComponent},
  {
    path: 'vehicle',
    loadChildren: () => import('./pages/vehicle/vehicle.module').then(m => m.VehicleModule),
  },
]

@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
