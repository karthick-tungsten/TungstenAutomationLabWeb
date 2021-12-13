import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSerivceService } from 'src/app/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/common-services/common-methods.service';
import { VariableShareService } from 'src/app/common-services/variable-share.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public currentPageNumber: number = 1;

  /*** 
   * spinners
  */
   public spinner: boolean = true

   /**
    * other variables
    */
   public nameOfTheUser: any
   public roleOfTheUser: any;
   public getAllUserdDetailsResponse: any = 'loading';
   public usersList: any[] = [];

   constructor(
    private vShare: VariableShareService,
    private common: CommonMethodsService,
    private api: ApiSerivceService,
    private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllUserDetails()
    }, 1000);
  }

  public sortKey: String = 'createdOn'
  public reverseSort: boolean = true
  sort(key: String) {
    this.sortKey = key;
    this.reverseSort = !this.reverseSort;
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

  getAllUserDetails() {
    this.api.getAllUserDetails("/api/v1/superAdmin/getAllUsers", this.api.getAuthHeader()).subscribe({
      next: (response) => {
        this.getAllUserdDetailsResponse = response
        this.usersList = this.getAllUserdDetailsResponse.body.usersList;
      },
      error: (err) => {
        this.spinner = false
        this.getAllUserdDetailsResponse = err
      }, complete: () => {
        this.spinner = false
      }
    })
  }
}
