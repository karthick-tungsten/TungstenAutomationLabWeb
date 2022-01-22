import { Component, OnInit } from '@angular/core';
import { GetAllTestRunsResponse, Status } from 'src/app/response-modals/GetAllTestRunsResponse';
import { ApiSerivceService } from 'src/app/support/common-services/api-serivce.service';
import { ChartData, ChartEvent} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-test-runs',
  templateUrl: './test-runs.component.html',
  styleUrls: ['./test-runs.component.css']
})
export class TestRunsComponent implements OnInit {

  response!: GetAllTestRunsResponse;

  public get Status() {
    return Status;
  }

  constructor(private _api: ApiSerivceService) {

  }

  ngOnInit(): void {
    this._api.getApiWithModal<GetAllTestRunsResponse>("/api/v1/report/testRuns/getAllTestRuns", this._api.getAuthHeader()).subscribe({
      next: (response) => {
        this.response = response;
      }, error: (err) => {

      }, complete() {

      }
    })
  }

  getChartData(passed=0, failed=0, skipped=0) {
    return {
      data: {
        labels: ["PASSED", "FAILED", "SKIPPED"],
        
        datasets: [
          {
            animation:true,
            data: [passed, failed, skipped],
            backgroundColor: ['#006b0b', '#ff0000', '#007abd']
          }
        ]
      } as ChartData<'doughnut'>,
    }
  }

  chartClick(event:any){
    console.log(event);
    
  }

}
