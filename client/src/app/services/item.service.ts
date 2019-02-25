import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  randomUserUrl = 'https://api.randomuser.me/';
  
  items: any[] = [
    { item_id : '1', item_name: 'item1', country_name: 'usa', seller_name: 'seller1', description: 'description1' },
    { item_id : '2', item_name: 'item2', country_name: 'usa', seller_name: 'seller2', description: 'description2' },
    { item_id : '3', item_name: 'item3', country_name: 'usa', seller_name: 'seller2', description: 'description3' },
    { item_id : '4', item_name: 'item4', country_name: 'usa', seller_name: 'seller3', description: 'description4' },
    { item_id : '5', item_name: 'item5', country_name: 'usa', seller_name: 'seller4', description: 'description5' },
  ];

  bids1: any[] = [
    { item_id : '1', bidder_name: 'bidder1', bid_time: '2001-12-15 05:51:35', bid_price: '2.00'},
    { item_id : '1', bidder_name: 'bidder2', bid_time: '2001-12-16 05:51:35', bid_price: '2.20'},
    { item_id : '1', bidder_name: 'bidder3', bid_time: '2001-12-17 05:51:35', bid_price: '2.30'},
    { item_id : '1', bidder_name: 'bidder4', bid_time: '2001-12-18 05:51:35', bid_price: '2.40'},
    { item_id : '1', bidder_name: 'bidder1', bid_time: '2001-12-18 05:51:39', bid_price: '3.00'},
  ];
  bids2: any[] = [
    { item_id : '1', bidder_name: 'bidder7', bid_time: '2001-12-15 05:51:35', bid_price: '4.00'},
    { item_id : '1', bidder_name: 'bidder8', bid_time: '2001-12-16 05:51:35', bid_price: '5.20'},
    { item_id : '1', bidder_name: 'bidder0', bid_time: '2001-12-17 05:51:35', bid_price: '6.30'}
  ]

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

  getItems(): Observable<any> {
    return of(this.items);
  }


  getUsers(pageIndex: number = 1, pageSize: number = 10, sortField: string, sortOrder: string, genders: string[]): Observable<{}> {
    let params = new HttpParams()
    .append('page', `${pageIndex}`)
    .append('results', `${pageSize}`)
    .append('sortField', sortField)
    .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get(`${this.randomUserUrl}`, {
      params
    });
  }

  getBids(ItemId: number, pageIndex: number = 1, pageSize: number = 5): Observable<any> {
    if ( pageIndex == 1) 
      return of(this.bids1);
    return of(this.bids2);
  }

  getAuctions(ItemId: number, pageIndex: number = 1, pageSize: number = 5): Observable<any> {
    if ( pageIndex == 1) 
      return of(this.auctions1);
    return of(this.auctions2);
  }
}
