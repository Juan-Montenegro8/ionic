import { Component } from '@angular/core';
import { NotificacionService } from './services/notificacion.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    //instanciamos en el contructor la conexion con la bd
    private notificationService: NotificacionService
  ) {
    //Inicializamos la app
    this.initApp();
  }

  async initApp(){
    //Invoca el metodo de initialize que declaramos anteriromente en el servicip
    
  }
}
