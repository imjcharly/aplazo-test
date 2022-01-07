import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showAlert(message: string, type: string, time?: number) {
    let timeToShow = 2000;
    if (time) {
      timeToShow = time;
    } else {
      timeToShow = 2000;
    }
    switch (type) {
      case 'info':
        Swal.fire({
          icon: 'info',
          title: message,
          showConfirmButton: false,
          timer: timeToShow
        });
        return;
      case 'error':
        Swal.fire({
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: timeToShow
        });
        return;
      case 'error-1':
        Swal.fire({
          icon: 'error',
          title: message,
          showConfirmButton: false,
          timer: timeToShow,
          width: '40%'
        });
        return;
      case 'success':
        Swal.fire({
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: timeToShow
        });
        return;
      case 'warning':
        Swal.fire({
          icon: 'warning',
          title: message,
          showConfirmButton: false,
          timer: timeToShow
        });
        return;
      case 'question':
        Swal.fire({
          icon: 'question',
          title: message,
          showConfirmButton: false,
          timer: timeToShow
        });
        return;
    }
  }

  showLoader(message?: string) {
    Swal.fire({
      title: 'Loading',
      html: message ? message : '',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  }

  closeLoader() {
    Swal.close();
  }
}
