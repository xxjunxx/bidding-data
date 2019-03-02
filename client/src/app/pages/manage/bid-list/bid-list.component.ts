import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bid-list',
  templateUrl: './bid-list.component.html',
  styleUrls: ['./bid-list.component.css']
})
export class BidListComponent implements OnInit {
  
  @Input() bidsTotal;
  @Input() type;
  @Input() itemId;
  @Input() bidderName;
  
  
  pageIndex = 1;
  pageSize = 5;
  bidDataSet = [];
  loading = true;



  constructor(private itemService: ItemService, private userService: UserService) {
  }

  searchData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.pageIndex = 1;
    } 
    if (this.type === "item") {
      this.getBidsByItem(this.itemId, this.pageIndex, this.pageSize);
    } else if (this.type === "bidder") {
      this,this.getBidsByBidder(this.bidderName, this.pageIndex, this.pageSize);
    }
  }

  ngOnInit(): void {
    if (this.type === "item") {
      this.getBidsByItem(this.itemId, this.pageIndex, this.pageSize);
    } else if (this.type === "bidder") {
      this.getBidsByBidder(this.bidderName, this.pageIndex, this.pageSize);
    }
     
  }

  getBidsByItem(itemId, pageIndex, pageSize): void {
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

  getBidsByBidder(bidderName, pageIndex, pageSize): void {
    this.userService.getBidsByBidder(bidderName, pageIndex, pageSize)
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
