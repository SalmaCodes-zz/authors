import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newName: String = "";
  errors: String = "";

  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  onNewAuthorSubmit() {
    this._httpService.newAuthor(this.newName).subscribe(data => {
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.router.navigate(['']);
      }
    })
    this.newName = "";
  }
}
