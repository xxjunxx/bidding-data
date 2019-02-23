import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 5;
  total = 1;
  bidDataSet = [];
  loading = true;

  constructor(private itemService: ItemService) {
  }

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.getBids(1, this.pageIndex);
  }

  ngOnInit(): void {
    this.getBids(1, this.pageIndex);
  }

  getBids(itemId, pageIndex): void {
    this.itemService.getBids(1, pageIndex)
      .subscribe(response => {
        this.bidDataSet = response;
        this.total = 8; 
        this.loading = false;
      });
  }
}
