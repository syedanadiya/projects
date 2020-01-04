import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AnytimeLibraryService } from '../anytime-library.service';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppRoutingModule } from '../app-routing.module';
import { SignInComponent } from './sign-in.component';
import { AdminRoleComponent } from '../admin-role/admin-role.component';
import { AddBookComponent } from '../admin-role/add-book/add-book.component';
import { EditBookComponent } from '../admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from '../admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from '../admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from '../admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchBookComponent } from '../user-role/search-book/search-book.component';
import { FilterBookComponent } from '../user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from '../user-role/view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from '../favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from '../user-role/view-profile/view-profile.component';
import { StarRatingComponent } from 'angular-star-rating';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from '../header/header.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

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
        UserRoleComponent,
        RetrieveBookIsbnComponent,
        FetchBookDetailsUserComponent,
        SignUpComponent,
        SearchBookComponent,
        FilterBookComponent,
        ViewBookDetailsComponent,
        ViewProfileComponent,
        StarRatingComponent
      ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterModule,
          AppRoutingModule,
          MaterialModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireDatabaseModule],
          providers: [{provide : HttpClient}, AuthService, AngularFireAuth, AnytimeLibraryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service to be Invoked', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('Invoke signInWithEmailAndPassword method of firebase', () => {
    expect(component.signIn).toBeTruthy();
  });

});
