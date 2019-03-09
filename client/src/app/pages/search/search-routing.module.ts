import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';


const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SearchRoutingModule { }