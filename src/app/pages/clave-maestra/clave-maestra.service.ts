import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ClaveMaestra } from './listar-claves-maestras/clave-maestra.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaveMaestraService {
  private apiUrl = `${environment.apiUrl}/clave_maestra`; // URL del endpoint

  constructor(private http: HttpClient) { }

  // Método para obtener los datos desde el endpoint
  getClavesMaestras(): Observable<ClaveMaestra[]> {
    return this.http.get<{ data: ClaveMaestra[] }>(`${this.apiUrl}/listar`)
      .pipe(
        map(response => response.data)
      );
  }

  addClaveMaestra(nuevaClave: ClaveMaestra): Observable<ClaveMaestra> {
    return this.http.post<{ data: ClaveMaestra }>(`${this.apiUrl}/crear`, nuevaClave)
      .pipe(
        map(response => response.data)
      );
  }
}
