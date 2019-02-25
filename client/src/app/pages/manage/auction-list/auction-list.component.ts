import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 5;
  total = 1;
  auctionDataSet = [];
  loading = true;

  constructor(private itemService: ItemService) { }


  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.getAuctions(1, this.pageIndex);
  }

  ngOnInit(): void {
    this.getAuctions(1, this.pageIndex);
  }

  getAuctions(itemId, pageIndex): void {
    this.itemService.getAuctions(1, pageIndex)
      .subscribe(response => {
        this.auctionDataSet = response;
        this.total = 8; 
        this.loading = false;
      });
  }

}
