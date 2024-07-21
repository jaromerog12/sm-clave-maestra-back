import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ClaveMaestra } from './clave-maestra/listar-claves-maestras/clave-maestra.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaveMaestraService {
  private apiUrl = `${environment.apiUrl}`; // URL del endpoint

  constructor(private http: HttpClient) {}

  // Método para obtener los datos desde el endpoint
  getClavesMaestras(): Observable<ClaveMaestra[]> {
    return this.http.get<{ data: ClaveMaestra[] }>(`${this.apiUrl}/list-master-keys`)
    .pipe(
      map(response => response.data)
    );
  }

  addClaveMaestra(nuevaClave: ClaveMaestra): Observable<ClaveMaestra> {
    return this.http.post<{ data: ClaveMaestra }>(`${this.apiUrl}/create-master-key`, nuevaClave)
    .pipe(
      map(response => response.data)
    );
  }
}
