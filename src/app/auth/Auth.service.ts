import {Injectable} from '@angular/core';
import {IQRScannedObject} from '../core/interfaces/IQRScannedObject';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private authUserObject: IQRScannedObject;

  constructor() {
  }

  get authObject() {
    return this.authUserObject;
  }

  set authObject(value) {
    this.authUserObject = value;
  }
}
