import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverallContributorsPage } from './overall-contributors';

@NgModule({
  declarations: [
    OverallContributorsPage,
  ],
  imports: [
    IonicPageModule.forChild(OverallContributorsPage),
  ],
})
export class OverallContributorsPageModule {}
