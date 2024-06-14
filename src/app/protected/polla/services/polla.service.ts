import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

  getAllTournaments(codTorneo : number): Observable<any[]> {


    const data = {
      "codTorneo" : codTorneo
    }

    const url = `${this.baseUrl}/api/polla/tournament`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any[]>(url, data ,{ headers })
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


  expire(codPartido: number): Observable<number> {
    const url = `${this.baseUrl}/api/polla/expire`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = { codPartido };

    return this.http.post<any>(url, data, { headers })
      .pipe(
        tap(response => {
          console.log('Response from expire API:', response);
        }),
        map(response => {
          console.log('Mapping response:', response.vigencia);
          return response.vigencia;
        }),
        catchError(error => {
          console.error('Error expiring match:', error);
          return throwError('Error expiring match');
        })
      );
  }


  getSeeBeets( codTorneo: number ): Observable<any[]> {

    const url = `${this.baseUrl}/api/polla/seebets`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      "codTorneo": codTorneo,

    };

    return this.http.post<any[]>(url, data, { headers })
      .pipe(
        map(response => {
          console.log('Response from server:', response);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching seebeets:', error);
          return throwError('Error fetching seebeets');
        })
      );
  }


  getSeeBeetsMissing( codTorneo: number ): Observable<any[]> {

    const url = `${this.baseUrl}/api/polla/noSeebeets`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const data = {
      "codTorneo": codTorneo,

    };

    return this.http.post<any[]>(url, data, { headers })
      .pipe(
        map(response => {
          console.log('Response from server:', response);
          return response;
        }),
        catchError(error => {
          console.error('Error fetching seebeets:', error);
          return throwError('Error fetching seebeets');
        })
      );
  }


  verifyCurrentPassword(codUsuario: number, currentPassword: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/polla/verifyPassword`;
    const body = { codUsuario, currentPassword };
    return this.http.post<any>(url, body).pipe(
      map(response => response.isValid === 1),
      catchError(error => {
        console.error('Error al verificar la contraseña actual:', error);
        return of(false);
      })
    );
  }


  changePassword(codUsuario: number, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/api/polla/changePassword`;
    const body = { codUsuario, newPassword };
    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        console.error('Error al cambiar la contraseña:', error);
        return of(null);
      })
    );
  }


}
