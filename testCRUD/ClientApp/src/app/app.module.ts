import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { environment } from 'src/environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RolesModule } from './roles/roles.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { UsersModule } from './users/users.module';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { RolesStoreModule } from './roles-store/roles-store.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent
  ],
  imports: [
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot({ logger: console, collapsed: false, disabled: environment.production }),
    NgxsRouterPluginModule.forRoot(),
    BrowserAnimationsModule,
    NgxsRouterPluginModule.forRoot(),
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RolesStoreModule,
    RolesModule,
    UsersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
