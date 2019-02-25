import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { BidListComponent } from './bid-list/bid-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuctionListComponent } from './auction-list/auction-list.component';

@NgModule({
  declarations: [
    ManageComponent, 
    ItemListComponent, 
    ItemDetailComponent, 
    BidListComponent, 
    UserListComponent, 
    UserDetailComponent, AuctionListComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
