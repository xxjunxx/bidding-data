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
    this.userService.getBidders()
      .subscribe( response => {
        console.log(response);  
        Array.prototype.push.apply(this.bidders, response);
        this.bidderInitLoading = false;
      });
  }

  getSellers(): void {
    this.userService.getSellers()
      .subscribe( response => {
        console.log(response);  
        Array.prototype.push.apply(this.sellers, response);
        this.sellerInitLoading = false;
      });
  }
}
