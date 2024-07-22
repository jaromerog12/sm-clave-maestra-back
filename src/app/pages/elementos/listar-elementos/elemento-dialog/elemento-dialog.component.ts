import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-elemento-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './elemento-dialog.component.html',
  styleUrl: './elemento-dialog.component.scss'
})
export class ElementoDialogComponent {
  selectedOption: string | null = null;

  constructor(public dialogRef: MatDialogRef<ElementoDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSelectedValues(): void {
    this.dialogRef.close(this.selectedOption);
  }

}
