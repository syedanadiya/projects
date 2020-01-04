import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AnytimeLibraryService } from '../anytime-library.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppRoutingModule } from '../app-routing.module';
import { SignUpComponent } from './sign-up.component';
import { AdminRoleComponent } from '../admin-role/admin-role.component';
import { AddBookComponent } from '../admin-role/add-book/add-book.component';
import { EditBookComponent } from '../admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from '../admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from '../admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from '../admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { SearchBookComponent } from '../user-role/search-book/search-book.component';
import { FilterBookComponent } from '../user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from '../user-role/view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from '../favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from '../user-role/view-profile/view-profile.component';
import { StarRatingComponent } from 'angular-star-rating';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from '../header/header.component';
import { SignInComponent } from '../sign-in/sign-in.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminRoleComponent,
        AddBookComponent,
        EditBookComponent,
        AddBookIsbnComponent,
        RetrieveBookIsbnComponent,
        FavoriteGenresComponent,
        HeaderComponent,
        SignInComponent,
        SignUpComponent,
        UserRoleComponent,
        FetchBookDetailsUserComponent,
        SearchBookComponent,
        FilterBookComponent,
        ViewBookDetailsComponent,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls for Sign Up form', () => {
    expect(component.signUpForm instanceof FormGroup).toBe(true);
  });

  it('should return false if the SignUp form is Invalid', () => {
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('Service to be Invoked', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('Invoke createUserWithEmailAndPassword method of firebase', () => {
    expect(component.signUp).toBeTruthy();
  });

});
