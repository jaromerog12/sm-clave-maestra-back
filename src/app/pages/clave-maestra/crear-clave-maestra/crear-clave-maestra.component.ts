import { Component, EventEmitter, inject, model, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClaveMaestra } from '../listar-claves-maestras/clave-maestra.component';
import { ClaveMaestraService } from '../../clave-maestra.service';
import { HttpClientModule } from '@angular/common/http';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    FormsModule,
    MatButtonModule, 
    MatInputModule, 
    MatDialogActions, 
    MatDialogContent, 
    MatDialogClose, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressSpinnerModule, 
    HttpClientModule
  ],
  templateUrl: './crear-clave-maestra.component.html',
  styleUrl: './crear-clave-maestra.component.scss',
  providers: [ClaveMaestraService]
})

export class CrearClaveMaestraComponent {
  readonly dialogRef = inject(MatDialogRef<CrearClaveMaestraComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);
  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map(v => v || 'auto')),
    {initialValue: 'auto'},
  );
  options: FormGroup;
  isLoading = false;
  claveMaestra: Object = {};

  private claveMaestraService = inject(ClaveMaestraService);

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.options = this.fb.group({
      id: [''],
      nombreClave: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.options.valid) {
      const nuevaClave: ClaveMaestra = this.options.value;
      this.claveMaestraService.addClaveMaestra(nuevaClave).subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
          this.openSnackBar(
            'Clave maestra creada exitosamente',
            3000,
            ['custom-snackbar', 'success-snackbar']
          )
          console.log('Clave Maestra añadida:', resp);
          
        },
        error: (error)=> {
          this.openSnackBar(
            'Error al crear clave maestra',
            5000,
            ['custom-snackbar', 'error-snackbar']
          )
          console.error('Error al añadir clave maestra:', error);
        }
      });
    }
  }

  onCancelClick(): void {
    this.isLoading = false;
    this.dialogRef.close();
  }

  openSnackBar(message: string, duration: number, classStyles: Array<string>): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: duration,
      panelClass: classStyles
    });
  }

  get nombreClave() {
    const control = this.options.get('nombreClave');
    console.log('nombreClave control:', control);
    console.log(control);
    return control;
  }
}
