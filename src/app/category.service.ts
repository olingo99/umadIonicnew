import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from './constants';

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

  getCategoryById(userId:Number, catId: Number): Observable<Category>{
    return this.http.get<Category>(baseUrl+`/user/${userId}/category/${catId}`);
  }

  getCategoriesByUserId(userId: Number): Observable<Category[]>{
    return this.http.get<Category[]>(baseUrl+`/user/${userId}/category`);
  }

  addCategory(category: Category): Observable<Category>{
    let iduser = category.iduser;
    let Name = category.Name;
    return this.http.post<Category>(baseUrl+`/user/${category.iduser}/category`, {iduser, Name});
  }

}
