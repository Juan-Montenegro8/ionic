import { Component, OnInit } from '@angular/core';
import { BlockchainserviceService } from '../services/blockchainservice.service';
import Block from '../block';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-db',
  templateUrl: './eliminar-db.page.html',
  styleUrls: ['./eliminar-db.page.scss'],
})
export class EliminarDBPage implements OnInit {

  constructor(
    private socketService: SocketService,
    public blockchainService: BlockchainserviceService,
    private router: Router,

  ) {
    
   }

  ngOnInit() {
  }

  tab(){
    
    this.router.navigate(['tabs']); // Reemplaza con la ruta correcta de tus pestañas  }

  }

  reiniciarDispositivo(){
    console.log("Funcion ReiniciarDispositivo");
    const previousBlock = this.blockchainService.getLatestBlock();
    const newIndex = previousBlock ? previousBlock.id! + 1 : 1;
    const newTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const data = 'Salir';
    const newBlock = new Block(newIndex, data, previousBlock ? previousBlock.hash : '', newTimestamp, '');
    this.socketService.enviarMensaje(newBlock).then((respuesta) => {
      console.log('Respuesta del servidor para reiniciar todo el sistema: ', respuesta);
      //const comprobarUsuario = JSON.parse(respuesta);
      
    }).catch((error) => {
      console.error('Error al enviar el mensaje reiniciar todo el sistema:', error);
    });
  }

  
}
