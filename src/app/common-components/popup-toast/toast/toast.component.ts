import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastType } from 'src/app/support/project-enums/projectEnums';
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

  private showToast(title: any, message: any, type: ToastType) {
    if (type == ToastType.SUCCESS) {
      this.headerBg = "bg-success";
    } else if (type == ToastType.FAILURE) {
      this.headerBg = "bg-danger";
    } else if (type == ToastType.INFO) {
      this.headerBg = "bg-primary"
    }
    this.title = title;
    this.message = message;
    $(document).ready(() => {
      $("#liveToast").toast('show')
    })
  }
}
