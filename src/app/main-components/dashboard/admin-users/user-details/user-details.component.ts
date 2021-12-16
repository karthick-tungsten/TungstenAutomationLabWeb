import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/common-components/popup-toast/toast/toast.service';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { JqueryService } from 'src/app/support/jquery/jquery.service';
declare var $: any;
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
  public getAllUserdDetailsResponse: any;
  public usersList: any[] = [];
  public createUserFieldList: any[] = this.createUserFields()
  public disableSubmitBtn: boolean = false;
  private deleteUserId:any;

  constructor(
    private api: ApiSerivceService,
    private jquery: JqueryService,
    private toast: ToastService) { }

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

  createUserFields(): any[] {
    return [
      { id: "fullName", labelName: "Full Name", errorMsg: "full name can't be empty", type: "text" },
      { id: "email", labelName: "Email", errorMsg: "email name can't be empty", type: "email" },
      { id: "password", labelName: "Password", errorMsg: "Password name can't be empty", type: "password" },
      { id: "confirmPassword", labelName: "Confirm Password", errorMsg: "Confirm Password name can't be empty", type: "password" }
    ]
  }

  createUser(data: any) {
    this.jquery.getId("createUserSubmitBtn").disable()
    delete data['confirmPassword']
    this.api.postApiRequestWithHeader("/api/v1/createUser", data, this.api.getAuthHeader()).subscribe(
      {
        next: (response) => {
          if (response.status == 200) {
            this.jquery.getId("createUser").modalToggle()
            this.getAllUserDetails();
            this.spinner = true
            this.toast
              .setTitle("Success")
              .setMessage("User Created successfully!")
              .setType("success")
              .build()
              .show();
          }
        }, error: (err) => {
          this.jquery.getId("createUserSubmitBtn").enable()
          let message=err.error.message;
          this.toast
              .setTitle("Error")
              .setMessage(message)
              .setType("failure")
              .build()
              .show();
        }
      }
    );
  }

  deleteUser(){
    // this.api.deleteApi("api/v1/delete/"+this.deleteUserId,this.api.getAuthHeader())
  }
}
