import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  bidders: any[] = [
    { bidder_name : '1', rating: '111' },
    { bidder_name : '2', rating: '222' },
    { bidder_name : '3', rating: '333' },
    { bidder_name : '4', rating: '444' },
    { bidder_name : '5', rating: '555' }
  ];
  sellers: any[] = [
    { seller_name : '1', rating: '11' },
    { seller_name : '2', rating: '22' },
    { seller_name : '3', rating: '33' },
    { seller_name : '4', rating: '44' },
    { seller_name : '5', rating: '55' }
  ];
  
  constructor() { }

  getBidders(): Observable<any> {
    return of(this.bidders);
  }

  getSellers(): Observable<any> {
    return of(this.sellers);
  }
}
