import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImeiService {

  imei: string='';

  constructor(private device: Device, private androidPermissions: AndroidPermissions) { }

  getIMEI() {
    if (this.device.platform === 'Android') {
      this.androidPermissions
        .checkPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
        .then((status) => {
          if (status.hasPermission) {
            this.imei = this.device.uuid;
            console.log('IMEI:', this.imei);
          } else {
            this.androidPermissions
              .requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE)
              .then((result) => {
                if (result.hasPermission) {
                  this.imei = this.device.uuid;
                  console.log('IMEI:', this.imei);
                } else {
                  console.error('Permiso no concedido para READ_PHONE_STATE');
                }
              })
              .catch((error) => {
                console.error('Error al solicitar permiso:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error al verificar permisos:', error);
        });
    } else {
      console.warn('El IMEI no está disponible en esta plataforma.');
    }
  }

}
