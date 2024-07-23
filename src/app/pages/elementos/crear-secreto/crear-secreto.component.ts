import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

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
    MatDialogContent
  ]
})
export class CrearSecretoComponent {
  secretName: string | null = null;

  constructor(public dialogRef: MatDialogRef<CrearSecretoComponent>) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.secretName);
  }
}
