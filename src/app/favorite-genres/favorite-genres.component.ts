import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { AnytimeLibraryService } from '../anytime-library.service';

@Component({
  selector: 'app-favorite-genres',
  templateUrl: './favorite-genres.component.html',
  styleUrls: ['./favorite-genres.component.scss']
})

export class FavoriteGenresComponent implements OnInit {

    genres = [];
    entireBookDetailsData: any = [];
    entireBooksData: any = [];
    selectedBooksToDisplay = [];
    listofBooksBasedOnGenre: any = [];
    displayListOfBooks = false;
    bookDetails: any = [];
    showListOfFavoriteGenres = true;

    constructor(private anytimeLibraryService: AnytimeLibraryService) { }

    ngOnInit() {
        this.anytimeLibraryService.fetchBookDetails().subscribe((list) => {
            this.entireBookDetailsData = list.map(item => {
              return {
                $key: item.key,
                ...item.payload.val()
              };
            });

            if (this.entireBookDetailsData.length > 0) {
              this.entireBooksData = [];
              for (let i = 0; i < this.entireBookDetailsData.length; i++) {
                if (this.entireBookDetailsData[i].noOfCopies > 0) {
                  this.entireBooksData.push(this.entireBookDetailsData[i]);
                  this.genres.push(this.entireBookDetailsData[i].genre);
                }
              }
            }
        });
    }

    getSelectedGenre(genre, event: MatCheckboxChange) {
      if (this.entireBooksData.length > 0) {
        for (let x = 0; x < this.entireBooksData.length; x++) {
          if (this.entireBooksData[x].genre === genre && event.checked) {
            this.selectedBooksToDisplay.push(this.entireBooksData[x].genre);
          } else if (this.entireBooksData[x].genre === genre && event.checked === false) {
            this.selectedBooksToDisplay = this.selectedBooksToDisplay.filter(obj => obj !== genre);
          }
        }
        if (this.selectedBooksToDisplay.length > 0) {
          this.showListOfFavoriteGenres = false;
          this.getListBasedonGenre();
        } else {
          this.showListOfFavoriteGenres = true;
        }
        }
    }

    getListBasedonGenre() {
      this.listofBooksBasedOnGenre = [];
      this.showListOfFavoriteGenres = false;
      for (let x = 0; x < this.selectedBooksToDisplay.length; x++) {
          this.anytimeLibraryService.getBooksBasedOnGenre(this.selectedBooksToDisplay[x]).subscribe((list) => {
            this.bookDetails = list;
            if (this.bookDetails.length > 0) {
              this.displayListOfBooks = true;
              this.listofBooksBasedOnGenre.push(...this.bookDetails);
            } else {
              this.displayListOfBooks = false;
            }
          });
      }
    }
  }
