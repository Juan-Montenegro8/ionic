import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';
import Block from '../block';
import { Router, RouterPreloader  } from '@angular/router';
import { AutenticaciónService } from '../services/autenticación.service';
import { BlockchainserviceService } from '../services/blockchainservice.service';
import { DbserviceService } from '../services/db.service';
import { ImeiService } from '../services/imei.service';
import { SocketService } from '../services/socket.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-iot',
  templateUrl: './iot.page.html',
  styleUrls: ['./iot.page.scss'],
})
export class IotPage implements OnInit {
  isInitializing = true;
  imei:string = '';
  public block: Block | null = null;
  isOpen: boolean = false;
  botonColor: string = 'primary';
  socket!: WebSocket;
  colorBoton: string = 'danger';

  constructor(
    private androidPermissions: AndroidPermissions, 
    private routerPreloader: RouterPreloader,
    private device: Device, 
    private imeiService: ImeiService,
    private socketService: SocketService,
    public dbservice: DbserviceService,
    public blockchainService: BlockchainserviceService,
    private router: Router,
    private fingerAuthService: AutenticaciónService
  ) {
    this.obtenerIMEI();
    this.getIMEI();
    this.comprobarConexion();
    this.dbservice = dbservice;
    //this.simulateInitialization();
  }

  comprobarConexion(){
    if (this.socketService.socket && this.socketService.socket.readyState === WebSocket.OPEN){
      this.colorBoton = 'success';
    } else {
      this.colorBoton = 'danger';
      //this.socketService.configureSocketWithIMEI(this.imei);
      console.error('No hay conexión con el servidor WebSocket');
      // Puedes manejar la falta de conexión aquí, por ejemplo, mostrar un mensaje al usuario
    }
  }

  

  alternarFunciones() {
    if (this.isOpen) {
      // Lógica para cerrar
      this.cerrarPuerta();
    } else {
      // Lógica para abrir
      this.abrirPuerta();
    }
  }

  obtenerIMEI() {
    this.imeiService.getIMEI();
    // Una vez que el IMEI esté disponible, puedes asignarlo a la variable imei
    //this.imei = this.imeiService.imei;
    //console.log(this.imei);
  }

  iniciarConexion() {
    //this.socketService.configureSocketWithIMEI(this.imei);
  }

  agregarUsuario(){
    const previousBlock = this.blockchainService.getLatestBlock();
    const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
    const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const data = 'agregarUsuario';
    const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');
    this.socketService.enviarMensaje(newBlock).then((respuesta) => {
      console.log('Respuesta del servidor para agregar usuario:', respuesta);
      const comprobarUsuario = JSON.parse(respuesta);
      if (comprobarUsuario=="admin") {
        // Si la respuesta es true, oculta el splash screen
        console.log("viajando a Registrar Usuario");
        this.router.navigate(['/agregar-usuario']);
      } else {
        // Si la respuesta es false, el splash screen permanece visible
        console.log('El servidor aún no está listo para ir a agregar usuario...');
      }
    }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });
    
    
  }

  eliminarUsuario(){
    const previousBlock = this.blockchainService.getLatestBlock();
    const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
    const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const data = 'agregarUsuario';
    const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');
    this.socketService.enviarMensaje(newBlock).then((respuesta) => {
      console.log('Respuesta del servidor para Eliminar usuario:', respuesta);
      const comprobarUsuario = JSON.parse(respuesta);
      if (comprobarUsuario=="admin") {
        // Si la respuesta es true, oculta el splash screen
        console.log("viajando a Eliminar Usuario");
        this.router.navigate(['/eliminar-usuario']);
      } else {
        // Si la respuesta es false, el splash screen permanece visible
        console.log('El servidor aún no está listo para ir a Eliminar usuario...');
      }
    }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });
    
    
  }



  abrirPuerta() {
    this.comprobarConexion();
    
    // Verificar conexión antes de enviar el bloque al servidor
    if (this.socketService.socket && this.socketService.socket.readyState === WebSocket.OPEN) {
      this.isOpen = true;
      //this.botonColor= 'primary';
      const previousBlock = this.blockchainService.getLatestBlock();
      const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
      const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const data = '1';

      const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');

      console.log("Abrir puerta: "+newBlock.id+" "+newBlock.data+" "+newBlock.previousHash+" "+newBlock.timestamp);
      this.blockchainService.addBlock(newBlock);
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
  }

  // abrirPuerta() {

  //   // Verificar conexión antes de enviar el bloque al servidor
  //   if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  //     const previousBlock = this.blockchainService.getLatestBlock();
  //     const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
  //     const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  //     const data = 'abrir';

  //     const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');

  //     this.blockchainService.addBlock(newBlock);
  //     this.socket.send(JSON.stringify(newBlock));
  //     console.log('Bloque enviado al servidor');
  //   } else {
  //     this.configureSocketWithIMEI();
  //     console.error('No hay conexión con el servidor WebSocket');
  //     // Puedes manejar la falta de conexión aquí, por ejemplo, mostrar un mensaje al usuario
  //   }
  // }
  // configureSocketWithIMEI() {
  //   if (this.imei) {
  //     // Configurar la conexión del socket con el IMEI
  //     this.socket = new WebSocket(`ws://100.86.168.88:8080`);

  //     // Escucha eventos del WebSocket
  //     this.socket.addEventListener('open', (event) => {
  //       console.log('Conexión establecida con el servidor WebSocket');
  //     });

  //     this.socket.addEventListener('message', (event) => {
  //       console.log(`Mensaje recibido del servidor: ${event.data}`);

  //       // Puedes realizar acciones adicionales con el mensaje aquí
  //     });
  //   } else {
  //     console.error('IMEI no disponible. No se puede configurar la conexión del socket.');
  //   }
  // }

  cerrarPuerta() {
    this.comprobarConexion();
    // Verificar conexión antes de enviar el bloque al servidor
    if (this.socketService.socket && this.socketService.socket.readyState === WebSocket.OPEN) {
      this.isOpen = false;
      //this.botonColor = 'danger';
      const previousBlock = this.blockchainService.getLatestBlock();
      const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
      const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const data = '0';

      const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');
      console.log("Cerrar puerta: "+newBlock.id+" "+newBlock.data+" "+newBlock.previousHash+" "+newBlock.timestamp);
      this.blockchainService.addBlock(newBlock);
      this.socketService.enviarMensaje(newBlock).then((respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
      }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      });
      // this.socketService.enviarMensaje(newBlock);
      // console.log('Bloque enviado al servidor');
    } else {
      //this.socketService.configureSocketWithIMEI(this.imei);
      console.error('No hay conexión con el servidor WebSocket');
      // Puedes manejar la falta de conexión aquí, por ejemplo, mostrar un mensaje al usuario
    }
  }

  

  private simulateInitialization() {
    setTimeout(() => {
      // Fin de la inicialización después de 2 segundos
      this.isInitializing = false;
      //this.obtenerIMEI();
      // Configurar la conexión del socket con el IMEI después de la inicialización
      this.iniciarConexion();
    }, 2000);
  }

  abrirComprobadorHuella() {
    this.fingerAuthService.setHuellaVerificada(false);
    this.router.navigate(['finger']);
  }

  ngOnInit() {
    const l = this.fingerAuthService.getHuellaVerificada();
    if (!l) {
      this.router.navigate(['finger']);
    }
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


