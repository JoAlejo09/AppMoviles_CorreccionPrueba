import { Component} from '@angular/core';
import { StorageService } from '../services/storage';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: false,

})
export class Tab4Page {
  historial:Gasto[]=[];
  constructor(private storageService: StorageService) { }

  async mostrarHistorial(){
    const gastos: Gasto[] = await this.storageService.obtenerGasto('gastos');
    this.historial = gastos.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime() );
  }

}
interface Gasto {
  monto: number;
  categoria: string;
  fecha: string;
}