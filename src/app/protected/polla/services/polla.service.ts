import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PollaService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * ==========================================
   * ========== PROCEDIMIENTOS ================
   * ==========================================
   */

  getAllTournaments(): Observable<any[]> {
    const url = `${this.baseUrl}/api/polla/tournament`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any[]>(url, { headers })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error fetching tournaments:', error);
          return throwError('Error fetching tournaments');
        })
      );
  }

  getMatchesXTorunament(codTorneo: number, codParticipante : number): Observable<any[]> {

    const url = `${this.baseUrl}/api/polla/matches`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      "codTorneo": codTorneo,
      "codParticipante": codParticipante
    };

    return this.http.post<any[]>(url, data, { headers })
      .pipe(
        map(response => {
          console.log('Response from server:', response);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching matches:', error);
          return throwError('Error fetching matches');
        })
      );
  }


  submitBet(codParticipante: number, codPartido: number, apuesta: number): Observable<any> {
    const url = `${this.baseUrl}/api/polla/bet`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      codParticipante,
      codPartido,
      apuesta,
    };

    return this.http.post<any>(url, data, { headers })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error submitting bet:', error);
          return throwError('Error submitting bet');
        })
      );
  }



}
