import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

export interface Sede{
  id: number;
  nombre: string;
  lat: number;
  lng: number;
  descripcion: string;
}

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage   {

  constructor() {}

  private markers : Array<any> =[]
  private ids : Array<string> =[]

  @ViewChild('map') public mapEl!: ElementRef<HTMLElement>;
  public map: any;

  public Sedes: Array<Sede>=[
    {id:1, nombre:'bicentenario', lat: 2.4427423, lng: -76.6077775, descripcion:''},
    {id:2, nombre:'encarnacion', lat: 2.4412309, lng: -76.6082496, descripcion:''},
    {id:3, nombre:'casa obando', lat: 2.4433305, lng: -76.6059456, descripcion:''},
  ];

  getSedes():void{
    this.Sedes.forEach(element =>{
      console.log(element);
      const ubicacion = [{
        name : element.nombre,
        lat : element.lat,
        lng : element.lng,
        descripcion : element.descripcion
      }];
      this.agregarMarcador(ubicacion);
    });
  }

  async obtenerPosition(){
    const coordinates= await Geolocation.getCurrentPosition();
    const miubicacion =[{
      name:'mi ubicacion',
      let: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
      descripcion: 'mi ubicacion'
    }];
    await this.agregarMarcador(miubicacion);
  }

  private async mostrarMapa(): Promise<void> {
    const ubicacion=[{
      nombre: 'Popayan',
      lat: 2.43823,
      lng: -76.61316,
      descripcion: 'ciudad blanca'
    }];
    this.map = await GoogleMap.create({
      id: 'google-map',
      element: this.mapEl.nativeElement,
      apiKey: environment.keys.googleMaps,
      forceCreate:true,
      config:{
        center:{
          lat: ubicacion[0].lat,
          lng: ubicacion[0].lng
        },
        zoom : 14
      }
    });
    await this.agregarMarcador(ubicacion);
  }

  private crearMarcador(location: Array<any>): Array<any> {
    return location.map((location: any, index: number)=>(
      {
        coordinate: {
          lat: location.lat,
          lng : location.lng
        },
        title: location.name,
        snippet: location.descripcion
      }
    ));
  }

  private async agregarMarcador(location:Array<any>): Promise<void> {
    this.markers = this.crearMarcador(location);
    this.ids= await this.map.addMarkers(this.markers);
    this.markers.map((marker, index)=>{
      marker.markerId = this.ids[index];
    });
  }

  ionViewDidEnter(){
    setTimeout(async () => {
      await this.mostrarMapa();
      await this.obtenerPosition();
      await this.getSedes();
    }, 500)
  }

  ngOnDestroy() {
    this.map.removeAllMapListeners();
    this.map.destroy();
    this.map= undefined;
  }

}
