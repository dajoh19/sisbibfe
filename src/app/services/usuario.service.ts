import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
// import { JwtService } from '../services/jwt.service';
import { IUsuario } from '../shared/settings/interfaces';

@Injectable()
export class UsuarioService {
    _baseUrl = '';


    constructor(
        private http: Http,
        private configService: ConfigService/*,
        private jwt: JwtService*/
    ) {
        this._baseUrl = configService.getApiURI();
    }

    // Traer todos el listado de usuarios
    public getUsuariosTodos(): Observable<IUsuario[]> {
        return this.http.get(this._baseUrl + 'usuarios')
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    // crear Usuario
    public crearUsuario(usuario: any): Observable<IUsuario> {

        return this.http.post(this._baseUrl + 'auth_register', usuario/*, this.jwt.jwt()*/ )
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    // Modificar Usuario
    public modificarUsuario(anexo: IUsuario): Observable<void> {

        return this.http.put(this._baseUrl + 'usuarios', JSON.stringify(anexo) /*, this.jwt.jwt()*/)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    // Eliminar Usuario
    public eliminarUsuario(id: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'usuarios/' + id)
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    // si ocurre algun error
    private handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');
        const serverError = error.json();
        var modelStateErrors = '';

        if (!serverError.type) {
            console.log('Se detectó un Error' + serverError);

            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }
}
