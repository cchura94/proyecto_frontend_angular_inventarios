import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SucursalInterface } from '../../../../core/interfaces/SucursalInterface';

@Component({
  selector: 'app-sucursal-dialog',
  imports: [
     MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule
  ],
  templateUrl: './sucursal-dialog.html',
  styleUrl: './sucursal-dialog.scss',
})
export class SucursalDialog {

   readonly dialogRef = inject(MatDialogRef<SucursalDialog>);

    readonly data = inject<SucursalInterface>(MAT_DIALOG_DATA);
    readonly dataSucursal = model(this.data);

    onNoClick(): void {
        this.dialogRef.close();
    }
}
