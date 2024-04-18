import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Router } from '@angular/router';
import { AutenticaciónService } from '../services/autenticación.service';

@Component({
  selector: 'app-finger',
  templateUrl: './finger.page.html',
  styleUrls: ['./finger.page.scss'],
})
export class FingerPage  {

  public msg : string = 'le'
  constructor(
    private fa: FingerprintAIO,
    private router: Router,
    private fingerAuthService: AutenticaciónService){}
  ionViewWillEnter(){

    this.fa.show({
      title: "huella",
      subtitle: "Use huella",

    }).then((res)=>{
      console.log(res)
      this.msg = 'correcta'
      this.router.navigate(['/splash-screen']);
    }).catch((err)=>{
      console.log(err)
      this.msg = "incorrecta"
    })
  }

  abrirComprobadorHuella() {
    this.fa.show({
      title: 'huella',
      subtitle: 'Use huella',
    }).then((res) => {
      console.log(res);
      this.msg = 'correcta';
      this.router.navigate(['/splash-screen']); // Redirigir a la interfaz de pestañas
    }).catch((err) => {
      console.log(err);
      this.msg = 'incorrecta';
      // Puedes agregar más lógica aquí si es necesario
    });
  }

  irAInterfazPrincipal() {
    // Agrega aquí la lógica para redirigir a la interfaz principal
    // Puedes utilizar NavController para navegar a la página que desees
    this.router.navigate(['splash-screen']); // Reemplaza con la ruta correcta de tus pestañas  }
  }

  tab(){
    this.fingerAuthService.setHuellaVerificada(true)
    this.router.navigate(['splash-screen']); // Reemplaza con la ruta correcta de tus pestañas  }

  }
}
