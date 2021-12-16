import { AfterViewInit, Component, OnInit } from '@angular/core';
import { VariableShareService } from 'src/app/support/common-services/variable-share.service';
import { ToastService } from './toast.service';
declare var $: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, AfterViewInit {

  public title: any;
  public message: any;
  public headerBg: any;

  constructor(private toast: ToastService) { }
  ngAfterViewInit(): void {
    this.toast.getToastValue().subscribe(data => {
      if (data != null) {
        this.showToast(data.title, data.message, data.type);
      }
    })
  }

  ngOnInit(): void {

  }

  private showToast(title: any, message: any, type: any) {
    if (type == "success") {
      this.headerBg = "bg-success";
    } else if (type == "failure") {
      this.headerBg = "bg-danger";
    } else if (type == "info") {
      this.headerBg = "bg-primary"
    }
    this.title = title;
    this.message = message;
    $(document).ready(() => {
      $("#liveToast").toast('show')
    })
  }
}
