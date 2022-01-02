import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './main-components/home-page/home-page.component';
import { ToastComponent } from './common-components/popup-toast/toast/toast.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { InterceptorServiceService } from './support/common-services/interceptor-service.service';
import { LoadingGrowComponent } from './common-components/loading-grow/loading-grow.component';
import { OrderByPipeService } from './support/sortPipes/order-by-pipe.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailsComponent } from './main-components/dashboard/admin-users/user-details/user-details.component';
import { CircleSpinnerComponent } from './common-components/circle-spinner/circle-spinner.component';
import { ProjectDetailsComponent } from './main-components/dashboard/admin-users/project-details/project-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    ProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorServiceService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
