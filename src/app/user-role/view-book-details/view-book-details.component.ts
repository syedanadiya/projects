import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RatingChangeEvent } from 'angular-star-rating';
import { MatTableDataSource } from '@angular/material';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { formatDate } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-view-book-details',
  templateUrl: './view-book-details.component.html',
  styleUrls: ['./view-book-details.component.scss']
})

export class ViewBookDetailsComponent implements OnInit {

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['author', 'title', 'genre', 'ISBN', 'description', 'availability', 'assign-to-self'];
  onRatingChangeResult: RatingChangeEvent;
  reviewBookForm: FormGroup;
  entireBooksData = [];
  entireDataOfBookDetails = [];
  listOfUserData = [];
  wholeBooksISBNs = [];
  userBooksISBNs = [];
  listToDisplay = [];
  fetchedMasterBooksDataByISBN = [];
  assignedListOfUserBooks = [];
  userCountData = [];
  addAllData: Array<any> = [];
  userBooksList = [];
  bookData: any;
  userSpecificBookCount: any;
  assignedBookToUser: any;
  reviewOfCurrentUser: any;
  removeEntireData: AngularFireList<any>;
  noRecordsFound = false;
  addedData = false;
  userCountKey: string;
  storeKeyValue: string;
  totalBooks: number;
  displayTable = false;
  executeOnce = false;
  noOfCopiesLeft: number;
  displayReview = false;
  returnedFromLocation: string;
  noOfLikes: number;
  noOfDislikes: number;
  decrementBookCount: number;
  reviewFormClicked = false;
  fetchedList: any;
  fetchTotalNoOfBooksAvailed = false;
  keyToDeleteUserRecord: string;
  assigned = false;
  listofBooksTaken = false;
  noOfCopiesToIncrement: number;
  availibilityToSet: string;
  bookDetailsByISBN: any = [];
  updateNoOfCopiesValue = false;
  updateMasterTableWhileReturningValue = false;
  diffInDays: any;
  obtainedKey: string;
  inUpdateMasterClicked = false;
  bookToBeReturned: string;

