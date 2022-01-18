import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './main-components/dashboard/admin-users/project-details/project-details.component';
import { UserDetailsComponent } from './main-components/dashboard/admin-users/user-details/user-details.component';
import { DashboardComponent } from './main-components/dashboard/dashboard.component';
import { LoginPageComponent } from './main-components/login-page/login-page.component';
import { MainPageComponent } from './main-components/main-page/main-page.component';
import { ReportMainPageComponent } from './main-components/report/report-main-page/report-main-page.component';
import { TestRunsComponent } from './main-components/report/test-runs/test-runs.component';

const routes: Routes = [
  { path: "user/login", component: LoginPageComponent },
  {
    path: "", component: MainPageComponent,
    children: [
      {
        path: "", component: DashboardComponent,
        children: [
          { path: "users", component: UserDetailsComponent },
          { path: "projects", component: ProjectDetailsComponent }
        ]
      },
      {
        path: "reports", component: ReportMainPageComponent,
        children: [
          { path: "", component: TestRunsComponent }
        ]
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
