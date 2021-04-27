import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../auth/Auth.service';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {
  urls = environment.urls;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService,
  ) {
  }

  getStatus(): Observable<any> {
    if (this.authService.authObject) {
      return this.httpClient.get(this.authService.authObject.apiserver + this.urls.getStatusServer.url);
    }
    return of();
  }

  getUploadedImage(namePhotoWithExt): string {
    return this.authService.authObject.apiserver + this.urls.getImage.url + namePhotoWithExt;
  }

  uploadImageToServer(photoBase64: string): Observable<any> {
    return this.httpClient.post(this.authService.authObject.apiserver + this.urls.uploadPhoto.url, {picture: photoBase64});
  }
}
