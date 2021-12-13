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
import { LoadingGrowComponent } from './common-html-elements/loading-grow/loading-grow.component';
import { OrderByPipeService } from './sortPipes/order-by-pipe.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailsComponent } from './dashboard/admin-users/user-details/user-details.component';
import { CircleSpinnerComponent } from './common-html-elements/circle-spinner/circle-spinner.component';
import { ProjectDetailsComponent } from './dashboard/admin-users/project-details/project-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ToastComponent,
    DashboardComponent,
    LoadingGrowComponent,
    OrderByPipeService,
    UserDetailsComponent,
    CircleSpinnerComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxPaginationModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorServiceService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
