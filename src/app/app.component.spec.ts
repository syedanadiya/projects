import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AnytimeLibraryService } from './anytime-library.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AddBookComponent } from './admin-role/add-book/add-book.component';
import { EditBookComponent } from './admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from './admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from './admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from './admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchBookComponent } from './user-role/search-book/search-book.component';
import { FilterBookComponent } from './user-role/filter-book/filter-book.component';
import { FavoriteGenresComponent } from './favorite-genres/favorite-genres.component';
import { ViewBookDetailsComponent } from './user-role/view-book-details/view-book-details.component';
import { ViewProfileComponent } from './user-role/view-profile/view-profile.component';
import { StarRatingComponent } from 'angular-star-rating';


describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        AdminRoleComponent,
        AddBookComponent,
        EditBookComponent,
        AddBookIsbnComponent,
        RetrieveBookIsbnComponent,
        UserRoleComponent,
        FetchBookDetailsUserComponent,
        SignInComponent,
        SignUpComponent,
        SearchBookComponent,
        FilterBookComponent,
        ViewBookDetailsComponent,
        FavoriteGenresComponent,
        ViewProfileComponent,
        StarRatingComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterModule,
        FormsModule,
        AppRoutingModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AuthService, AngularFireAuth, AnytimeLibraryService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'any-time-library'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('any-time-library');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to any-time-library!');
  // });
});
