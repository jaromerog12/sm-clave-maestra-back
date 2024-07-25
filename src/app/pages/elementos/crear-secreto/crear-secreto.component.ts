import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, FloatLabelType } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { ClaveMaestra } from '../../clave-maestra/listar-claves-maestras/listar-clave-maestra.component';
import { ClaveMaestraService } from '../../clave-maestra/clave-maestra.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ElementosService } from '../elementos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-secreto',
  standalone: true,
  templateUrl: './crear-secreto.component.html',
  styleUrls: ['./crear-secreto.component.css'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogContent,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    TextFieldModule,
    MatSelectModule,
    CommonModule
  ]
})
export class CrearSecretoComponent {
  secretForm: FormGroup;
  isLoading = false;
  clavesMaestras: ClaveMaestra[] = [];

  constructor(
    private fb: FormBuilder,
    private elementosService: ElementosService,
    private claveMaestraService: ClaveMaestraService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CrearSecretoComponent>
  ) {
    this.secretForm = this.fb.group({
      nombre_elemento: ['', [Validators.required, Validators.minLength(5)]],
      secreto: [''],
      clave_id: ['', Validators.required],
      notas: [''],
      tipo: ['SECRETO']
    });

    this.claveMaestraService.getClavesMaestras().subscribe((data: ClaveMaestra[]) => {
      this.clavesMaestras = data;
    });
  }

  get nombre_elemento() {
    return this.secretForm.get('nombre_elemento');
  }

  get secreto() {
    return this.secretForm.get('secreto');
  }

  get notas() {
    return this.secretForm.get('notas');
  }

  get clave_id() {
    return this.secretForm.get('clave_id');
  }

  get tipo() {
    return this.secretForm.get('tipo');
  }

  floatLabel(): FloatLabelType {
    return 'auto';
  }

  onCancelClick(): void {
    this.isLoading = false;
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.secretForm.valid) {
      this.isLoading = true;
      this.elementosService.createElemento(this.secretForm.value).subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
          this.openSnackBar('Secreto creado exitosamente', 3000, ['custom-snackbar', 'success-snackbar']);
          console.log('Elemento secreto añadido:', resp);
          this.isLoading = false;
        },
        error: (error) => {
          this.openSnackBar('Error al crear secreto', 5000, ['custom-snackbar', 'error-snackbar']);
          console.error('Error al añadir elemento secreto:', error);
          this.isLoading = false;
        }
      });
    }
  }

  openSnackBar(message: string, duration: number, classStyles: string[]): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: duration,
      panelClass: classStyles
    });
  }
}
