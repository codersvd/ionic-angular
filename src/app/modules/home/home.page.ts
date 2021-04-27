import {Component} from '@angular/core';
import {BarcodeScanner, BarcodeScanResult} from '@ionic-native/barcode-scanner/ngx';
import {IQRScannedObject} from '../../core/interfaces/IQRScannedObject';
import {AuthenticationService} from '../../auth/Auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private barcodeScanner: BarcodeScanner,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  onScanQR() {
    this.barcodeScanner.scan(
      {
        preferFrontCamera: true,
        showFlipCameraButton: true,
        showTorchButton: true,
        torchOn: true,
        prompt: 'Place a QR code inside the scan area',
        resultDisplayDuration: 500,
        formats: 'QR_CODE,PDF_417',
        orientation: 'landscape',
        disableAnimations: true,
        disableSuccessBeep: false
      }
    ).then((barcodeData: BarcodeScanResult) => {
      this.authenticationService.authObject = this.transferStringToQRObject(barcodeData.text);
      this.router.navigate(['/uploadPhoto']);
    });
  }

  transferStringToQRObject(str: string): IQRScannedObject {
    const [apiserver, username, password] = str.split(';').map((val: string) => new RegExp('^(.*?):(.*?)$', 'g').exec(val));

    return {
      apiserver: apiserver[2] ?? '',
      user: username[2] ?? '',
      password: password[2] ?? '',
    };
  }

}
