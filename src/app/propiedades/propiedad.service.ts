import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propiedad } from './models/propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private apiUrl: string = 'http://localhost:8080/api/propiedades/';

  constructor(private http: HttpClient) {}

  obtenerPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  agregarPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    return this.http.post<Propiedad>(this.apiUrl, propiedad);
  }

  actualizarPropiedad(id: number, propiedad: Propiedad): Observable<Propiedad> {
    return this.http.put<Propiedad>(`${this.apiUrl}/${id}`, propiedad);
  }

  eliminarPropiedad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
