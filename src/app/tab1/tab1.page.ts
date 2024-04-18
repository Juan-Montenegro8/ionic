import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticaciónService } from '../services/autenticación.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  isInitializing = true;

  constructor(
    private router: Router,
    private fingerAuthService: AutenticaciónService) {
    this.simulateInitialization();
  }

  private simulateInitialization() {
    setTimeout(() => {
      // Fin de la inicialización después de 2 segundos
      this.isInitializing = false;
    }, 2000);
  }

  abrirComprobadorHuella() {
    this.fingerAuthService.setHuellaVerificada(false)
    this.router.navigate(['finger']); // Reemplaza con la ruta correcta de tus pestañas  }

  }
  ngOnInit() {
    const l = this.fingerAuthService.getHuellaVerificada()
    if (l) {

    } else {
      this.router.navigate(['finger']);
    }

  }
}
