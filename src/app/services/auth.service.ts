import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';
import { ApiResponse } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl:string = environment.apiRoot;
  public LoggedIn: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.LoggedIn = new BehaviorSubject(null);
  }

  public contentHeader(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return headers;
  }

  login(username: string, password: string) {
    let headers = this.contentHeader();
    let url = this.apiUrl + '/user/login' + `?username=${username}&password=${password}`;
    return this.http.get<ApiResponse>(url, { headers }).pipe(tap(
      (res)=> {
        this.LoggedIn.next(true);
        const cookieExpiry = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
        const cookieValue = res.message.slice(23);
        const cookieData = {
          name: 'sid',
          value: cookieValue,
          expires: cookieExpiry,
          secure: environment.production
        }
        this.cookieService.set(cookieData);
        return res;
      }
    ));
  }

}
