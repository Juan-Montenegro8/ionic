import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Subscription } from 'rxjs';
import Block from '../block';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  notificaciones: any[] = [];
  nuevaNotificacionSubscription: Subscription;

  constructor(private notificationService: NotificacionService,private socketService: SocketService) {
    this.nuevaNotificacionSubscription = this.notificationService.nuevaNotificacion$.subscribe(nuevaNotificacion => {
      this.notificaciones.push(nuevaNotificacion);
    });
  }

  ngOnInit() {
    // this.notificationService.nuevaNotificacion$.subscribe(notification => {
    //   this.notificaciones.push(notification);
    // });
  }

  aceptarNotificacion(notificacion: any) {
    // Lógica para aceptar la notificación
    console.log('Notificación aceptada:', notificacion);

    if (this.socketService.socket && this.socketService.socket.readyState === WebSocket.OPEN) {

      const previousBlock = "";
      const newIndex = 1;
      const newTimestamp = "noti";
      const data = 'rfidActivar';

      const newBlock = new Block(newIndex, data, previousBlock , newTimestamp, '');

      console.log("Abrir puerta notificacion!: "+newBlock.id+" "+newBlock.data+" "+newBlock.previousHash+" "+newBlock.timestamp);

      //this.socketService.enviarMensaje(newBlock);
      this.socketService.enviarMensaje(newBlock).then((respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
      }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });
      //console.log('Bloque enviado al servidor');
    } else {
      //this.socketService.configureSocketWithIMEI(this.imei);
      console.error('No hay conexión con el servidor WebSocket');
      // Puedes manejar la falta de conexión aquí, por ejemplo, mostrar un mensaje al usuario
    }

    const index = this.notificaciones.indexOf(notificacion);
    if (index !== -1) {
      this.notificaciones.splice(index, 1); // Eliminar la notificación del arreglo
    }
  }

  cancelarNotificacion(notificacion: any) {
    console.log('Notificación cancelada:', notificacion);
    const index = this.notificaciones.indexOf(notificacion);
    if (index !== -1) {
      this.notificaciones.splice(index, 1); // Eliminar la notificación del arreglo
    }
  }
}
