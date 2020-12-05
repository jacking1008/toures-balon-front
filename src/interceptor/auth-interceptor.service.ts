import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { LoadingController, ToastController } from '@ionic/angular';
import { TmplAstVariable } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  router: any;
  alert: any;
  loading: any;
  loadingExisting = false;
  laodingTask = 0;
  statusError: any;
  statusWarning: any;

  constructor(
    public loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {

  }

  messagesInter(err) {
    this.statusWarning = this.presentToast(err,'warning');
  }
  messagesExtern() {
    this.statusError = this.presentToast('Error Interno ! Intente Mas Tarde!','danger');
  }

  /**
    Definición de peticiones para el interceptor
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.presentLoading();
    /*if(request.url != 'http://localhost:8000/api/auth/login'){
      request = request.clone({
        withCredentials: true
      });
    }*/
    
    return next.handle(request).pipe(
      tap(
        data => {
          // console.log(request);
        },
        err => {
          console.log(request, 'ERROR');
          this.loadingCtrl.dismiss();

          if (err.status === 401) {
            debugger
            this.messagesInter(err.error);
          } else if (err.status == 500) {
            this.presentToast('Error al realizar el pago, intente más tarde','danger');
          } else if (err.status == 501) {
            this.messagesExtern();
          } else if (err.status == 501) {
            this.presentToast('Error al realizar el pago, intente más tarde','danger');
          }
        }
      )
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor ...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
