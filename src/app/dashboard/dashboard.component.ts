import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSerivceService } from '../common-services/api-serivce.service';
import { CommonMethodsService } from '../common-services/common-methods.service';
import { VariableShareService } from '../common-services/variable-share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  /*** 
   * spinners
  */
  public userGrowingSpinner: boolean = true

  /**
   * other variables
   */
  public nameOfTheUser: any
  public roleOfTheUser: any;
  public usersList: any[] = [];

  constructor(
    private common: CommonMethodsService,
    private api: ApiSerivceService,
    private router: Router) { }

  ngOnInit(): void {
    this.common.validateToken()
    this.userDetailsSessionManagement()
    this.loadDashboardTiles()
  }

  userDetailsSessionManagement() {
    if (this.common.getFromSession("userDetails") == null) {
      this.api.getApiRequest("/api/v1/getUserDetails", this.api.getAuthHeader()).subscribe(
        {
          next: (response) => {
            this.common.storeToSession("userDetails", JSON.stringify(response.body));
            this.updateValues()
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    } else {
      this.updateValues()
    }
  }

  updateValues() {
    let json = JSON.parse(this.common.getFromSession("userDetails"))
    this.nameOfTheUser = json.fullName;
    this.roleOfTheUser = json.role
  }

  logout() {
    this.common.removeLocal("auth")
    sessionStorage.clear()
    this.router.navigate(["/"])
  }

  showSection(section: any) {
    if (location.pathname == '/dashboard/' + section) {
      this.router.navigate(['dashboard'])
    } else {      
      this.router.navigate(['/dashboard/' + section])
    }
  }

  loadDashboardTiles(): any[] {
    return [
      {
        tileName: "Users",
        icon: "fa-user-circle",
        id: "users-card",
        routerLink: "users"
      }, {
        tileName: "Projects",
        icon: "fa-file",
        id: "projects-card",
        routerLink: "projects"
      }
    ]
  }
}
