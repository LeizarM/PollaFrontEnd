import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

import { Login } from '../interface/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private baseUrl: string = environment.baseUrl;
  private _usuario!: Login;



  constructor(private http: HttpClient) { }



   /**
    * ==========================================
    * ========== PROCEDIMIENTOS ================
    * ==========================================
    */

  /**
   * Para verificar las credenciales del usuario
   * @param usuario
   * @param password
   * @returns
   */
  verificarLogin(usuario: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/api/polla/login`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = {
      "user": usuario,
      "password": password
    };

    return this.http.post<any>(url, data, { headers })
      .pipe(
        tap(resp => {
          if (resp && resp.user) {
            this.guardarUsuario(resp.user);
          }
        }),
        map(resp => resp),
        catchError(err => {
          console.error('Error en verificarLogin:', err);
          return of(err.error.error || 'Error en el servidor');
        })
      );
  }

  /**
   * Procedimiento para cambiar la contraseña del usuario
   * @param login
   * @returns
   */
  changePassword ( login : Login): Observable<Login> {
    console.log(login);
    const url = `${this.baseUrl}/auth/changePassword`;

    return this.http.post<Login>(url, login)
      .pipe(
        tap(resp => {

          if (!resp) {
            console.log(resp);
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      );


  }





  /**
   * guardara los datos del usuario en el localstorage
   * @param usuario
   */
  guardarUsuario( usuario: Login ): void {


    localStorage.setItem('b-user', JSON.stringify( usuario ) );
  }

  /**
   * Devolvera datos del usuario
   * */
   get obtenerUsuario(): Login {

    if (this._usuario != null || this._usuario != undefined) {
      return this._usuario;
    } else if ( (this._usuario == null || this._usuario == undefined) && localStorage.getItem('b-user') != null) {

      return this._usuario =  JSON.parse( localStorage.getItem('b-user')!) as Login;
    }
    return {};
  }



  /**
   * Para cerrar sesion y borrar datos
   */
  logout():void {

    this._usuario = {};
    localStorage.clear();
  }



}
