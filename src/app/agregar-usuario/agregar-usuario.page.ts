import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainserviceService } from '../services/blockchainservice.service';
import Block from '../block';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {

  imeiDispositivo: string = '';

  constructor(private router: Router,private socketService: SocketService,public blockchainService: BlockchainserviceService,) { }

  ngOnInit() {
  }

  agregarDispositivo() {

    const previousBlock = this.blockchainService.getLatestBlock();
    const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
    const newTimestamp = this.imeiDispositivo;
    const data = 'Buenas';
    const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');
    this.socketService.enviarMensaje(newBlock).then((respuesta) => {
      console.log('Respuesta del servidor para agregar usuario fin:', respuesta);
      //const comprobarUsuario = JSON.parse(respuesta);
      
    }).catch((error) => {
      console.error('Error al enviar el mensaje:', error);
    });

    // Asegúrate de tener un servicio para manejar la lógica de agregar dispositivos
    //this.dispositivoService.agregarDispositivo(this.imeiDispositivo);
    this.imeiDispositivo = ''; // Limpiar el campo después de agregar el dispositivo
  }

  tab(){
    
    this.router.navigate(['tabs']); // Reemplaza con la ruta correcta de tus pestañas  }

  }
}
