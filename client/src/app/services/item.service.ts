import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: any[] = [
    { item_id : '1', item_name: 'item1', country_name: 'usa', seller_name: 'seller1', description: 'description1' },
    { item_id : '2', item_name: 'item2', country_name: 'usa', seller_name: 'seller2', description: 'description2' },
    { item_id : '3', item_name: 'item3', country_name: 'usa', seller_name: 'seller2', description: 'description3' },
    { item_id : '4', item_name: 'item4', country_name: 'usa', seller_name: 'seller3', description: 'description4' },
    { item_id : '5', item_name: 'item5', country_name: 'usa', seller_name: 'seller4', description: 'description5' },
  ];

  constructor() { }

  getItems(): Observable<any> {
    return of(this.items);
  }

}
