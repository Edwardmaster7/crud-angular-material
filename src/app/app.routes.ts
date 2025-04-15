import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaComponent } from './consulta/consulta.component';

export const routes: Routes = [
    {path: '', component: CadastroComponent},
    {path: 'consulta', component: ConsultaComponent}
];
