import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  baseURL: string = 'https://brasilapi.com.br/api'
  constructor(private http: HttpClient) { }

  listarUFs() : Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseURL}/ibge/uf/v1`)
  }
  listarMunicipios(uf: string) : Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.baseURL}/ibge/municipios/v1/${uf}`)
  }
}
