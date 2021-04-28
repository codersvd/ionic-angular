import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, ToastController} from '@ionic/angular';

import {UploadPhotoComponent} from './upload-photo.component';
import {UploadPhotoService} from "./upload-photo.service";
import {PhotoService} from "../../core/services/photo.service";
import {CoreService} from "../../core/services/core.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UploadPhotoComponent', () => {
  let component: UploadPhotoComponent;
  let fixture: ComponentFixture<UploadPhotoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPhotoComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        CoreService,
        ToastController,
        PhotoService,
        UploadPhotoService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
