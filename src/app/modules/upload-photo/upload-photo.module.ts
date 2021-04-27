import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploadPhotoComponent} from './upload-photo.component';
import {IonicModule} from '@ionic/angular';
import {UploadPhotoRoutingModule} from './upload-photo-routing.module';

@NgModule({
  declarations: [
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    UploadPhotoRoutingModule
  ]
})
export class UploadPhotoModule { }
