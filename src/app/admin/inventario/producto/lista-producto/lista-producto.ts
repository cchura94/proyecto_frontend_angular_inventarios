import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ProductoService } from '../../../../core/services/producto.service';
import { MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatTable, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-lista-producto',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule],
  templateUrl: './lista-producto.html',
  styleUrl: './lista-producto.scss',
})
export class ListaProducto implements AfterViewInit{
 
  displayedColumns: string[] = ['id', 'nombre', 'precio'];

  productoService = inject(ProductoService);

  lista_productos = signal<any[]>([]);
  total = signal<number>(0);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 

  ngAfterViewInit(): void {
    
    this.funListaProductos()

    this.paginator.page.pipe(
      tap(() => this.funListaProductos())
    ).subscribe()

   
  }

  funListaProductos(){
    this.productoService.listar(this.paginator?.pageIndex + 1, this.paginator?.pageSize).subscribe({
      next: (res: any) => {
          let { data, total } = res;
          this.lista_productos.set(data);
          this.total.set(total);
      }
    })
  }
}
