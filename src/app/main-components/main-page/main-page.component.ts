import { Component, OnInit } from '@angular/core';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/support/common-services/common-methods.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private common:CommonMethodsService,
    private api:ApiSerivceService
    ) { }

  ngOnInit(): void {
    this.common.validateToken()
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

}
