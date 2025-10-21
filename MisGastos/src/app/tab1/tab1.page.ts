import { Component } from '@angular/core';
import {StorageService} from '../services/storage'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  monto: number = 0;
  categoria: string = '';
  fecha: string = new Date().toISOString();

  constructor(private storageService: StorageService) {}

  async guardarGasto(){
    if(!this.monto || !this.categoria){
      alert("No puede haber campos vacios");
    }
    const gasto = {
      monto: this.monto,
      categoria: this.categoria,
      fecha: this.fecha
    }
    const gastos = await this.storageService.obtenerGasto('gastos')||[];
    gastos.push(gasto);

    await this.storageService.agregarGasto('gastos',gastos);
    
    this.monto = 0;
    this.categoria = '';
    this.fecha = new Date().toISOString();
  }

}
