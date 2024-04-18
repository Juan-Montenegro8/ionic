import { Component, OnInit } from '@angular/core';
import { BlockchainserviceService } from '../services/blockchainservice.service';
import Block from '../block';
import { DbserviceService } from '../services/db.service';
import { Device } from '@ionic-native/device/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ImeiService } from '../services/imei.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  blocks: Block[] = [];
  mostrarIMEI: boolean = false;
  imei:string = '';

  constructor(
    private blockchainService: BlockchainserviceService,
    private router: Router,
    private socketService: SocketService, private imeiService: ImeiService, private dbService: DbserviceService,private androidPermissions: AndroidPermissions,private device: Device ) {
    this.getIMEI();
  }

  ngOnInit(): void {
    this.dbService.subscribeBlocks().subscribe(blocks => {
      this.blocks = blocks;
    });
  }

  obtenerIMEI() {
    this.imeiService.getIMEI();
    // Una vez que el IMEI esté disponible, puedes asignarlo a la variable imei
    //this.imei = this.imeiService.imei;
    //console.log(this.imei);
  }
  

  toggleMostrarIMEI() {
    this.getIMEI();
    this.mostrarIMEI = !this.mostrarIMEI;
  }

  eliminarDB(){
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
        this.router.navigate(['/eliminar-db']);
      } else {
        // Si la respuesta es false, el splash screen permanece visible
        console.log('El servidor aún no está listo para ir a agregar usuario...');
      }
    }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
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
