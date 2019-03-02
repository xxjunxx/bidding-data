import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = "http://localhost:5000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBidders(pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/bidders', data, this.httpOptions);
  }

  getSellers(pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/sellers', data, this.httpOptions);
  }

  getSingleUser(userName): Observable<any> {
    return this.http.get(this.api + '/users/' + userName);
  }

  getBidsByBidder(BidderName, pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/bidders/' + BidderName + '/bids', data, this.httpOptions);
  }
}
