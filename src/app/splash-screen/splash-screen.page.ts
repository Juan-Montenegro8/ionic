import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SocketService } from '../services/socket.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {
  imei:string ='';
  isInitializing = true;

  dispositivoBaseDatos: string='';

  constructor(
    private androidPermissions: AndroidPermissions, 
    private device: Device,
    private router: Router,
    private platform: Platform,
    private socketService: SocketService // Inyecta tu servicio WebSocket
  ) {
    this.getIMEI();
    //this.simulateInitialization();
    this.initializeApp();
  }
  ngOnInit(): void {
      
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Configura el socket con el IMEI y maneja el splash screen
      this.socketService.configureSocketWithIMEI().then((respuesta) => {
        if (respuesta) {
          // Si la respuesta es true, oculta el splash screen
          console.log("viajando a tabs");
          this.router.navigate(['/tabs']);
        } else {
          // Si la respuesta es false, el splash screen permanece visible
          console.log('El servidor aún no está listo...');
        }
      });
    });
  }




  tab(){
    
    this.router.navigate(['/tabs']); // Reemplaza con la ruta correcta de tus pestañas  }

  }

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
