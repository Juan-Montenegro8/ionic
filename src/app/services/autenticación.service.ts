import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticaciónService {
  private huellaVerificada: boolean = false;
  getHuellaVerificada(): boolean {
    return this.huellaVerificada;
  }

  setHuellaVerificada(value: boolean): void {
    this.huellaVerificada = value;
  }
}
