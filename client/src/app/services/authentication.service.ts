import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  api = "http://localhost:5000";
  
  private currentAdminSubject: BehaviorSubject<any>;
  public currentAdmin: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentAdminSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentAdmin')));
    this.currentAdmin = this.currentAdminSubject.asObservable();
  }

  login(email: string, password: string) {

    return this.http.post<any>(this.api  + '/login', { email, password })
      .pipe(map(admin => {
          // login successful if there's a jwt token in the response
          if (admin && admin.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentAdmin', JSON.stringify(admin));
              this.currentAdminSubject.next(admin);
          }
          return admin;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentAdmin');
    this.currentAdminSubject.next(null);
  }

  public getCurrentAdminValue(): any {
    return this.currentAdminSubject.value;
  }
}
