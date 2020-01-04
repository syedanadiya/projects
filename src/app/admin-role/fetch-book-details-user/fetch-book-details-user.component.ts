import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort} from '@angular/material';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

@Component({
  selector: 'app-fetch-book-details-user',
  templateUrl: './fetch-book-details-user.component.html',
  styleUrls: ['./fetch-book-details-user.component.scss']
})
export class FetchBookDetailsUserComponent implements OnInit {

  searchKey = '';
  fetchedBookData: any = [];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['author', 'title', 'user-id', 'username', 'issued-date'];
  @ViewChild(MatSort) sort: MatSort;
  showErrorMsgForList = false;
  showFilteredList = true;

  constructor(private anytimeLibraryService: AnytimeLibraryService) { }

  ngOnInit() {
    this.anytimeLibraryService.fetchAllUsersBookDetailsRecords().subscribe((list) => {
      this.fetchedBookData = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
      });
      if (this.fetchedBookData.length > 0) {
        console.log('No user record found');
        this.showErrorMsgForList = false;
        this.showFilteredList = true;
      } else {
        this.showErrorMsgForList = true;
        this.showFilteredList = false;
      }
      this.listData = new MatTableDataSource(this.fetchedBookData);
      this.listData.sort = this.sort;

    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData = new MatTableDataSource(this.fetchedBookData);
    this.listData.filter = this.searchKey.trim().toLowerCase();
    if (this.listData.filteredData.length === 0) {
      this.showErrorMsgForList = true;
      this.showFilteredList = false;
    } else {
      this.showErrorMsgForList = false;
      this.showFilteredList = true;
    }
  }
}
