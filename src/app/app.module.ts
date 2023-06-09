import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { UserComponent } from './user/user.component';
import { HTTPInterceptorService } from './httpinterceptor.service';
import { TabsPage } from './tabs/tabs.page';
import { EventDayComponent } from './event-day/event-day.component';
import { FriendComponent } from './friend/friend.component';
import { FriendListComponent } from './friend-list/friend-list.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, TabsPage, EventComponent, EventDayComponent, FriendComponent, FriendListComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true},],
  bootstrap: [AppComponent],
})
export class AppModule {}
