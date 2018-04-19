import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {
    return this._http.get('/authors');
  }

  getAuthor(id) {
    return this._http.get('/authors/' + id);
  }

  newAuthor(name) {
    return this._http.post('/authors', { name: name });
  }

  editAuthor(id, name) {
    return this._http.put('/authors/' + id, { name: name });
  }

  deleteAuthor(id) {
    return this._http.delete('/authors/' + id);
  }

  newQuote(id, quote) {
    return this._http.post('/authors/' + id + '/quotes', { quote: quote });
  }

  upVoteQuote(quoteId) {
    return this._http.patch('/quotes/' + quoteId + '/upvote', {});
  }

  downVoteQuote(quoteId) {
    return this._http.patch('/quotes/' + quoteId + '/downvote', {});
  }

  deleteQuote(id, quoteId) {
    return this._http.delete('/quotes/' + id + '/' + quoteId);
  }
}
