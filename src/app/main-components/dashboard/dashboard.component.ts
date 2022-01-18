import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { CommonMethodsService } from 'src/app/support/common-services/common-methods.service';

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
     if (location.pathname == '/' + section) {
       this.router.navigate([''])
     } else {      
       this.router.navigate(['/' + section])
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
