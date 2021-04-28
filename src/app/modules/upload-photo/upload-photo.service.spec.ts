import {TestBed} from '@angular/core/testing';

import {UploadPhotoService} from './upload-photo.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthenticationService} from "../../auth/Auth.service";

describe('UploadPhotoService', () => {
  let service: UploadPhotoService;
  let httpMock: HttpTestingController;

  const mockStatusOkObject = {status: 'ok'};
  const mockStatusNotOkObject = {status: 'error'};

  const mockAuthSerice: any = {
    authObject: {
      apiserver: 'https://localhost/',
      user: 'user',
      password: '123',
    },
  };

  const mockUploadedPhotoObject = {file: "picture.jpeg", status: "ok - saved"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UploadPhotoService,
        {provide: AuthenticationService, useValue: mockAuthSerice}
      ]
    });
    service = TestBed.inject(UploadPhotoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStatus() should return object with status OK', () => {
    service.getStatus().subscribe((statusObject) => {
      expect(statusObject).toEqual(mockStatusOkObject);
    });

    const req = httpMock.expectOne('https://localhost/api/v1.0/status');
    expect(req.request.method).toBe('GET');
    req.flush(mockStatusOkObject);
  });

  it('getStatus() should return object with status Not OK', () => {
    service.getStatus().subscribe((statusObject) => {
      expect(statusObject).toEqual(mockStatusNotOkObject);
    });

    const req = httpMock.expectOne('https://localhost/api/v1.0/status');
    expect(req.request.method).toBe('GET');
    req.flush(mockStatusNotOkObject);
  });

  it('uploadImageToServer() should return object', () => {
    const photoNameBase64 = 'data:image/jpeg;base64,<BASE64_IMG>';

    expect(photoNameBase64).toContain('data:image/jpeg;base64,');

    service.uploadImageToServer(photoNameBase64).subscribe((uploadedPhotoObject) => {
      expect(uploadedPhotoObject).toEqual(mockUploadedPhotoObject);
    });

    const req = httpMock.expectOne('https://localhost/api/v1.0/ranking');
    expect(req.request.method).toBe('POST');
    req.flush(mockUploadedPhotoObject);
  });

  it('getUploadedImage() should return a link to picture on the server', () => {
    expect(service.getUploadedImage('picture.jpeg')).toEqual(`https://localhost/api/v1.0/image/${mockUploadedPhotoObject.file}`);
  });

});
