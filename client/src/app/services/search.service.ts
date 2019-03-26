import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  queryAPI = "http://localhost:8983/solr/mycore/select?";

  constructor(private http: HttpClient) {
    
  }

  getSearchItem(keyword, pageIndex = 0, pageSize = 15): Observable<any>  {
    let query = "q=name:" + keyword + " || description:" + keyword + " || category:" + keyword;
    let row = "rows=" + pageSize;
    let start = "start=" + pageIndex * pageSize;
    return this.http.get(this.queryAPI + query + '&' + row + '&' + start + '&' + 'wt=json');
  }

}