  constructor(private anytimeLibraryService: AnytimeLibraryService,
              private afd: AngularFireDatabase, private angularFireAuth: AngularFireAuth, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          ['author', 'title', 'availability', 'assign-to-self'] :
          ['author', 'title', 'genre', 'ISBN', 'description', 'availability', 'assign-to-self'];
    });
  }

  ngOnInit() {
    console.log('the loggedin user at view book details is', this.angularFireAuth.auth.currentUser.email);
    this.executeOnce = true;
    this.anytimeLibraryService.fetchBookDetails().subscribe((list) => {
        this.entireDataOfBookDetails = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        if (this.entireDataOfBookDetails.length > 0) {
          console.log('At View Book details', this.entireDataOfBookDetails);
          this.entireBooksData = [];
          for (let i = 0; i < this.entireDataOfBookDetails.length; i++) {
            if (this.entireDataOfBookDetails[i].noOfCopies > 0) {
              this.entireBooksData.push(this.entireDataOfBookDetails[i]);
            }
          }
          if (this.entireBooksData.length > 0) {
            this.getCurrentUserBookRecords();
          }
        }
    });
    this.fetchExistingRecordsOfCurrentUser();
    this.returnUsersTotalCountOfBooks();
    if (this.executeOnce) {
      this.updateNoOfDaysElapsed();
    }

    this.bookData = {
      author: '',
      title: '',
      genre: '',
      file: '',
      ISBN: '',
      noOfCopies: '',
      description: '',
      availability: ''
    };

    this.assignedBookToUser = {
      author: '',
      title: '',
      username: '',
      userId: '',
      issuedDate: '',
      renewDate: '',
      noOfDaysElapsed: Number,
      assigned: '',
      userISBN: '',
      noOfBooksTaken: Number,
      location: ''
    };

    this.userSpecificBookCount = {
      email: '',
      userBookCount: ''
    };

    this.reviewOfCurrentUser = {
      reviewBookISBN: '',
      rating: Float32Array,
      comments: '',
      like: Number,
      dislike: Number
    };

    this.reviewBookForm = new FormGroup({
      comments : new FormControl(null, Validators.required),
      friends : new FormArray([])
    });


  }

  fetchExistingRecordsOfCurrentUser() {
    this.anytimeLibraryService.fetchRecordOfLoggedInUserEmailAddress(this.angularFireAuth.auth.currentUser.email).subscribe((list) => {
      this.assignedListOfUserBooks = list;
      if (this.assignedListOfUserBooks.length > 0) {
          this.displayTable = true;
          this.listofBooksTaken = false;
        } else {
          this.displayTable = false;
          this.listofBooksTaken = true;
        }
    });
  }

  getCurrentUserBookRecords() {
    console.log('getCurrentUsersBookRecords');
    this.anytimeLibraryService.fetchRecordOfLoggedInUserEmailAddress(this.angularFireAuth.auth.currentUser.email).subscribe((list) => {
      this.listOfUserData = list;
      this.filterData();
      this.updateMasterTableWhileReturningValue = false;
    });
  }

  filterData() {
    console.log('filter Data');
    this.wholeBooksISBNs = [];
    this.userBooksISBNs = [];
    this.listToDisplay = [];
    if (this.entireBooksData.length > 0 && this.listOfUserData.length > 0) {
        for (let i = 0; i < this.entireBooksData.length; i++) {
          this.wholeBooksISBNs.push(this.entireBooksData[i].ISBN);
        }
        for (let j = 0; j < this.listOfUserData.length; j++) {
            this.userBooksISBNs.push(this.listOfUserData[j].userISBN);
        }
        this.listToDisplay = this.wholeBooksISBNs.filter((el) => !this.userBooksISBNs.includes(el));
        if (this.listToDisplay.length > 0) {
           this.noRecordsFound = true;
           for (let i = 0; i < this.listToDisplay.length; i++) {
            this.getBookDetailsByISBN(this.listToDisplay[i]);
          }
        } else {
          this.noRecordsFound = false;
          this.listData = new MatTableDataSource(this.listToDisplay);
        }
    } else {
        this.noRecordsFound = true;
        this.listData = new MatTableDataSource(this.entireBooksData);
    }
  }

  getBookDetailsByISBN(ISBN) {
    this.addAllData = [];
    this.fetchedMasterBooksDataByISBN = [];
    this.anytimeLibraryService.fetchRecordByISBN(ISBN).subscribe((list) => {
      this.addAllData.push(list);
      if (this.addAllData.length === this.listToDisplay.length) {
        for (let i = 0; i < this.addAllData.length; i++) {
          const x = this.addAllData[i];
          this.fetchedMasterBooksDataByISBN.push(x[0]);
        }
        this.listData = new MatTableDataSource(this.fetchedMasterBooksDataByISBN);
      }
    });
  }

  assignToSelf(currentBook) {
    console.log('In assignToSelf');
    this.reviewFormClicked = false;
    const now = new Date();
    this.wholeBooksISBNs = [];
    this.userBooksISBNs = [];
    this.assignedBookToUser.author = currentBook.author;
    this.assignedBookToUser.title = currentBook.title;
    this.assignedBookToUser.userId = currentBook.id;
    this.assignedBookToUser.username = this.angularFireAuth.auth.currentUser.email;
    this.assignedBookToUser.issuedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '');
    this.assignedBookToUser.renewDate = formatDate(new Date(new Date().setDate(now.getDate() + 30)), 'yyyy-MM-dd', 'en-US', '');
    const diffs = (Date.parse(formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '')) - Date.parse(this.assignedBookToUser.issuedDate));
    this.assignedBookToUser.noOfDaysElapsed = (diffs / 86400000);
    this.assignedBookToUser.assigned = 'true';
    this.assignedBookToUser.userISBN = currentBook.ISBN;
    this.assignedBookToUser.location = currentBook.location;
    this.anytimeLibraryService.saveBookDetailsOfUser(this.assignedBookToUser).subscribe((response) => {
      if (response) {
        console.log('Book assigned successfully');
        this.reviewFormClicked = false;
        this.updateMasterBookData(currentBook);
      }
    });
  }

  updateMasterBookData(currentBook) {
    this.inUpdateMasterClicked = true;
    this.bookData.author = currentBook.author;
    this.bookData.title = currentBook.title;
    this.bookData.genre = currentBook.genre;
    this.bookData.ISBN = currentBook.ISBN;
    this.bookData.description = currentBook.description;
    if (currentBook.noOfCopies > 0) {
      this.noOfCopiesLeft = currentBook.noOfCopies - 1;
      if (this.noOfCopiesLeft > 0) {
        this.bookData.noOfCopies = this.noOfCopiesLeft;
        this.bookData.availability = 'yes';
      } else {
        this.bookData.noOfCopies = 0;
        this.bookData.availability = 'no';
      }
    }
    this.anytimeLibraryService.fetchKeyValueByISBN(currentBook.ISBN).subscribe((list) => {
      if (this.inUpdateMasterClicked) {
        this.afd.object('/bookDetails/' + list[0].key).update({
          noOfCopies: this.bookData.noOfCopies,
          availability: this.bookData.availability
        });
      }
    });
  }

  fetchTotalNoofBooksAvailedNew(currentBook) {
    console.log('fetchTotalNoofBooksAvailedNew', this.storeKeyValue);
    if (this.storeKeyValue !== ' ' && this.storeKeyValue !== undefined) {
      this.afd.object('/usersTotalCountOfBooks/' + this.storeKeyValue).valueChanges().subscribe((userAvailedBooksCount) => {
        if (userAvailedBooksCount !== null) {
          console.log('userAvailedBooksCount', userAvailedBooksCount);
          this.totalBooks = userAvailedBooksCount[0].userBookCount;
        }
      });
      if (this.totalBooks >= 2 && this.totalBooks !== null) {
        alert('You can take maximum of two books only !!!');
        return;
      } else if (this.totalBooks < 2 && this.totalBooks !== null) {
        this.assignToSelf(currentBook);
        if (this.storeKeyValue !== '' && this.storeKeyValue !== undefined) {
          this.afd.object('/usersTotalCountOfBooks/' + this.storeKeyValue).update({
            userBookCount: 2
          });
        }
      }
    } else {
        this.anytimeLibraryService.fetchTotalBookCountOfUser(this.angularFireAuth.auth.currentUser.email).subscribe((userCount) => {
          this.userCountData = userCount;
        });
        this.userSpecificBookCount.email = this.angularFireAuth.auth.currentUser.email;
        if (this.userCountData.length === 0) {
            this.userSpecificBookCount.userBookCount =  1;
            this.anytimeLibraryService.saveDetailsToUserTotalCount(this.userSpecificBookCount).subscribe((response) => {
              if (response) {
                this.assignToSelf(currentBook);
                this.storeKeyValue = this.returnUsersTotalCountOfBooks();
              }
            });
        } else if (this.userCountData.length > 0) {
          for (let i = 0; i < this.userCountData.length; i++) {
            if (this.userCountData[i].userBookCount > 1) {
              alert('You can take maximum of one books only');
              return;
            } else {
              this.assignToSelf(currentBook);
              if (this.storeKeyValue !== ' ' && this.storeKeyValue !== undefined) {
                this.afd.object('/usersTotalCountOfBooks/' + this.storeKeyValue).update({
                  userBookCount: this.userCountData[i].userBookCount + 1
                });
              }
            }
          }
        }
    }
  }

  returnUsersTotalCountOfBooks() {
    console.log('In returnUsersTotalCountOfBooks');
    this.anytimeLibraryService.fetchKeyValueByEmailFromCountOfBooks(this.angularFireAuth.auth.currentUser.email).subscribe((list) => {
      if (list.length > 0) {
        this.userCountKey = list[0].key;
        if (this.userCountKey !== ' ' && this.userCountKey !== undefined) {
          this.storeKeyValue = this.userCountKey;
        }
      }
    });
    return this.storeKeyValue;
  }

  returnBook(currentBook) {
    console.log('At return book');
    const x = confirm('Are you sure that you want to return the Book');
    if (x === true) {
      this.displayReview = true;
      this.bookToBeReturned =  currentBook.title;
      this.reviewOfCurrentUser.reviewBookISBN = currentBook.userISBN;
      this.returnedFromLocation = currentBook.location;
      this.updateMasterTableWhileReturningBook(currentBook);
    } else {
      this.displayReview = false;
    }
  }

  onRatingChange = ($event: RatingChangeEvent) => {
    this.onRatingChangeResult = $event;
    this.reviewOfCurrentUser.rating = $event;
  }

  likeButtonClick() {
    this.reviewOfCurrentUser.like = this.noOfLikes + 1;
  }

  disLikeButtonClick() {
    this.reviewOfCurrentUser.dislike = this.noOfDislikes + 1;
  }

  onAddFriends() {
    const control = new FormControl(null, Validators.required);
    (this.reviewBookForm.get('friends') as FormArray).push(control);
  }

  reviewForm() {
    console.log('At Review Form ');
    this.reviewFormClicked = false;
    this.reviewOfCurrentUser.comments = this.reviewBookForm.value.comments;
    this.displayReview = false;
    this.reviewBookForm.reset();
    this.afd.object('/usersTotalCountOfBooks/' + this.storeKeyValue).valueChanges().subscribe((userAvailedBooksCount) => {
      if (userAvailedBooksCount !== null) {
        this.decrementBookCount = userAvailedBooksCount[0].userBookCount;
        if (this.decrementBookCount === 2 && this.reviewFormClicked === false && this.decrementBookCount !== null) {
          this.reviewFormClicked = true;
          this.afd.object('/usersTotalCountOfBooks/' + this.storeKeyValue).update({
            userBookCount: 1
          });
        } else if (this.decrementBookCount === 1 && this.reviewFormClicked === false) {
          this.reviewFormClicked = true;
          this.storeKeyValue = ' ';
          this.totalBooks = 0;
          this.decrementBookCount = 0;
          this.anytimeLibraryService.deleteUsersTotalCountOfBooks();
        }
     }
    });

    this.anytimeLibraryService.fetchRecordByISBNOfUser(this.reviewOfCurrentUser.reviewBookISBN).subscribe((key) => {
      this.keyToDeleteUserRecord = key[0].key;
      if (this.reviewFormClicked === true) {
        this.anytimeLibraryService.deleteRecordOfUser(this.keyToDeleteUserRecord);
      }
    });
  }

  updateMasterTableWhileReturningBook(currentBook) {
    console.log('in updateMasterTableWhileReturningBook');
    this.updateMasterTableWhileReturningValue = true;
    this.bookDetailsByISBN = this.updateNoOfCopies(currentBook);
    this.anytimeLibraryService.fetchKeyValueByISBN(currentBook.userISBN).subscribe((list) => {
      this.obtainedKey = list[0].key;
      if (this.obtainedKey !== ' ' &&  this.obtainedKey !== undefined) {
        if (this.updateNoOfCopiesValue && this.updateMasterTableWhileReturningValue) {
          this.inUpdateMasterClicked = false;
          this.afd.object('/bookDetails/' + this.obtainedKey).update({
            noOfCopies: this.noOfCopiesToIncrement,
            availability: 'yes'
          });
        }
      }
    });
  }

  updateNoOfCopies(currentBook) {
    this.anytimeLibraryService.fetchRecordByISBN(currentBook.userISBN).subscribe((list) => {
      this.bookDetailsByISBN = list;
      this.updateNoOfCopiesValue = true;
      this.noOfCopiesToIncrement = this.bookDetailsByISBN[0].noOfCopies + 1;
    });
    return this.bookDetailsByISBN;
  }

  updateNoOfDaysElapsed() {
    console.log('updateNoOfDaysElapsed');
    this.anytimeLibraryService.fetchRecordOfLoggedInUserEmailAddress(this.angularFireAuth.auth.currentUser.email).subscribe((list) => {
      this.userBooksList = list;
      if (this.userBooksList.length > 0) {
        // for (let i = 0; i < this.userBooksList.length; i++) {
        for (const i of this.userBooksList) {
          const diffs = (Date.parse(formatDate(new Date(), 'yyyy-MM-dd', 'en-US', '')) - Date.parse(this.userBooksList[i].issuedDate));
          this.diffInDays = (diffs / 86400000);
          console.log('this.diffInDays', this.diffInDays);
          this.anytimeLibraryService.fetchRecordByISBNOfUser(this.userBooksList[i].userISBN).subscribe((keyList) => {
            if (keyList[0].key !== ' ' &&  keyList !== undefined && this.executeOnce === true && keyList[0].key !== null) {
              this.executeOnce = false;
              console.log('Updating diffIndays with executeOnce value', this.executeOnce);
              this.afd.object('/userDetails/' + keyList[0].key).update({
                noOfDaysElapsed: this.diffInDays
              });
            }
          });
        }
      }
    });
  }

  deleteFriend(index) {
    (this.reviewBookForm.get('friends') as FormArray).removeAt(index);
  }

}
