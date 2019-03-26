import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchData;
  searchKeyword;
  pageIndex = 1;
  totalFound = 0;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  onKeywordSearch(newWord = true, keyword = this.searchKeyword) {
    if (newWord === true) {
      this.pageIndex = 1;
    }
    this.searchKeyword = keyword;
    console.log(this.pageIndex);
    this.searchService.getSearchItem(keyword, this.pageIndex - 1).subscribe(result => {
      this.totalFound = result.response.numFound;
      this.searchData = result.response.docs;
      console.log(result.response);
    });
  }
}
