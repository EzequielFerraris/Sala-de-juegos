import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BanderasService {

  private url = 'https://restcountries.com/v3.1/all?fields=translations,capital,flags';

  constructor(private http : HttpClient) 
  { }

  obtener_paises()
  {
    return this.http.get<any[]>(this.url);
  }
}

