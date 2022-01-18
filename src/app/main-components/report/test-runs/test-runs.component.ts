import { Component, OnInit } from '@angular/core';
import { GetAllTestRunsResponse } from 'src/app/response-modals/GetAllTestRunsResponse';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';

@Component({
  selector: 'app-test-runs',
  templateUrl: './test-runs.component.html',
  styleUrls: ['./test-runs.component.css']
})
export class TestRunsComponent implements OnInit {

  response!: GetAllTestRunsResponse;

  constructor(private _api: ApiSerivceService) { }

  ngOnInit(): void {
    this._api.getApiWithModal<GetAllTestRunsResponse>("/api/v1/report/testRuns/getAllTestRuns", this._api.getAuthHeader()).subscribe({
      next: (response) => {
        this.response = response;
      }, error: (err) => {

      }, complete() {

      }
    })

    
  }

}
