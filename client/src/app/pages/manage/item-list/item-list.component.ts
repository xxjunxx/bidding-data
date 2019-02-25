import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  
  items = [];
  pageIndex = 1;
  pageSize = 5;
  initLoading = true;
  loadingMore = false;
  

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.loadingMore = true;
    this.itemService.getItems(this.pageIndex, this.pageSize)
      .subscribe( response => { 
        response.result.forEach(element => {
          element.description = element.description.substring(0, 200) + "...";
        });
        this.items = this.items.concat(response.result);
        this.initLoading = false;
        this.loadingMore = false;
        this.pageIndex = response.nextPageIndex;
      });
  }
}
