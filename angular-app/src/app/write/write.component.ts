import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  id: String;
  author: Object;
  quote: String = "";
  error: String;

  constructor(private _httpService: HttpService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this._httpService.getAuthor(this.id).subscribe(data => {
        if (data['error']) {
          this.error = data['error'].message;
        } else {
          this.author = data['data'];
        }
      })
    })
  }

  onNewQuoteSubmit() {
    let obs = this._httpService.newQuote(this.id, {content: this.quote});
    obs.subscribe(data => {
      if (data['error']) {
        this.error = data['error'].message;
      } else {
        this.router.navigate(['/quotes/' + this.id]);
      }
    })
  }
}
