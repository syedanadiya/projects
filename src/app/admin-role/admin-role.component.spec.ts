import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { AdminRoleComponent } from './admin-role.component';
import { AppRoutingModule } from '../app-routing.module';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookIsbnComponent } from './ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from './ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from './fetch-book-details-user/fetch-book-details-user.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { SearchBookComponent } from '../user-role/search-book/search-book.component';
import { FilterBookComponent } from '../user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from '../user-role/view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from '../favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from '../user-role/view-profile/view-profile.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { MaterialModule } from '../material.module';
import { StarRatingModule } from 'angular-star-rating';

describe('AdminRoleComponent', () => {
  let component: AdminRoleComponent;
  let fixture: ComponentFixture<AdminRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRoleComponent,
        AddBookComponent,
        EditBookComponent,
        AddBookIsbnComponent,
        RetrieveBookIsbnComponent,
        FetchBookDetailsUserComponent,
        UserRoleComponent,
        SearchBookComponent,
        FilterBookComponent,
        ViewBookDetailsComponent,
        FavoriteGenresComponent,
        ViewProfileComponent,
        SignInComponent,
        SignUpComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        MaterialModule,
        StarRatingModule.forRoot()
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Add book on click of Add Book link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateAddBook = elementArray[0].nativeElement.getAttribute('routerLink');
    expect(navigateAddBook).toEqual('add-book');
  });

  it('should navigate to Edit book on click of Edit Book link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateEditBook = elementArray[1].nativeElement.getAttribute('routerLink');
    expect(navigateEditBook).toEqual('edit-book');
  });

  it('should navigate to Add book by ISBN on click of Add Book by ISBN link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateAddBookByISBN = elementArray[2].nativeElement.getAttribute('routerLink');
    expect(navigateAddBookByISBN).toEqual('add-book-isbn');
  });

  it('should navigate to Retrieve Book by ISBN on click of Retrieve Book by ISBN link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateFetchBookByISBN = elementArray[3].nativeElement.getAttribute('routerLink');
    expect(navigateFetchBookByISBN).toEqual('retrieve-book-isbn');
  });

  it('should navigate to Display list of Users Books on click of Display list of Users Books link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateFetchBookDetails = elementArray[4].nativeElement.getAttribute('routerLink');
    expect(navigateFetchBookDetails).toEqual('fetch-book-details-user');
  });

});
