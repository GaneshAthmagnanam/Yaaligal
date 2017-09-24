import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmerFullDetailsPage } from './farmer-full-details';

@NgModule({
  declarations: [
    FarmerFullDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmerFullDetailsPage),
  ],
})
export class FarmerFullDetailsPageModule {}
