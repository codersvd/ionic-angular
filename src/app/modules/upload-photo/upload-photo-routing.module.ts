import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadPhotoComponent} from "./upload-photo.component";

const routes: Routes = [
  {
    path: '',
    component: UploadPhotoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPhotoRoutingModule {}
