import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items = [];
  initLoading = true;
  loadingMore = false;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
    this.initLoading = false;
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe( response => {
        console.log(response);  
        Array.prototype.push.apply(this.items, response);
      });
  }


  
}
