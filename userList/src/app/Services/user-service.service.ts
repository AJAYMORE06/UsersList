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
  getUser(pageNo): Observable<any> {
    return this.http
      .get("https://reqres.in/api/users?page=" + pageNo, {
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
      .post("https://reqres.in/api/login", user, {
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

  //for update
  updateData(user, id): Observable<any> {
    return this.http
      .put("https://reqres.in/api/users/" + id, user, {
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

  //for delete
  deleteData(id): Observable<any> {
    return this.http
      .delete("https://reqres.in/api/users/" + id, {
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

  //for create
  create(user): Observable<any> {
    return this.http
      .post("https://reqres.in/api/users",user, {
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
