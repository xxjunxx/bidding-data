import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  
  @Input() bidsTotal;
  @Input() itemId;
  
  pageIndex = 1;
  pageSize = 5;
  bidDataSet = [];
  loading = true;

  constructor(private itemService: ItemService) {
  }

  searchData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.pageIndex = 1;
    } 
    this.getBids(this.itemId, this.pageIndex, this.pageSize);
  }

  ngOnInit(): void {
    this.getBids(this.itemId, this.pageIndex, this.pageSize);
  }

  getBids(itemId, pageIndex, pageSize): void {
    this.itemService.getBidsByItem(itemId, pageIndex, pageSize)
      .subscribe(response => {
        response.result.forEach(element => {
          let d = new Date(element.bid_time);
          element.bid_time = d.toLocaleString();
        });
        this.bidDataSet = response.result;
        this.loading = false;
      });
  }


}
