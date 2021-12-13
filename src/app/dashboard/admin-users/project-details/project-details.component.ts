import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiSerivceService } from 'src/app/common-services/api-serivce.service';
import { AllProjectsResponse, projectList } from 'src/app/response-modals/AllProjectsResponse';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public currentPage: number = 1;
  public allProjectResponse!: AllProjectsResponse;
  public spinner: boolean = true;
  public projectList!: projectList[];
  constructor(private _api: ApiSerivceService) { }

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects() {
    this._api.getApiWithModal<AllProjectsResponse>("/api/v1/superAdmin/getAllProjects", this._api.getAuthHeader())
      .subscribe({
        next: (response) => {
          this.allProjectResponse = response
          this.projectList = this.allProjectResponse.projectList
        },
        error: (err) => {

        },
        complete: () => {
          this.spinner = false
        }
      })

  }

}



