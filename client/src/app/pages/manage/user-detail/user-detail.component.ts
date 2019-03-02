import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user = {
    name: null,
    rating: null,
    isBidder: false,
    isSeller: false,
    bidCount: 0,
    auctionCount:0
  };


  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    let userName = this.route.snapshot.paramMap.get('name');
    this.userService.getSingleUser(userName)
      .subscribe(response => {
        if (response.seller) {
          this.user.name = response.seller.seller_name;
          this.user.rating = response.seller.rating;
          this.user.isSeller = true;
          this.user.auctionCount = response.seller.auction_count
        } 
        if (response.bidder) {
          this.user.name = response.bidder.bidder_name;
          this.user.rating = response.bidder.rating;
          this.user.isBidder = true;
          this.user.bidCount = response.bidder.bid_count;
        }
        console.log(this.user);
      });
  }

}
