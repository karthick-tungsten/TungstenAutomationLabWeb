import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/support/common-services/common-methods.service';
import { VariableShareService } from 'src/app/support/common-services/variable-share.service';
declare var $:any;
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
  public createUserFieldList:any[]=this.createUserFields()
  public disableSubmitBtn:boolean=false;

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
    this.disableSubmitBtn=true
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

  createUserFields():any[]{
    return [
      {id:"fullName",labelName:"Full Name",errorMsg:"full name can't be empty",type:"text"},
      {id:"email",labelName:"Email",errorMsg:"email name can't be empty",type:"email"},
      {id:"password",labelName:"Password",errorMsg:"Password name can't be empty",type:"password"},
      {id:"confirmPassword",labelName:"Confirm Password",errorMsg:"Confirm Password name can't be empty",type:"password"}
    ]
  }

  createUser(data: any) {
      $("#createUserSubmitBtn").attr("disabled","true");
      delete data['confirmPassword']
      this.api.postApiRequestWithHeader("/api/v1/createUser",data,this.api.getAuthHeader()).subscribe(
        {
          next:(response)=>{
            if(response.status==200){
              $("#createUser").modal('toggle')
              this.getAllUserDetails();
              this.spinner = true
            }
          }
        }
      );
  }
}
