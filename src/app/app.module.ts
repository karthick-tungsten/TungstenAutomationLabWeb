import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ToastComponent } from './popup-toast/toast/toast.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { InterceptorServiceService } from './common-services/interceptor-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ToastComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorServiceService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
