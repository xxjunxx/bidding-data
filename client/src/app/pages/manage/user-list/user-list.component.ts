import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  bidders = [];
  sellers = [];
  bidderPageIndex = 1;
  bidderPageSize = 5;
  sellerPageIndex = 1;
  sellerPageSize = 5;
  bidderInitLoading = true;
  bidderLoadingMore = false;
  sellerInitLoading = true;
  sellerLoadingMore = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getBidders();
    this.getSellers();

  }
  getBidders(): void {
    this.bidderLoadingMore = true;
    this.userService.getBidders(this.bidderPageIndex, this.bidderPageSize)
      .subscribe( response => {
        this.bidders = this.bidders.concat(response.result)
        this.bidderInitLoading = false;
        this.bidderLoadingMore = false;
        this.bidderPageIndex = response.nextPageIndex;
      });
  }

  getSellers(): void {
    this.sellerLoadingMore = true;
    this.userService.getSellers(this.sellerPageIndex, this.sellerPageSize)
      .subscribe( response => {
        this.sellers = this.sellers.concat(response.result)
        this.sellerInitLoading = false;
        this.sellerLoadingMore = false;
        this.sellerPageIndex = response.nextPageIndex;
      });
  }
}
