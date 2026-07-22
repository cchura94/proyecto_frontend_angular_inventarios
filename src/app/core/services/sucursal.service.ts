import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SucursalInterface } from '../interfaces/SucursalInterface';

@Service()
export class SucursalService {
    urlBase = environment.servidor1;

    http = inject(HttpClient);
    listar(){
        return this.http.get<SucursalInterface[]>(`${this.urlBase}/sucursal`)
    }

    guardar(datos: SucursalInterface){
        return this.http.post(`${this.urlBase}/sucursal`, datos);
    }

    mostrar(id: number){
        return this.http.get<SucursalInterface>(`${this.urlBase}/sucursal/${id}`)
    }

    modificar(id: number, datos: SucursalInterface){
        return this.http.patch(`${this.urlBase}/sucursal/${id}`, datos);
    }

    eliminar(id: number){
        return this.http.delete(`${this.urlBase}/sucursal/${id}`);
    }
}
