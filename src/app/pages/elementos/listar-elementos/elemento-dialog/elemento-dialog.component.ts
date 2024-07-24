import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CrearSecretoComponent } from '../../crear-secreto/crear-secreto.component';

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
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './elemento-dialog.component.html',
  styleUrl: './elemento-dialog.component.scss'
})
export class ElementoDialogComponent {
  selectedOption: string | null = null;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<ElementoDialogComponent>, public dialog: MatDialog) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getSelectedValues(): void {
    this.dialogRef.close(this.selectedOption);
  }

  onCancelClick(): void {
    this.isLoading = false;
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedOption === 'secreto') {
      this.isLoading = true;
      this.dialogRef.close();
      const dialogRef = this.dialog.open(CrearSecretoComponent);

      dialogRef.afterClosed().subscribe(result => {
        this.isLoading = false;
        console.log('The secret name is:', result);
        // Handle the result as needed
      });
    } else {
      this.isLoading = false;
      // Handle the case where the option is not "secreto"
      console.log('Selected option is not secreto.');
    }
  }

}
