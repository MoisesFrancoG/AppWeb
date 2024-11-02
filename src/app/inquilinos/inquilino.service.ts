import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquilino } from './models/inquilino';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {

  private apiUrl: string = 'http://localhost:8080/api/inquilinos/'
  constructor(private http :HttpClient ) { }

  obtenerInquilinos(): Observable<Inquilino[]> {
    return this.http.get<Inquilino[]>(this.apiUrl)
  }

  agregarInquilino(inquilino : Inquilino): Observable<Inquilino> {
    return this.http.post<Inquilino>(this.apiUrl,inquilino)
  }

  actualizarInquilino(id: number, inquilino: Inquilino) {
    return this.http.put<Inquilino>(`${this.apiUrl}/${id}`, inquilino)
  }

  eliminarInquilino(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}


