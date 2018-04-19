import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  id : String;
  error: String;
  author: Object;

  constructor(private _httpService: HttpService, 
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getAuthorFromService();
    })
  }

  getAuthorFromService() {
    this._httpService.getAuthor(this.id).subscribe(data => {
      if (data['error']) {
        this.error = data['error'].message;
      } else {
        this.author = data['data'];
      }
    })
  }
  onVoteUpQuote(quoteId) {
    let obs = this._httpService.upVoteQuote(quoteId);
    obs.subscribe(data => {
      if (data['error']) {
        this.error = data['error'].message;
      } else {
        this.getAuthorFromService();
      }
    })
  }

  onVoteDownQuote(quoteId) {
    let obs = this._httpService.downVoteQuote(quoteId);
    obs.subscribe(data => {
      if (data['error']) {
        this.error = data['error'].message;
      } else {
        this.getAuthorFromService();
      }
    })
  }

  onDeleteQuote(quoteId) {
    let obs = this._httpService.deleteQuote(this.id, quoteId);
    obs.subscribe(data => {
      if (data['error']) {
        this.error = data['error'].message;
      } else {
        this.getAuthorFromService();
      }
    })
  }
}
