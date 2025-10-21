import { Component } from '@angular/core';
import { StorageService } from '../services/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  totalMes: number = 0;
  gastos:[string, number][]= [];
  fecha: string;
  constructor(private storageService: StorageService) {
    this.fecha = new Date().toISOString()  
  }

  async verGastos(){
    const gasto:Gasto[] = await this.storageService.obtenerGasto('gastos')||[];
    const fecha1 = new Date(this.fecha)
    const mes = fecha1.getMonth();
    const year = fecha1.getFullYear();

    const delMes = gasto.filter( g=>{
      const f = new Date(g.fecha);
      return f.getMonth() === mes && f.getFullYear() === year
    });
    this.totalMes = delMes.reduce((ac,g) => ac + Number(g.monto), 0);
     const agrupados: { [key: string]: number } = {};
    delMes.forEach(g => {
      agrupados[g.categoria] = (agrupados[g.categoria] || 0) + Number(g.monto);
    });

    this.gastos = Object.entries(agrupados);
  }
  async fechaCambios(event:any){
    this.fecha = event.detail.value;
    await this.verGastos();
  }
}
interface Gasto {
  monto: number;
  categoria: string;
  fecha: string;
}