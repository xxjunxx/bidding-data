import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  api = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  register(admin) {
    return this.http.post(this.api + `/register`, admin);
  }

}
