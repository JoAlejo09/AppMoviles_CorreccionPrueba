import { Component } from '@angular/core';
import { StorageService} from '../services/storage';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  gastosDiarios: Gasto []=[];
  fecha: string;
  constructor(private storageService:StorageService) {
    this.fecha = new Date().toISOString();
  }
  verDatos(){
    this.cargarDatos();
  }
  async cargarDatos(){
      const gastos: Gasto[] = await this.storageService.obtenerGasto('gastos') || [];
      const fecha1 = new Date(this.fecha);
      
      this.gastosDiarios = gastos.filter( g => {
        const fechaGasto = new Date(g.fecha);
        return(
          fechaGasto.getDate() === fecha1.getDate() &&
          fechaGasto.getMonth() === fecha1.getMonth() &&
          fechaGasto.getFullYear() === fecha1.getFullYear()
        );
      });
  }
  onFechaChange(event: any) {
    this.fecha = event.detail.value;
    this.cargarDatos();
  }


}
interface Gasto {
  monto: number;
  categoria: string;
  fecha: string;
}

