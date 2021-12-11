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

  public nameOfTheUser: any
  public roleOfTheUser: any;
  public getAllUserdDetailsResponse: any = 'loading';
  public usersList: any[] = [];
  public currentPageNumber:number=1;

  constructor(
    private vShare: VariableShareService,
    private common: CommonMethodsService,
    private api: ApiSerivceService,
    private router: Router) { }

  ngOnInit(): void {

    this.common.validateToken()
    this.userDetailsSessionManagement()
    setTimeout(() => {
      this.getAllUserDetails()
    }, 1000);

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

  getAllUserDetails() {
    this.api.getAllUserDetails("/api/v1/superAdmin/getAllUsers", this.api.getAuthHeader()).subscribe({
      next: (response) => {
        this.getAllUserdDetailsResponse = response
        this.usersList = this.getAllUserdDetailsResponse.body.usersList;
      },
      error: (err) => {
        this.getAllUserdDetailsResponse = err
      }
    })
  }

  editUserPopup(userId: any) {
    console.log(userId);

  }

  deleteUserPopup(userId: any) {
    console.log(userId);
  }

  anyValueSearch(eventTarget: any) {
    let searchValue: String = eventTarget.value;
    let search: any[] = this.getAllUserdDetailsResponse.body.usersList;
    if (!this.usersList || !searchValue) {
      this.usersList = this.getAllUserdDetailsResponse.body.usersList;
      return;
    }
    this.usersList = search.filter(value => {
      return value.fullName.toLowerCase().match(searchValue.toLowerCase()) ||
        value.email.toLowerCase().match(searchValue.toLowerCase()) ||
        value.role.toLowerCase().match(searchValue.toLowerCase()) ||
        value.createdOn.toLowerCase().match(searchValue.toLowerCase());
    })
  }

  public sortKey: String = 'createdOn'
  public reverseSort: boolean = true
  sort(key: String) {
    this.sortKey = key;
    this.reverseSort = !this.reverseSort;
  }

}
