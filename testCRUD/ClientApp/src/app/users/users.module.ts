import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './pages/users/users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserResolver } from './resolvers/user.resolver';
import { UserApiService } from './services/user-api.services';
import { UsersResolver } from './resolvers/users.resolver';
import { UserComponent } from './pages/user/user.component';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/users.state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RolesResolver } from '../roles-store/resolvers/roles.resolver';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    NgxsModule.forFeature([
      UsersState
    ]),
    RouterModule.forChild([
        { path: '', component: UsersComponent, resolve:{users: UsersResolver}},
        { path: ':id', component: UserComponent, resolve:{user: UserResolver, roles: RolesResolver}},
      ])
  ],
  providers: [UserApiService, UsersResolver, UserResolver],
})
export class UsersModule { }
