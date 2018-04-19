import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authors = [];
  errors = "";

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors() {
    this._httpService.getAuthors().subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.authors = data['data'];
      }
    })
  }

  onDeleteAuthor(id) {
    this._httpService.deleteAuthor(id).subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.getAuthors();
      }
    })
  }

}
