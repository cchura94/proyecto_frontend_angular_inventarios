import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { MatAnchor } from "@angular/material/button";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { FormsModule } from '@angular/forms';
import { AlmacenInterface } from '../../../../core/interfaces/AlmacenInterface';
import { SucursalInterface } from '../../../../core/interfaces/SucursalInterface';
import { AlmacenService } from '../../../../core/services/almacen.service';
import { SucursalService } from '../../../../core/services/sucursal.service';

@Component({
  selector: 'app-lista-producto',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatAnchor, MatSelectModule, FormsModule],
  templateUrl: './lista-producto.html',
  styleUrl: './lista-producto.scss',
})
export class ListaProducto implements AfterViewInit{
 
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'almacenes', 'imagen', 'acciones'];
  urlBase: string = environment.servidor1;

  productoService = inject(ProductoService);
  almacenService = inject(AlmacenService);
  sucursalService = inject(SucursalService);
  archivoSeleccionado: any;

  sucursal_id = signal<number>(-1);
  almacen_id = signal<number>(-1);

  lista_productos = signal<any[]>([]);
  total = signal<number>(0);
  buscar = signal<string>("")

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){
    this.sucursalService.listar().subscribe({
      next: (res: SucursalInterface[]) => {
        this.sucursales.set(res);
      },
      error: (err) => console.error(err)
    });
  }

 
    almacenes = signal<AlmacenInterface[]>([]);

  sucursales = signal<SucursalInterface[]>([]);

 

  ngAfterViewInit(): void {
    
    this.funListaProductos()

    this.paginator.page.pipe(
      tap(() => this.funListaProductos())
    ).subscribe()

   
  }

  funListaProductos(){
    this.productoService.listar(this.paginator?.pageIndex + 1, this.paginator?.pageSize, this.buscar(), this.almacen_id()).subscribe({
      next: (res: any) => {
          let { data, total } = res;
          this.lista_productos.set(data);
          this.total.set(total);
      }
    })
  }

  funListarAlmacenes(): void {
    this.almacenService.listar(this.sucursal_id()).subscribe({
      next: (res: AlmacenInterface[]) => {
        this.almacenes.set(res);
      },
      error: (error) => console.error(error)
    });
  }
  

  onFileSelected(event: Event, element: any){
    const input = event.target as HTMLInputElement;

    if(!input.files?.length){
      return;
    }
    this.archivoSeleccionado = input.files[0];

    this.subirImagen(element)
  }

  subirImagen(element: any){
    if(!this.archivoSeleccionado){
      console.log("No hay imagen seleccionada");
      return;
    }
    const formData = new FormData();
    formData.append('imagen', this.archivoSeleccionado);

    console.log(element);
    this.productoService.actualizarImagen(element.id, formData).subscribe({
      next: (res) => {
        console.log("Imagen actualizada");
        this.funListaProductos();
      }
    })
  }
}
