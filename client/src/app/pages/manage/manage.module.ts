import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  declarations: [ManageComponent, ItemListComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ManageRoutingModule
  ]
})
export class ManageModule { }
