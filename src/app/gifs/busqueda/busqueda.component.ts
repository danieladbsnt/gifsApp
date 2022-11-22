import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})

export class BusquedaComponent {

//En el parentesis se pone el nombre del elemento que queremos buscar, se puede hacer por etiquetas (h5), por directivas, por clases...
//o como en este caso por la referencia local especificada (#txtBuscar)
@ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

constructor(private gifsService: GifsService) {}

buscar() {
  const valor = this.txtBuscar.nativeElement.value;

  this.gifsService.buscarGifs(valor)
  this.txtBuscar.nativeElement.value = '';
}
}
