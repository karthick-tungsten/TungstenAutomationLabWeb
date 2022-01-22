import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './main-components/login-page/login-page.component';
import { InterceptorServiceService } from './support/common-services/interceptor-service.service';
import { MainPageComponent } from './main-components/main-page/main-page.component';
import { NavigationBarComponent } from './main-components/navigation-bar/navigation-bar.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { CircleSpinnerComponent } from './common-components/circle-spinner/circle-spinner.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastComponent } from './common-components/popup-toast/toast/toast.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { LoadingGrowComponent } from './common-components/loading-grow/loading-grow.component';
import { OrderByPipeService } from './support/sortPipes/order-by-pipe.service';
import { UserDetailsComponent } from './main-components/dashboard/admin-users/user-details/user-details.component';
import { ProjectDetailsComponent } from './main-components/dashboard/admin-users/project-details/project-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportMainPageComponent } from './main-components/report/report-main-page/report-main-page.component';
import { TestRunsComponent } from './main-components/report/test-runs/test-runs.component';
import { TimeAgoPipeService } from './support/sortPipes/time-ago-pipe.service';
import{NgChartsModule} from 'ng2-charts'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    NavigationBarComponent,
    DashboardComponent,
    CircleSpinnerComponent,
    ToastComponent,
    LoadingGrowComponent,
    OrderByPipeService,
    UserDetailsComponent,
    ProjectDetailsComponent,
    ReportMainPageComponent,
    TestRunsComponent,
    TimeAgoPipeService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceService, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]

})
export class AppModule { }
