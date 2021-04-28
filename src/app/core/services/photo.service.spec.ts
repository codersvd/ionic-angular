import { TestBed } from '@angular/core/testing';

import { PhotoService } from './photo.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('PhotoService', () => {
  let service: PhotoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers:[
        PhotoService
      ]
    });
    service = TestBed.inject(PhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a photo object', () => {
    service.photo = {
      fileBase64: 'data:image/jpeg;base64,<BASE64_IMG>',
      webviewPath: ''
    };

    const photo = service.getPhoto();
    expect(photo.fileBase64).toContain('data:image/jpeg;base64,');
  });
});
