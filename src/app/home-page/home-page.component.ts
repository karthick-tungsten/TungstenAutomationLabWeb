import { Component, OnInit } from '@angular/core';
import { ApiSerivceService } from '../common-services/api-serivce.service';
import { CommonMethodsService } from '../common-services/common-methods.service';
import { ToastComponent } from '../popup-toast/toast/toast.component';
declare var $:any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private apiSerivce: ApiSerivceService,private common:CommonMethodsService) { }

  ngOnInit(): void {
  }

  login(body: any) {
    this.apiSerivce.postApiRequest("/login", body).subscribe(
      {
        next: (resp) => {
          if (resp.status == 200) {
            let token: any = resp.headers.get("Authorization");
            this.common.storeToLocal("auth",token);
          }
        },
        error:(err)=>{
          
        }
      }
    )
  }

}