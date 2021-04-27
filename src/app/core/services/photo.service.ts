import {Injectable} from '@angular/core';
import {CameraPhoto, CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {IPhoto} from '../interfaces/IPhoto';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photo: IPhoto;

  constructor() {
  }

  public async takePhoto() {
    // Take a photo
    const capturedPhoto = await Plugins.Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photo = this.savePicture(capturedPhoto);
  }

  getPhoto(){
    return this.photo;
  }

  private savePicture(cameraPhoto: CameraPhoto): IPhoto {
    const base64Data = cameraPhoto.dataUrl;
    return {
      fileBase64: base64Data,
      webviewPath: cameraPhoto.webPath
    };
  }
}
