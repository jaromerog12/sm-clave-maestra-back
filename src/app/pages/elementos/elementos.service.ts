import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elemento } from './listar-elementos/listar-elementos.component';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementosService {
  private apiUrl = `${environment.apiUrl}/elementos`; // URL del endpoint

  constructor(private http: HttpClient) { }

  getElementos(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(`${this.apiUrl}/listar`);
  }

  createElemento(elemento: any): Observable<any> {
    console.log( elemento);
    return this.http.post<any>(`${this.apiUrl}/crear`, elemento);
  }
}
