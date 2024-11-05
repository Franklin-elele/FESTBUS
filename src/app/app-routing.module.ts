import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { RouteComponent } from './route/route.component';
import { BusListComponent } from './bus-list/bus-list.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'footer', component:FooterComponent},
  {path:'search', component:SearchComponent},
  {path: 'route/:from/:to', component: RouteComponent },
  {path:'route',component:RouteComponent},
  {path:'bus-list', component:BusListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
