import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { HomeComponent} from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { AllEventsComponent } from './all-events/all-events.component';
// import { EventCreationPageComponent } from './event-creation-page/event-creation-page.component';
import { TabsPage } from './tabs/tabs.page';
import {UserComponent} from './user/user.component';
import { EventDayComponent } from './event-day/event-day.component';
import { FriendListComponent } from './friend-list/friend-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'tabs', component: TabsPage, children: [
    // { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'eventDay', component: EventDayComponent },
    { path: 'friendList', component: FriendListComponent },
  ]},
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  // {path : 'eventCreation', component: EventCreationPageComponent},
  // {path: 'allEvents', component: AllEventsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
