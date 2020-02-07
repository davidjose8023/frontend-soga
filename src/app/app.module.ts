import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

// modulos

import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from './service/service.module';

// service


// componentes
import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { MyErrorHandler } from './myerrorhandler.component';
import { ErrorHandler } from '@angular/core';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    
    PagesComponent
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    //CommonModule,
    //PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
    
  ],
  //providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
