import { Component, OnInit } from '@angular/core';
import { VariableShareService } from './common-services/variable-share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tungsten Automation Lab';
  public showProgressbar: boolean=false;
  constructor(public vShare: VariableShareService) { }
  ngOnInit(): void {
    this.vShare.progressbar.subscribe({
      next: (bool) => {
        Promise.resolve().then(()=>{this.showProgressbar = bool})
      }
    })
  }

}
