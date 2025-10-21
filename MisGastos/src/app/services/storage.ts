import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage : Storage | null = null;
  constructor(private storage:Storage){
    this.init();
  }
  async init(){
    this._storage = await this.storage.create();
  }
  async agregarGasto(gasto: string, datos:any){
    await this._storage?.set(gasto,datos);
  }
  async obtenerGasto(gasto: string){
    return await this.storage?.get(gasto);
  }

  
}
interface Gasto {
  monto: number;
  categoria: string;
  fecha: string;
}
