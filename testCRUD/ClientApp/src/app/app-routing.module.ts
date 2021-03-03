import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesResolver } from './roles-store/resolvers/roles.resolver';

const routes: Routes = [
    { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: '', resolve: {roles: RolesResolver}, loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }