import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './dashboard/admin-users/project-details/project-details.component';
import { UserDetailsComponent } from './dashboard/admin-users/user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "dashboard", component: DashboardComponent,
    children: [{ path: "users", component: UserDetailsComponent }, { path: "projects", component: ProjectDetailsComponent }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
