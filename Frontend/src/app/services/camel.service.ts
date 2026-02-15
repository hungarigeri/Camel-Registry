import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camel } from '../model/camel.model';
import { environment } from '../../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CamelService {
  private apiUrl = `${environment.apiUrl}/camels`; 

  constructor(private http: HttpClient) { }

  // GET /api/camels 
  getCamels(): Observable<Camel[]> {
    return this.http.get<Camel[]>(this.apiUrl);
  }

  // POST /api/camels
  createCamel(camel: Camel): Observable<Camel> {
    return this.http.post<Camel>(this.apiUrl, camel);
  }

  // PUT /api/camels/{id} 
  updateCamel(id: number, camel: Camel): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, camel);
  }
}