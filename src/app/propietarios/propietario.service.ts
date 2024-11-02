import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propietario } from './models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private apiUrl: string = 'http://localhost:8080/api/propietarios/'
  constructor(private http : HttpClient) { }

  obtenerPropietarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.apiUrl);
  }

  agregarPropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(this.apiUrl, propietario);
  }

  actualizarPropietario(id: number, propietario: Propietario): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.apiUrl}/${id}`, propietario);
  }

  eliminarPropietario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
