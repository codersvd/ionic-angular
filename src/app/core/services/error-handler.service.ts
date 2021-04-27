import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from "@ionic/angular";

@Injectable()
export class ErrorHandlerService {
  timeShowingTextError = 5000; // 5 sec

  constructor(private injector: Injector, public toastController: ToastController) {
  }

  async handleError(error) {
    const router = this.injector.get(Router);
    const toast = await this.toastController.create({
      message: `Error: ${error.message}`,
      duration: this.timeShowingTextError,
      color: 'danger'
    });

    toast.present();

    console.log('%cURL: ' + router.url, 'color:firebrick');
    console.error('%cAn error occurred:', 'font-weight: bold', JSON.stringify(error.message));
  }
}
