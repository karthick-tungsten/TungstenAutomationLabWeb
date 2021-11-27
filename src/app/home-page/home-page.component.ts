import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSerivceService } from '../common-services/api-serivce.service';
import { CommonMethodsService } from '../common-services/common-methods.service';
import { VariableShareService } from '../common-services/variable-share.service';
import { ToastComponent } from '../popup-toast/toast/toast.component';
declare var $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private apiSerivce: ApiSerivceService, private common: CommonMethodsService,
    private vShare: VariableShareService, private route: Router) { }

  ngOnInit(): void {
    this.alreadyLoggedInAction();
  }

  alreadyLoggedInAction() {
    if (this.common.getFromLocal("auth") != null) {
      this.route.navigate(["/dashboard"])
      let data = { "title": "Info", "message": "Your are already logged in!", "type": "info" }
      this.vShare.showToastValues(data)
    }
  }

  login(body: any) {
    this.apiSerivce.postApiRequest("/login", body).subscribe(
      {
        next: (resp) => {
          if (resp.status == 200) {
            let token: any = resp.headers.get("Authorization");
            this.common.storeToLocal("auth", token);
            this.route.navigate(["/dashboard"])
            let data = { "title": "Success", "message": "Logged in successfully!", "type": "success" }
            this.vShare.showToastValues(data)
          }
        },
        error: (err) => {
          let data = { "title": "Error", "message": "invalid username and password", "type": "failure" }
          this.vShare.showToastValues(data)
        }
      }
    )
  }

}