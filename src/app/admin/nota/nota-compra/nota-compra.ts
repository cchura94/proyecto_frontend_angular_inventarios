import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { ListaProducto } from "../../inventario/producto/lista-producto/lista-producto";
import { environment } from '../../../../environments/environment.development';
import { ProductoService } from '../../../core/services/producto.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nota-compra',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ListaProducto, MatTableModule, MatPaginatorModule, FormsModule],
  templateUrl: './nota-compra.html',
  styleUrl: './nota-compra.scss',
})
export class NotaCompra {

    displayedColumns: string[] = ['id', 'nombre', 'precio', 'almacenes', 'imagen', 'acciones'];

  urlBase: string = environment.servidor1;

  productoService = inject(ProductoService);

  lista_productos = signal<any[]>([]);

    lista_carrito = signal<any[]>([]);


  total = signal<number>(0);

  buscar = signal<string>("")

  @ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit(): void {
    
    this.funListaProductos()

    this.paginator.page.pipe(
      tap(() => this.funListaProductos())
    ).subscribe()

   
  }
 funListaProductos(){
    this.productoService.listar(this.paginator?.pageIndex + 1, this.paginator?.pageSize, this.buscar()).subscribe({
      next: (res: any) => {
          let { data, total } = res;
          this.lista_productos.set(data);
          this.total.set(total);
      }
    })
  }

  funAddCarrito(prod: any){

    const objProducto = {id_producto:prod.id, nombre: prod.nombre, cantidad: 1, precio: prod.precio_venta_actual};

    this.lista_carrito.set([...this.lista_carrito(), objProducto]);
    console.log(this.lista_carrito());
  }


}
