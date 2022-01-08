import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/common-components/popup-toast/toast/toast.service';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/support/common-services/common-methods.service';
import { VariableShareService } from 'src/app/support/common-services/variable-share.service';
import { JqueryService } from 'src/app/support/jquery/jquery.service';
import { ToastType } from 'src/app/support/project-enums/projectEnums';
declare var $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public rememberFlag: boolean = false;
  public email: any;
  public showSuperadmin: boolean = false;
  constructor(
    private apiSerivce: ApiSerivceService,
    private common: CommonMethodsService,
    private vShare: VariableShareService,
    private router: Router,
    private toast: ToastService,
    private jquery: JqueryService) { }

  ngOnInit(): void {
    this.alreadyLoggedInAction();
    this.rememberInit();
  }

  rememberInit() {
    let val = this.common.getFromLocal("remember-item")
    if (val != null) {
      this.rememberFlag = true
      this.email = val
    } else {
      this.verifySuperAdmin()
    }
  }

  alreadyLoggedInAction() {
    if (this.common.getFromLocal("auth") != null) {
      this.router.navigate(["/dashboard"])
      this.toast.setType(ToastType.INFO)
        .setMessage("Your are already logged in!")
        .setTitle("Info")
        .build()
        .show();
    }
  }

  login(body: any) {
    this.apiSerivce.postApiRequest("/login", body).subscribe(
      {
        next: (resp) => {
          if (resp.status == 200) {
            this.rememberAction();
            let token: any = resp.headers.get("Authorization");
            this.common.storeToLocal("auth", token);
            this.router.navigate(["/dashboard"])
            let data = { "title": "Success", "message": "Logged in successfully!", "type": "success" }
            this.toast.setType(ToastType.SUCCESS)
              .setMessage("Logged in successfully!")
              .setTitle("Success")
              .build()
              .show();
          }
        },
        error: (err) => {
          this.toast.setType(ToastType.FAILURE)
            .setMessage("invalid username and password")
            .setTitle("Error")
            .build()
            .show();
        }
      }
    )
  }

  public rememberAction() {
    if (this.rememberFlag == true) {
      this.common.storeToLocal("remember-item", this.email)
    } else {
      this.common.removeLocal("remember-item")
    }
  }

  private verifySuperAdmin() {
    this.apiSerivce.getApiRequest("/api/v1/superAdmin/homePageNavigation", null).subscribe({
      next: (response) => {

      }, error: (err) => {
        this.showSuperadmin = true
        setTimeout(() => {
          this.jquery.getId("superAdminSection").modalToggle()
        })
      }
    });
  }

  public superadminCreation(json: any) {
    delete json['confirmPassword']
    this.apiSerivce.postApiRequest("/api/v1/superAdmin/create", json).subscribe({
      next: (response) => {

        this.toast.setMessage("Super Admin Created Successfully!")
          .setTitle("Success")
          .setType(ToastType.SUCCESS)
          .build()
          .show()
        setTimeout(() => {
          window.location.reload()
        }, 2000)

      }, error: (err) => {
        this.toast.setMessage("Oops! something went wrong")
          .setTitle("Error")
          .setType(ToastType.FAILURE)
          .build()
          .show()
      }
    })
  }
}


