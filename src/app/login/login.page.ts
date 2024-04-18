import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  //email: string;
  //password: string;
  nombre: string = '';
  constructor(private router: Router) {}

  capturarNombre() {
    console.log('El nombre capturado es:', this.nombre);
   
  }

  tab(){
    
    this.router.navigate(['tabs']); // Reemplaza con la ruta correcta de tus pestañas  }

  }
}
