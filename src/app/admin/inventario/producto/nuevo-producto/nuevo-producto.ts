import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ProductoService } from '../../../../core/services/producto.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { CategoriaService } from '../../../../core/services/categoria.service';
import { CategoriaInterface } from '../../../../core/interfaces/CategoriaInterface';

@Component({
  selector: 'app-nuevo-producto',
  imports: [MatButtonModule, RouterLink, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.scss',
})
export class NuevoProducto {
  
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  categorias = signal<CategoriaInterface[]>([]);
 

  productoForm = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    descripcion: new FormControl(""),
    precio_venta_actual: new FormControl(0, [Validators.required, Validators.min(0)]),
     imagen: new FormControl(''),
    estado: new FormControl(true),
    categoriaId: new FormControl('', Validators.required),
  });

    constructor(private fb: FormBuilder){
    this.fungetCategorias()
  }
  
  
fungetCategorias(){
    this.categoriaService.listar().subscribe({
      next: (res: any) => this.categorias.set(res)
    })
}


  guardarProducto(){

    if(this.productoForm.invalid){
      this.productoForm.markAllAsTouched();
      return;
    }

    const producto = this.productoForm.value;

    this.productoService.guardar(producto).subscribe({
      next: (res) => {
        this.productoForm.reset();
      },
      error: (error) => {
        alert("Error al registrar el Producto");
      }
    })

  }
}
