import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchGifsResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
//propiedad privada para almacenar apiKey  
  private apiKey: string = 'fNwGlTMxTUZB9ngKW2uVmggQo82BSaIy';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
//propiedad privada para almacenar los strings
  private _historial: string[] = [];
//propiedad pública para almacenar los resultados
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

//constructor se ejecuta una sola vez cuando el servicio es llamado
  constructor(private http: HttpClient) {

    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!); //! -> se usa para decirle a TS que nos haga caso porque sabemos que estamos haciendo. Sin el ! daría error.
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }

  }

/*función para insertar valores al historial*/
  buscarGifs(query:string = '') {

    query = query.trim().toLowerCase();

//si no existe la query, la inserto.
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);//para meter la query al principio del array
      this._historial = this._historial.splice(0,10);//para devolver solo 10 resultados
      //para guardar en el localStorage las búsquedas. Guardamos en el localStorage cuando se cortan a 10 los resultados
      localStorage.setItem('historial', JSON.stringify(this._historial)); //usamos JSON.stringify porque this._historial es un objeto y setItem solo puede recibir strings.
    }

  const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

//petición HTTP
//se aconseja poner en el get el <SearchGifsResponse> porque el get es de tipo genérico. El get trae una información que luce como la interfaz SearchGifsResponse
  this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe((resp) => { //subscribe se ejecuta cuando tenemos la resolución del get().
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })    
  
  }

}
