import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

@Component({
  selector: 'app-retrieve-book-isbn',
  templateUrl: './retrieve-book-isbn.component.html',
  styleUrls: ['./retrieve-book-isbn.component.scss']
})

export class RetrieveBookIsbnComponent implements OnInit {

  fetchedData: any = [];
  bookDetailsByISBN: any = [];
  displayBookList = false;
  listData: MatTableDataSource<any>;
  displayResults = false;
  noRecordFound = false;

  constructor(private anytimeLibraryService: AnytimeLibraryService) { }

  ngOnInit() {
    this.anytimeLibraryService.fetchBookDetails().subscribe((list) => {
      if (list.length > 0) {
        this.displayResults = true;
        this.fetchedData = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
      });
        this.listData = new MatTableDataSource(this.fetchedData);
      } else {
        this.noRecordFound = true;
      }
    });
  }

  getBookDetailsByISBN(ISBN) {
    this.displayBookList = true;
    this.anytimeLibraryService.fetchRecordByISBN(ISBN).subscribe((list) => {
      this.bookDetailsByISBN = list;
    });
  }
}
