import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { ItemCreateComponent } from './item-create/item-create.component';


const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      { path: '', component: ItemListComponent, pathMatch: "full" },
      { path: 'item-list', component: ItemListComponent, pathMatch: 'full' },
      { path: 'item-list/:id', component: ItemDetailComponent, pathMatch: 'full' },
      { path: 'user-list', component: UserListComponent, pathMatch: 'full' },
      { path: 'user-list/:name', component: UserDetailComponent, pathMatch: 'full' },
      { path: 'item-create', component: ItemCreateComponent, pathMatch: 'full' },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ManageRoutingModule { }