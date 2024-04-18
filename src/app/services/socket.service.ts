import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import { NotificacionService } from './notificacion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket!: WebSocket;
  imei: string = '';
  imeipc: string = '12345'

  constructor(
    private router: Router,
    private androidPermissions: AndroidPermissions,private notificationService: NotificacionService,
    private device: Device, ) {this.getIMEI(); }

  configureSocketWithIMEI(): Promise<boolean> {
    
    return new Promise<boolean>((resolve, reject) => {
      if (this.imei) {
        // Configurar la conexión del socket con el IMEI
        //this.socket = new WebSocket(`ws://10.42.0.1:8081?id=${this.imei}`);
        this.socket = new WebSocket(`ws://10.42.0.1:8081?id=${this.imeipc}`);
        //this.socket = new WebSocket(`ws://10.42.0.1:8081?id=${this.imeipc}`);
        //this.socket = new WebSocket(`wss://d1f2-191-95-36-63.ngrok-free.app?id=${this.imei}`);
        //this.socket = new WebSocket(`ws://191.95.29.120?id=${this.imeipc}`);
        

        this.router.navigateByUrl('/tabs/tab2', { skipLocationChange: true }).then(() => {
          console.log('La pestaña tab2 se ha precargado');
        }).catch(error => {
          console.error('Error al precargar la pestaña tab2:', error);
        });
        this.router.navigateByUrl('/tabs/iot', { skipLocationChange: true }).then(() => {
          console.log('La pestaña tab2 se ha precargado');
        }).catch(error => {
          console.error('Error al precargar la pestaña tab2:', error);
        });


        // Escucha eventos del WebSocket
        this.socket.addEventListener('open', (event) => {
          console.log('Conexión establecida con el servidor WebSocket');
        });

        this.socket.addEventListener('message', (event) => {
          console.log(`Mensaje recibido del servidor: ${event.data}`);

          // Realiza acciones adicionales con el mensaje aquí
          const respuesta = JSON.parse(event.data);
          console.log(respuesta);
          if (respuesta === '1') {
            resolve(true); // Resuelve la promesa con true si la respuesta es 'ok'
          }else if (respuesta === "abrirnoti") {
            // Manejar la notificación recibida del servidor
            this.notificationService.crearNotificacion();
            // Aquí podrías mostrar la notificación en la interfaz de usuario, por ejemplo.
          }
           else {
            resolve(false); // Resuelve la promesa con false si la respuesta no es 'ok'
          }
        });
      } else {
        console.error('IMEI no disponible. No se puede configurar la conexión del socket.');
        reject(false); // Rechaza la promesa si no hay IMEI disponible
      }
    });
  }

  enviarMensaje(mensaje: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.socket.readyState === WebSocket.OPEN) {
        // Si el socket está abierto, enviar el mensaje al servidor
        this.socket.send(JSON.stringify(mensaje));

        // Manejar la respuesta del servidor cuando se recibe un mensaje
        this.socket.addEventListener('message', (event) => {
          console.log(`Mensaje recibido del servidor: ${event.data}`);
          resolve(event.data); // Resuelve la promesa con la respuesta del servidor
        });
      } else {
        console.error('El socket no está abierto. No se puede enviar el mensaje.');
        reject('El socket no está abierto.'); // Rechaza la promesa si el socket no está abierto
      }
    });
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
