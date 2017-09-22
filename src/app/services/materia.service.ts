import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ConfigService } from '../shared/settings/config.service';
import { JwtService } from '../services/jwt.service';
import { IMateria } from '../shared/settings/interfaces';

@Injectable()
export class MateriaService {
    _baseUrl: string = '';


    constructor(private http: Http,
                private configService: ConfigService,
                private jwt: JwtService
            ) {
        this._baseUrl = configService.getApiURI();
    }

    //Traer todos el listado de materias
    getMateriasTodos(): Observable<IMateria[]> {
        return this.http.get(this._baseUrl + 'matters', this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    //crear Materia
    crearPais(materia: IMateria): Observable<IMateria> {

        let body = JSON.stringify(materia);        

        return this.http.post(this._baseUrl + 'matters', body.toString(), this.jwt.jwt())
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }
    
    //Modificar Materia
    modificarMateria(materia: IMateria): Observable<void> {

        return this.http.put(this._baseUrl + 'mattes/editar', JSON.stringify(materia), this.jwt.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }

    //Eliminar Materia
    eliminarMateria(idmateria: number): Observable<void> {
        return this.http.delete(this._baseUrl + 'matters/' + idmateria+ '/eliminar', this.jwt.jwt())
            .map((res: Response) => {
                return;
            })
            .catch(this.handleError);
    }
    
    //si ocurre algun error
    private handleError(error: any) {
        var applicationError = error.headers.get('Application-Error');
        var serverError = error.json();
        var modelStateErrors: string = '';

        if (!serverError.type) {
            console.log('Se detectó un Error' + serverError);

            for (var key in serverError) {
                if (serverError[key])
                    modelStateErrors += serverError[key] + '\n';
            }
        }

        modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;

        return Observable.throw(applicationError || modelStateErrors || 'Server error');
    }

}