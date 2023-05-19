import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

export class EventTemplate {
  'ideventTemplate': number;
  'Name': string;
  'iduser': number;
  'ProposedWeight': number;
  'idcategory': number;

  constructor() {
    this.ideventTemplate = 0;
    this.Name = '';
    this.iduser = 0;
    this.ProposedWeight = 0;
    this.idcategory = 0;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EventTemplateService {

  constructor(
    private http: HttpClient
  ) { }

  getEventTemplatesByUserId(iduser: number): Observable<EventTemplate[]> {
    return this.http.get<EventTemplate[]>(baseUrl+`/user/${iduser}/templates`);
  }

  addEventTemplate(eventTemplate: EventTemplate): Observable<EventTemplate> {
    let Name = eventTemplate.Name;
    let iduser = eventTemplate.iduser;
    let ProposedWeight = eventTemplate.ProposedWeight;
    let idcategory = eventTemplate.idcategory;
    return this.http.post<EventTemplate>(baseUrl+`/user/${eventTemplate.iduser}/templates`, {Name, iduser, idcategory, ProposedWeight});
  }

  updateEventTemplate(eventTemplate: EventTemplate): Observable<EventTemplate> {
    let Name = eventTemplate.Name;
    let iduser = eventTemplate.iduser;
    let ProposedWeight = eventTemplate.ProposedWeight;
    let idcategory = eventTemplate.idcategory;
    return this.http.put<EventTemplate>(baseUrl+`/user/${eventTemplate.iduser}/templates/${eventTemplate.ideventTemplate}`, {Name, iduser, idcategory, ProposedWeight});
  }

}
