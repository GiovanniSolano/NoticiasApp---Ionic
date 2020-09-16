import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const url = environment.url;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});



@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual: string;

  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {

    query = url + query;

    return this.http.get<T>(query, {headers});

  }


  getTopHeadlines() {

    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
  //  return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=us&&apiKey=900a3716026c4aeebe268078bcbbc907
  //   `);
  }


  getTopHeadLinesCategoria(categoria: string) {

    if( this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
