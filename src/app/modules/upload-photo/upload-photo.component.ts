import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoreService} from '../../core/services/core.service';
import {ToastController} from '@ionic/angular';
import {tap} from 'rxjs/operators';
import {PhotoService} from '../../core/services/photo.service';
import {UploadPhotoService} from './upload-photo.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IImage} from '../../core/interfaces/IImage';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit, OnDestroy {
  readonly TIME_SHOWING_SERVER_SUCCESS = 2000; // 2 sec
  readonly STATUS_SERVER_OK = 'ok';
  readonly STATUS_UPLOADED_PHOTO = 'ok - saved';

  nameOfUploadedPhoto = new BehaviorSubject<string>(null);
  nameOfUploadedPhoto$ = this.nameOfUploadedPhoto.asObservable();

  subscriptions: Subscription = new Subscription();

  constructor(
    private coreService: CoreService,
    public toastController: ToastController,
    private photoService: PhotoService,
    private uploadPhotoService: UploadPhotoService,
  ) {
  }

  ngOnInit() {
  }

  isStatusOk(): boolean {
    return this.coreService.statusServer;
  }

  getPhoto() {
    return this.uploadPhotoService.getUploadedImage(this.nameOfUploadedPhoto.getValue());
  }

  async onCheckStatusServer() {
    const toast = await this.toastController.create({
      message: `Server status: OK`,
      duration: this.TIME_SHOWING_SERVER_SUCCESS,
      color: 'success'
    });

    this.subscriptions.add(this.uploadPhotoService.getStatus().pipe(
      tap((objectWithStatus) => {
        this.coreService.statusServer = false;
        if (objectWithStatus.status === this.STATUS_SERVER_OK) {
          this.coreService.statusServer = true;
          toast.present();
        }
      })
    ).subscribe());
  }

  takePhoto() {
    this.photoService.takePhoto().then(() => {
      const takingPhoto = this.photoService.getPhoto();
      this.subscriptions.add(this.uploadPhotoService.uploadImageToServer(takingPhoto.fileBase64).pipe(
        tap((image: IImage) => {
          if (image.status === this.STATUS_UPLOADED_PHOTO) {
            this.nameOfUploadedPhoto.next(image.file);
          }
        })
      ).subscribe());
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
