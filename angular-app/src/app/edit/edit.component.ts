import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  name: string;
  errors: string = "";

  constructor(private _httpService: HttpService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this._httpService.getAuthor(this.id).subscribe(data => {
        if (data['error']) {
          this.errors = data['error'].message;
        } else {
          this.name = data['data'].name;
        }
      })
    });
  }

  onEditAuthorSubmit() {
    this._httpService.editAuthor(this.id, this.name).subscribe(data => {
      console.log("onEdit returned: ", data);
      if (data['error']) {
        this.errors = data['error'].message;
      } else {
        this.router.navigate(['']);
      }
    })
  }
}
