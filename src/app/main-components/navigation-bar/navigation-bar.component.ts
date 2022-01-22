import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/support/common-services/common-methods.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit, AfterContentInit {
  nameOfTheUser: any;
  roleOfTheUser: any;

  constructor(
    private common: CommonMethodsService,
    private router: Router,
    private api: ApiSerivceService
  ) { }

  ngOnInit(): void {
    this.api.validateToken()
    this.userDetailsSessionManagement();
  }

  ngAfterContentInit(): void {
    try {
      let json = JSON.parse(this.common.getFromSession("userDetails"))
      this.nameOfTheUser = json.fullName;
      this.roleOfTheUser = json.role
    } catch (error) {
    }
  }

  userDetailsSessionManagement() {
    if (this.common.getFromSession("userDetails") == null) {
      this.api.getApiRequest("/api/v1/getUserDetails", this.api.getAuthHeader()).subscribe(
        {
          next: (response) => {
            this.common.storeToSession("userDetails", JSON.stringify(response.body));
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
    }
  }

  logout() {
    this.common.removeLocal("auth")
    sessionStorage.clear()
    this.router.navigate(["/user/login"])
  }

}
