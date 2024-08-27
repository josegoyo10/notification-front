import { Component, OnInit } from '@angular/core';
import { CategoriesResponse } from './interfaces/categories-response';
import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataCombo: Array<CategoriesResponse> = [];
  title = 'notification-front';

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.getSelectCategories();
  }

  getSelectCategories() {
    this.notificacionService.getCategories().subscribe((response) => {
      console.log('respuesta categories:' + JSON.stringify(response));
      this.dataCombo = response;
    });
  }

  getValue(e: any) {
    console.log('category:' + e.target.value);
  }
}
