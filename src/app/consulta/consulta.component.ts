import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ClientService } from '../client.service';
import { Client } from '../cadastro/client';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  
  clients: Client[] = []
  displayedColumns: string[] = ['id', 'name', 'cpf', 'birthDate', 'email', 'municipio', 'estado', 'actions']
  searchName: string = ""
  deletingClientId: string | null = null; // Replace isDeleting
  private snackBar: MatSnackBar = new MatSnackBar(null);
  
  
  constructor(private service: ClientService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.clients = this.service.search('')
    console.log(this.clients)
  }

  showMsg(msg: string) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }


  search() {
    this.clients = this.service.search(this.searchName)
  }

  onEdit(id: number) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } })
  }

  onDelete(id: string) {
    if (this.deletingClientId === id) {
      // Confirmation step
      this.service.delete(id);
      this.deletingClientId = null;
      this.showMsg('Cliente deletado com sucesso!');
      this.search(); // Refresh list after delete
    } else {
      // Initial delete click
      this.deletingClientId = id;
    }
  }
  
  cancelDeletion() {
    this.deletingClientId = null;
  }
}
