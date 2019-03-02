import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  api = 'http://localhost:5000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getItems(pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/items', data, this.httpOptions);
  }

  getSingleItem(itemId): Observable<any> {
      return this.http.get(this.api + '/items/'+itemId);
  }
  
  getBidsByItem(itemId, pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/items/' + itemId + '/bids', data, this.httpOptions);
  }

  getAuctions(sellerName, pageIndex, pageSize): Observable<any> {
    let data = {
      'pageIndex': pageIndex,
      'pageSize': pageSize
    }
    return this.http.post(this.api + '/sellers/' + sellerName + '/auctions', data, this.httpOptions);
  }
    
  
}
