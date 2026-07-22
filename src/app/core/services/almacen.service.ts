import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AlmacenInterface } from '../interfaces/AlmacenInterface';

@Service()
export class AlmacenService {

     urlBase = environment.servidor1;
    
        http = inject(HttpClient);

        listar(sucursalId: number=1){
            return this.http.get<AlmacenInterface[]>(`${this.urlBase}/almacen?sucursalId=${sucursalId}`)
        }
    
        guardar(datos: AlmacenInterface){
            return this.http.post(`${this.urlBase}/almacen`, datos);
        }
    
        mostrar(id: number){
            return this.http.get<AlmacenInterface>(`${this.urlBase}/almacen/${id}`)
        }
    
        modificar(id: number, datos: AlmacenInterface){
            return this.http.patch(`${this.urlBase}/almacen/${id}`, datos);
        }
    
        eliminar(id: number){
            return this.http.delete(`${this.urlBase}/almacen/${id}`);
        }
}
