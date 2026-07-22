import { Component, inject, signal } from '@angular/core';
import { SucursalService } from '../../../core/services/sucursal.service';
import { MatDialog } from '@angular/material/dialog';
import { SucursalInterface } from '../../../core/interfaces/SucursalInterface';
import { SucursalDialog } from './sucursal-dialog/sucursal-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sucursal',
  imports: [MatTableModule, MatIcon, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './sucursal.html',
  styleUrl: './sucursal.scss',
})
export class Sucursal {
  
  displayedColumns: string[] = ['id', 'nombre', 'direccion', 'telefono', 'ciudad', 'accion'];

  // inyeccion de dependencias
  sucursalService = inject(SucursalService);
  readonly dialog = inject(MatDialog);
  
  // atributos con signal
  sucursales = signal<SucursalInterface[]>([]);
  sucursal = signal({nombre: "", direccion: "", telefono: "", ciudad: ""});
  
  // lo primero en ejecutar cuando el componente categoria carga
  ngOnInit(): void { 
    this.listarSucursales()
  }
  
  // métodos
  listarSucursales(){
    this.sucursalService.listar().subscribe({
      next: (res: SucursalInterface[]) => {
        this.sucursales.set(res);
      },
      error: (error: any) => {
        console.log(error);
        alert("Error al obtener las sucursales");
      }
    });
  }

  abrirDialog(){
    const dialogRef = this.dialog.open(SucursalDialog, {
      data: this.sucursal()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sucursalService.guardar(result).subscribe({
          next: (res) => {
            this.sucursal.set({nombre: "", direccion: "", telefono: "", ciudad: ""})
            this.listarSucursales();
          },
          error: (error) => {
            alert("Ocurrió un Error al guardar la categoria")
          }
        })
      }
    });
  }

  abrirDialogEditar(cat: SucursalInterface){
    const dialogRef = this.dialog.open(SucursalDialog, {
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.sucursalService.modificar(result.id, result).subscribe({
          next: (res) => {
            this.sucursal.set({nombre: "", direccion: "", telefono: "", ciudad: ""})
            this.listarSucursales();
          },
          error: (error) => {
            alert("Ocurrió un Error al guardar la categoria")
          }
        })
      }
    });
  }

}
