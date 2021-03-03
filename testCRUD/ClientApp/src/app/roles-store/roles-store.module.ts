import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoleApiService } from './services/role-api.services';
import { RolesResolver } from './resolvers/roles.resolver';
import { NgxsModule } from '@ngxs/store';
import { RolesState } from './store/roles.state';

@NgModule({
  imports: [
    HttpClientModule,
    NgxsModule.forFeature([
      RolesState
    ])
  ],
  providers: [RoleApiService, RolesResolver],
})
export class RolesStoreModule { }
