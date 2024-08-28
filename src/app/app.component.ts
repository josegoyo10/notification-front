import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from './interfaces/categories-response';
import { NotificacionService } from './services/notificacion.service';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MessageRequest } from './interfaces/message_request';
import Swal from 'sweetalert2';
import { NotificationResponse } from './interfaces/notification-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataCombo: Array<CategoriesResponse> = [];
  dataNotification: Array<NotificationResponse> = [];
  title = 'notification-front';
  form!: UntypedFormGroup;
  submitted: boolean = false;
  constructor(
    private notificacionService: NotificacionService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getSelectCategories();
    this.getNotifications();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      text_message: ['', Validators.required],
    });
  }

  getSelectCategories() {
    this.notificacionService.getCategories().subscribe((response) => {
      console.log('response categories:' + JSON.stringify(response));
      this.dataCombo = response;
    });
  }

  getNotifications() {
    this.notificacionService.getListNotifications().subscribe((response) => {
      console.log('response notifications:' + JSON.stringify(response));
      this.dataNotification = response.data;
    });
  }

  getValue(e: any) {
    console.log('category:' + e.target.value);
  }

  get f() {
    return this.form.controls;
  }

  onAddMessage() {
    this.submitted = true;
    let data: MessageRequest = {
      category_id: Number(this.form.controls['category'].value),
      message: this.form.controls['text_message'].value,
    };

    if (this.form.invalid) {
      return;
    }
    console.log('data:' + JSON.stringify(data));
    this.notificacionService.addMessage(data).subscribe({
      next: (response) => {
        console.log('respuesta addMessage:' + JSON.stringify(response));
        if (response.status === 'Ok') {
          Swal.fire({
            icon: 'success',
            title: 'Message has been sent and notified',
            showConfirmButton: true,
            timer: 3000,
          });
        }
        this.submitted = false;
        this.form.reset();
        this.getNotifications();
      },
      error(e) {
        console.log(e);
      },
    });
  }
}
