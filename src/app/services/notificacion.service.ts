import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private nuevaNotificacionSubject = new Subject<any>();

  nuevaNotificacion$ = this.nuevaNotificacionSubject.asObservable();
  constructor() { }

  crearNotificacion() {
    const nuevaNotificacion = {
      titulo: 'Petición RFID',
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString()
    };
    this.nuevaNotificacionSubject.next(nuevaNotificacion);
    console.log('Notificación creada:', nuevaNotificacion);
  }
}
