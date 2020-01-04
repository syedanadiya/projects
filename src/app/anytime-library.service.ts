import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';


@Injectable()
export class AnytimeLibraryService {

    constructor(private http: HttpClient, private firebase: AngularFireDatabase) {}
    bookDetails: AngularFireList<any>;
    filteredListForUser: AngularFireList<any>;
    userBookDetails: AngularFireList<any>;
    userBookDetailsfromISBN: AngularFireList<any>;
    userDetails: AngularFireList<any>;
    keyValueFromISBN: AngularFireList<any>;
    genresList: AngularFireList<any>;
    fetchAllUsersBookDetails: AngularFireList<any>;
    userProfile: AngularFireList<any>;
    userProfileDetails: AngularFireList<any>;
    usersTotalCount: AngularFireList<any>;
    fetchDataOfUsersTotalCount: AngularFireList<any>;

    saveBookDetails(bookData: any) {
        return this.http.post('https://anytime-library-2f37c.firebaseio.com/bookDetails.json', bookData);
    }

    fetchBookDetails() {
      this.bookDetails = this.firebase.list('bookDetails');
      return this.bookDetails.snapshotChanges();
    }

    updateBookDetails(key, bookData: any) {
       return this.bookDetails.update(key, bookData);
    }

    deleteRecord(key: string) {
        return this.bookDetails.remove(key);
    }

    fetchRecordByISBN(ISBN) {
      this.bookDetails = this.firebase.list('bookDetails', ref => ref.orderByChild('ISBN').equalTo(ISBN));
      return this.bookDetails.valueChanges();
    }

    saveBookDetailsOfUser(bookData) {
      return this.http.post('https://anytime-library-2f37c.firebaseio.com/userDetails.json', bookData);
    }

    fetchRecordOfLoggedInUserEmailAddress(email: string) {
      this.filteredListForUser = this.firebase.list('userDetails', ref => ref.orderByChild('username').equalTo(email));
      return this.filteredListForUser.valueChanges();
    }

    fetchKeyValueByISBN(ISBN) {
      this.keyValueFromISBN = this.firebase.list('bookDetails', ref => ref.orderByChild('ISBN').equalTo(ISBN));
      return this.keyValueFromISBN.snapshotChanges();
    }

    fetchRecordByISBNOfUser(ISBN) {
      this.userBookDetailsfromISBN = this.firebase.list('userDetails', ref => ref.orderByChild('userISBN').equalTo(ISBN));
      return this.userBookDetailsfromISBN.snapshotChanges();
    }

    fetchRecordByEmailAddressOfUser(email: string) {
      this.userBookDetailsfromISBN = this.firebase.list('userDetails', ref => ref.orderByChild('username').equalTo(email));
      return this.userBookDetailsfromISBN.snapshotChanges();
    }

    getBooksBasedOnGenre(genre: string) {
      this.genresList = this.firebase.list('bookDetails', ref => ref.orderByChild('genre').equalTo(genre));
      return this.genresList.valueChanges();
    }

    fetchAllUsersBookDetailsRecords() {
      this.fetchAllUsersBookDetails = this.firebase.list('userDetails');
      return this.fetchAllUsersBookDetails.snapshotChanges();
    }

    deleteRecordOfUser(key: string) {
      return this.filteredListForUser.remove(key);
    }

    saveUserProfileDetails(userProfile: any) {
        return this.http.post('https://anytime-library-2f37c.firebaseio.com/userProfileDetails.json', userProfile);
    }

    fetchUserProfileDetails(email: string) {
       this.userProfileDetails = this.firebase.list('userProfileDetails', ref => ref.orderByChild('email').equalTo(email));
       return this.userProfileDetails.valueChanges();
    }

    saveDetailsToUserTotalCount(usersTotalCountOfBooks: any) {
      return this.http.post('https://anytime-library-2f37c.firebaseio.com/usersTotalCountOfBooks.json', usersTotalCountOfBooks);
    }

    fetchTotalBookCountOfUser(email: string) {
      this.usersTotalCount = this.firebase.list('usersTotalCountOfBooks', ref => ref.orderByChild('email').equalTo(email));
      return this.usersTotalCount.valueChanges();
    }

    fetchKeyValueByEmailFromCountOfBooks(email: string) {
      this.fetchDataOfUsersTotalCount = this.firebase.list('usersTotalCountOfBooks', ref => ref.orderByChild('email').equalTo(email));
      return this.fetchDataOfUsersTotalCount.snapshotChanges();
    }

    deleteUsersTotalCountOfBooks() {
      return this.fetchDataOfUsersTotalCount.remove();
    }
}


