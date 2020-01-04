import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

    displayedColumns: string[] = ['author', 'title', 'genre', 'ISBN', 'description', 'availability', 'file', 'location', 'noOfCopies'];
    showResults = false;
    searchKey = '';
    fetchedResults: any = [];
    listData: MatTableDataSource<any>;

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
        if (this.searchKey === '') {
          this.showResults = false;
        }
    }

    applyFilter() {
        if (this.searchKey !== '') {
          this.listData.filterPredicate = function(data, filter: string): boolean {
            return data.author.toLowerCase().includes(filter);
          };
          this.listData.filter = this.searchKey.trim().toLowerCase();
          if (this.listData.filteredData.length > 0) {
            this.showResults = true;
          } else {
            this.showResults = false;
          }
        } else {
          this.showResults = false;
        }
    }
}
