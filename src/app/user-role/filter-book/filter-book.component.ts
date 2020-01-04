import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';


@Component({
  selector: 'app-filter-book',
  templateUrl: './filter-book.component.html',
  styleUrls: ['./filter-book.component.scss']
})
export class FilterBookComponent implements OnInit {

    searchKey = '';
    fetchedResults: any = [];
    showResults = false;
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['author', 'title', 'genre', 'ISBN', 'description', 'availability', 'file', 'location', 'noOfCopies'];

    constructor(private anytimeLibraryService: AnytimeLibraryService) { }

    ngOnInit() {
        this.anytimeLibraryService.fetchBookDetails().subscribe((list) => {
          this.fetchedResults = list.map(item => {
              return {
                $key: item.key,
                ...item.payload.val()
              };
          });
          this.listData = new MatTableDataSource(this.fetchedResults);
        });
    }

    onSearchClear() {
      this.searchKey = '';
      this.applyFilter();
    }

    applyFilter() {
      this.listData.filterPredicate = function(data, filter: string): boolean {
          return data.genre.toLowerCase().includes(filter);
      };
      this.listData.filter = this.searchKey.trim().toLowerCase();
      if (this.listData.filteredData.length > 0) {
        this.showResults = false;
      } else {
        this.showResults = true;
      }
    }
}
