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
    private claveMaestraService: ClaveMaestraService,
    public dialogRef: MatDialogRef<CrearSecretoComponent>
  ) {
    this.secretForm = this.fb.group({
      secretName: ['', [Validators.required, Validators.minLength(5)]],
      secretText: [''],
      claveMaestra: ['', Validators.required]
    });

    this.claveMaestraService.getClavesMaestras().subscribe((data: ClaveMaestra[]) => {
      this.clavesMaestras = data;
    });
  }

  get secretName() {
    return this.secretForm.get('secretName');
  }

  get secretText() {
    return this.secretForm.get('secretText');
  }

  get claveMaestra() {
    return this.secretForm.get('claveMaestra');
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
      setTimeout(() => {
        this.dialogRef.close(this.secretForm.value.secretName);
        this.isLoading = false;
      }, 1000);
    }
  }
}
