import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';
import { EventTemplate } from './event-template.service';

/*
Service containing all the functions related to the events part of the API
*/


// Event class
export class Event {
  'idevent': number;
  'Name': string;
  'iduser': number;
  'Weight': number;
  'Date': Date;
  'idcategory': number;


  constructor(){
    this.idevent = 0;
    this.Name = "";
    this.iduser = 0;
    this.Weight = 0;
    this.Date = new Date();
    this.idcategory = 0;
  }
}


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  //Get all the events of today of the user with the given id
  getTodayEventsByUserId(iduser: number): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl+`/user/${iduser}/events`);
  }

  //Get the last event of the user with the given id
  getLastEventsByUserId(iduser: number): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl+`/user/${iduser}/lastevent`);
  }

  //Create a new event with the given parameters
  addEvent(event: EventTemplate): Observable<Event> {
    let Name = event.Name;
    let iduser = event.iduser;
    let Weight = event.ProposedWeight;
    let idcategory = event.idcategory;
    let now = new Date();
    return this.http.post<Event>(baseUrl+`/user/${event.iduser}/events`, {Name, iduser, idcategory, Weight, Date:now});
  }

  //Get all the events of the user with the given id for the given date
  getEventsByDate(iduser: number, date: Date): Observable<Event[]> {
    let Sdate = date.toString().replaceAll('-','')
    console.log("getEventsByDate");
    console.log(Sdate);
    return this.http.get<Event[]>(baseUrl+`/user/${iduser}/events/${Sdate}`);
  }

  //Delete the event with the given id
  deleteEventById(iduser: number, idevent:number): Observable<Event[]> {
    return this.http.delete<Event[]>(baseUrl+`/user/${iduser}/event/${idevent}`);
  }
}
