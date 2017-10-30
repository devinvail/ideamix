import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNoticePage } from './add-notice';

@NgModule({
  declarations: [
    AddNoticePage,
  ],
  imports: [
    IonicPageModule.forChild(AddNoticePage),
  ],
})
export class AddNoticePageModule {}
