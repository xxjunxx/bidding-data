import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  
  @Input() auctionsTotal;
  @Input() sellerName;
  
  
  pageIndex = 1;
  pageSize = 5;
  auctionDataSet = [];
  loading = true;

  constructor(private itemService: ItemService) { }


  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.getAuctions(this.sellerName, this.pageIndex, this.pageSize);
  }

  ngOnInit(): void {
    this.getAuctions(this.sellerName, this.pageIndex, this.pageSize);
  }

  getAuctions(sellerName, pageIndex, pageSize): void {
    this.itemService.getAuctions(sellerName, pageIndex, pageSize)
      .subscribe(response => {
        this.auctionDataSet = response.result;
        this.loading = false;
        //console.log(this.auctionDataSet);
      });
  }

}
