
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AnytimeLibraryService } from './anytime-library.service';
import { AddBookComponent } from './admin-role/add-book/add-book.component';
import { EditBookComponent } from './admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from './admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from './admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FetchBookDetailsUserComponent } from './admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchBookComponent } from './user-role/search-book/search-book.component';
import { FilterBookComponent } from './user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from './user-role/view-book-details/view-book-details.component';
import { StarRatingModule } from 'angular-star-rating';
import { FavoriteGenresComponent } from './favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from './user-role/view-profile/view-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    UserRoleComponent,
    AdminRoleComponent,
    AddBookComponent,
    EditBookComponent,
    AddBookIsbnComponent,
    RetrieveBookIsbnComponent,
    HeaderComponent,
    FetchBookDetailsUserComponent,
    SignInComponent,
    SignUpComponent,
    SearchBookComponent,
    FilterBookComponent,
    ViewBookDetailsComponent,
    FavoriteGenresComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    StarRatingModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production})
  ],
  providers: [AnytimeLibraryService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
