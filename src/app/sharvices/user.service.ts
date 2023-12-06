import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/posts/'
  isUserLogin: BehaviorSubject<any> = new BehaviorSubject('');
  constructor(private httpSrv: HttpClient) { }

  postUserApi(data: any) {
    return this.httpSrv.post<any>(this.baseUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }
  // getById(id:any){
  //   return this.httpSrv.get(this.baseUrl+id)
  // }
  getProfileApi() {
    return this.httpSrv.get<any>(this.baseUrl).pipe(map((res: any) => {
      return res;
    }))
  }
  getUserApi() {
    return this.httpSrv.get<any>(this.baseUrl).pipe(map((res: any) => {
      return res;
    }))
  }
  deleteUserApi(id: number) {
    return this.httpSrv.delete<any>(this.baseUrl + id).pipe(map((res: any) => {
      return res;
    }))
  }
  updateUserApi(data: any, id: number) {
    return this.httpSrv.put<any>(this.baseUrl + id, data).pipe(map((res: any) => {
      return res;
    }))
  }
  isLoggedIn() {
    return sessionStorage.getItem('email') != null;
  }
  // getUserRole() {
  //   return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  // }
}
