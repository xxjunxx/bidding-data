import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ItemListComponent } from './item-list/item-list.component';


const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'item-list', component: ItemListComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManageRoutingModule { }