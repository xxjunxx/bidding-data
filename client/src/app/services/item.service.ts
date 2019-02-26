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
  
  auctions1: any[] = [
    { item_id : '1', item_name: 'item1', country_name: 'usa', seller_name: 'seller1', description: 'description1' },
    { item_id : '2', item_name: 'item2', country_name: 'usa', seller_name: 'seller2', description: 'description2' },
    { item_id : '3', item_name: 'item3', country_name: 'usa', seller_name: 'seller2', description: 'description3' },
    { item_id : '4', item_name: 'item4', country_name: 'usa', seller_name: 'seller3', description: 'description4' },
  ]

  auctions2: any[] = [
    { item_id : '5', item_name: 'item1', country_name: 'usa', seller_name: 'seller1', description: 'description1' },
    { item_id : '5', item_name: 'item2', country_name: 'usa', seller_name: 'seller2', description: 'description2' },
    { item_id : '5', item_name: 'item3', country_name: 'usa', seller_name: 'seller2', description: 'description3' },
    { item_id : '5', item_name: 'item4', country_name: 'usa', seller_name: 'seller3', description: 'description4' },
  ]
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

  getAuctions(ItemId: number, pageIndex: number = 1, pageSize: number = 5): Observable<any> {
    if ( pageIndex == 1) 
      return of(this.auctions1);
    return of(this.auctions2);
  }
}
