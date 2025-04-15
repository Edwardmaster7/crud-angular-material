import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

import { Client } from './client';
import { ClientService } from '../client.service';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    MatButtonModule,
    NgxMaskDirective,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  client: Client = Client.newClient();
  isUpdating: boolean = false;
  estados: Estado[] = [];
  cidades: Municipio[] = [];
  selectedUF: string = '';
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private clientService: ClientService,
    private brasilApiService: BrasilapiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.client = this.clientService.search(id)[0];
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        // Call the service method and assign the result to clientFound
        const clientFound = this.clientService.getClientByID(id);

        // Check if a client was actually found
        if (clientFound) {
          this.isUpdating = true;
          this.client = clientFound; // Assign the found client to the component's client property
          if (this.client.state) {
            const event = { value: this.client.state }
            this.loadCities(event as MatSelectChange);
          }
        }
      }
      this.loadUFs()
      
    });
  }

  showMsg(msg: string) {
    this.snackBar.open(msg, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  loadUFs() {
    //observable -> um objeto q fica sob observação, e quando sofre uma atualização,
    // os subscribers são notificados
    this.brasilApiService.listarUFs().subscribe({
      next: ufs => this.estados = ufs,
      error: error => console.log(error),
    });
  }

  loadCities(event: MatSelectChange) {
    //observable -> um objeto q fica sob observação, e quando sofre uma atualização,
    // os subscribers são notificados

    this.selectedUF = event.value
    this.brasilApiService.listarMunicipios(this.selectedUF).subscribe({
      next: ufs => this.cidades = ufs,
      error: error => console.log(error),
    });
  }

  salvar() {
    if (!this.isUpdating) {
      this.clientService.save(this.client);
      this.showMsg('Cliente cadastrado com sucesso!');
      this.client = Client.newClient();
    } else {
      this.clientService.update(this.client);
      this.showMsg('Cliente atualizado com sucesso!');
      this.router.navigate(['/consulta']);
    }
  }

  limpar() {
    // reload the page
    window.location.reload();
  }
}
