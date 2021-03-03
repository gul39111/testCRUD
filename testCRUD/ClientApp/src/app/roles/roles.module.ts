import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { RolesComponent } from './pages/roles/roles.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './pages/role/role.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { RoleResolver } from './resolvers/role.resolver';

const routes = [
  { path: '', component: RolesComponent},
  { path: ':id', component: RoleComponent, resolve:{role: RoleResolver}},
];

@NgModule({
  declarations: [
    RolesComponent,
    RoleComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    RouterModule.forChild(routes)
  ],
  providers: [RoleResolver],
})
export class RolesModule { }
