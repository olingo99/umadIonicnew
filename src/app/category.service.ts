import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

/*
Service containing all the functions related to the event category part of the API
*/


//Category class
export class Category {
  'idcategory': number;
  'iduser': number;
  'Name': string;

  constructor(){
    this.idcategory = 0;
    this.iduser = 0;
    this.Name = "";
  }
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http : HttpClient
  ) { }

  //Get a category by its id
  getCategoryById(userId:Number, catId: Number): Observable<Category>{
    return this.http.get<Category>(baseUrl+`/user/${userId}/category/${catId}`);
  }

  //Get all the categories of the user with the given id
  getCategoriesByUserId(userId: Number): Observable<Category[]>{
    return this.http.get<Category[]>(baseUrl+`/user/${userId}/category`);
  }

  //Create a new category with the given parameters
  addCategory(category: Category): Observable<Category>{
    let iduser = category.iduser;
    let Name = category.Name;
    return this.http.post<Category>(baseUrl+`/user/${category.iduser}/category`, {iduser, Name});
  }

}
