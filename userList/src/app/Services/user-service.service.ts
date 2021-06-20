import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }
  router: Router;

  //get the user list
  getUser(): Observable<any> {
    return this.http
      .get("https://reqres.in/api/users?page=2", {
        observe: "response",
      })
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          return this.handleApiError(err);
        })
      );
  }

  //for login
  login(user): Observable<any> {
    return this.http
      .post("https://reqres.in/api/login",user,{
        observe: "response",
      })
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(
        catchError((err) => {
          return this.handleApiError(err);
        })
      );
  }

  //Error handle
  handleApiError(error: any) {
    if (error.status == 401) {
      this.router.navigate(['/login']);
    }
    return throwError(error)
  }
}
