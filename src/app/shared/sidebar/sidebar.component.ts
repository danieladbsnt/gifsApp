import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

//crear nueva propiedad para obtener el historial y para que esté conectado a la información del 
//historial que está en el servicio (la propiedad get historial() del servicio)
//2-una vez inyectado el servicio, podemos acceder al historial del servicio:  this.gifsService.historial;
get historial() {
 return this.gifsService.historial;
}

//1-inyectamos el servicio:

constructor(private gifsService: GifsService) {}

/* función para que al hacer click en las búsquedas ya hechas que están en el sidebar, se vuelvan a pintar las imágenes */
buscar(item: string) {
  this.gifsService.buscarGifs(item); //como ya hay en el servicio la validación, no se vuelve a crear porque ya existe lo que estamos buscando.

}
}