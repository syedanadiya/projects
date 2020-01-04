import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AnytimeLibraryService } from '../anytime-library.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header.component';
import { AdminRoleComponent } from '../admin-role/admin-role.component';
import { AddBookComponent } from '../admin-role/add-book/add-book.component';
import { EditBookComponent } from '../admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from '../admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from '../admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { FetchBookDetailsUserComponent } from '../admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { UserRoleComponent } from '../user-role/user-role.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SearchBookComponent } from '../user-role/search-book/search-book.component';
import { FilterBookComponent } from '../user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from '../user-role/view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from '../favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from '../user-role/view-profile/view-profile.component';
import { StarRatingComponent } from 'angular-star-rating';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        AdminRoleComponent,
        AddBookComponent,
        EditBookComponent,
        AddBookIsbnComponent,
        RetrieveBookIsbnComponent,
        FetchBookDetailsUserComponent,
        UserRoleComponent,
        RetrieveBookIsbnComponent,
        FetchBookDetailsUserComponent,
        SignInComponent,
        SignUpComponent,
        SearchBookComponent,
        FilterBookComponent,
        ViewBookDetailsComponent,
        FavoriteGenresComponent,
        ViewProfileComponent,
        StarRatingComponent  ],
        imports: [
          FormsModule,
          ReactiveFormsModule,
          RouterModule,
          AppRoutingModule,
          MaterialModule,
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFireDatabaseModule
        ],
        providers: [{provide : HttpClient}, AuthService, AnytimeLibraryService, AngularFireAuth]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Auth service to be Invoked', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('get UID value if logged in with Google', inject([AuthService], (service: AuthService) => {
    component.getUID = 'xsqwr456_outygsash';
    expect(component.getUID).toBeTruthy();
  }));

  it('get UID value to be null if not logged in with Google', inject([AuthService], (service: AuthService) => {
    component.getUID = null;
    expect(component.getUID).toBeNull();
  }));
});
