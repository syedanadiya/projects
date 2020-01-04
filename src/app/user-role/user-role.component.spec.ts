import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserRoleComponent } from './user-role.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminRoleComponent } from '../admin-role/admin-role.component';
import { AddBookComponent } from '../admin-role/add-book/add-book.component';
import { AddBookIsbnComponent } from '../admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { EditBookComponent } from '../admin-role/edit-book/edit-book.component';
import { RetrieveBookIsbnComponent } from '../admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from '../admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { FilterBookComponent } from './filter-book/filter-book.component';
import { ViewBookDetailsComponent } from './view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from '../favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { StarRatingModule } from 'angular-star-rating';

describe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserRoleComponent,
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
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to Search Book by Author/Title on click of Search Book by Author/Title link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateSearchBookTitle = elementArray[0].nativeElement.getAttribute('routerLink');
    expect(navigateSearchBookTitle).toEqual('search-book');
  });

  it('should navigate to Filter Book by Book Genre/Category on click of Filter Book by Book Genre/Category link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateFilterByGenre = elementArray[1].nativeElement.getAttribute('routerLink');
    expect(navigateFilterByGenre).toEqual('filter-book');
  });

  it('should navigate to View Book Details on click of View Book Details link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateViewBookDetails = elementArray[2].nativeElement.getAttribute('routerLink');
    expect(navigateViewBookDetails).toEqual('book-details');
  });

  it('should navigate to Favorite Genre on click of Favorite Genre link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateFavoriteGenre = elementArray[3].nativeElement.getAttribute('routerLink');
    expect(navigateFavoriteGenre).toEqual('favorite-genre');
  });

  it('should navigate to View Profile on click of View Profile link', () => {
    const elementArray = fixture.debugElement.queryAll(By.css('a'));
    const navigateViewProfile = elementArray[4].nativeElement.getAttribute('routerLink');
    expect(navigateViewProfile).toEqual('view-profile');
  });

});
