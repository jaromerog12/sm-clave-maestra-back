import { AfterViewInit, Component, ViewChild, inject, signal, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ElementoDialogComponent } from './elemento-dialog/elemento-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementosService } from '../elementos.service';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listar-elementos',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './listar-elementos.component.html',
  styleUrl: './listar-elementos.component.scss'
})
export class ListarElementosComponent {
  elementos: Array<Elemento> = [];
  dataSource = new MatTableDataSource<Elemento>(this.elementos);
  readonly dialog = inject(MatDialog);
  private elementosService = inject(ElementosService);

  displayedColumns: string[] = ['nombre', 'fecha', 'notas', 'tipo'];

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.elementosService.getElementos().subscribe({
      next: (resp) => {
        console.log(resp);
        this.elementos = resp;
        this.dataSource.data = [...this.elementos];
        console.log(this.elementos);
      },
      error: (error) => {
        this.openSnackBar(
          'Error al cargar los elementos',
          5000,
          ['custom-snackbar', 'error-snackbar']
        )
        console.error('Error al cargar los elementos', error);
      }
    });

    this.dataSource.data = [...this.elementos];

  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ElementoDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.elementos.push(result);
        console.log(this.elementos);
        this.dataSource.data = [...this.elementos];
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openSnackBar(message: string, duration: number, classStyles: Array<string>): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: duration,
      panelClass: classStyles
    });
  }


}

export interface Elemento {
  fecha_creacion: string;
  id: number;
  nombre_elemento: string;
  notas: string;
  tipo: string;
}
