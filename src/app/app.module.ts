import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
// import { HTTPInterceptorService } from './httpinterceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
// import { AllEventsComponent } from './all-events/all-events.component';
// import { EventCreationPageComponent } from './event-creation-page/event-creation-page.component';
import { EventComponent } from './event/event.component';
// import { CategoriesListComponent } from './categories-list/categories-list.component';
// import { EventDayComponent } from './event-day/event-day.component';
// import { EventTemplateComponent } from './event-template/event-template.component';
// import { FriendComponent } from './friend/friend.component';
// import { FriendListComponent } from './friend-list/friend-list.component';
// import { TemplatesListComponent } from './templates-list/templates-list.component';
import { UserComponent } from './user/user.component';
import { HTTPInterceptorService } from './httpinterceptor.service';
import { TabsPage } from './tabs/tabs.page';
import { EventDayComponent } from './event-day/event-day.component';
import { FriendComponent } from './friend/friend.component';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
  // declarations: [AppComponent, HomeComponent, LoginComponent, AllEventsComponent, EventCreationPageComponent, EventComponent, CategoriesListComponent, EventDayComponent, EventTemplateComponent, FriendComponent, FriendListComponent, TemplatesListComponent, UserComponent, TabsPage ],
  declarations: [AppComponent, LoginComponent, UserComponent, TabsPage, EventComponent, EventDayComponent, FriendComponent, FriendListComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true},],
  bootstrap: [AppComponent],
})
export class AppModule {}
