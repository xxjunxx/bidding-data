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

  getBidsByBidder(bidderName, pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/bidders/' + bidderName + '/bids', data, this.httpOptions);
  }

  getSellersByTextSearch(sellerId): Observable<any> {
    let sellers = [
      'aaaaa',
      'bbbbb',
      'ccccc',
      'ddddd',
    ];
    return of(sellers);
  }

  getSellerById(sellerId): Observable<any> {
    let seller = ['SS'];
    return of(seller);
  }
}
