import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AddBookComponent } from './admin-role/add-book/add-book.component';
import { EditBookComponent } from './admin-role/edit-book/edit-book.component';
import { AddBookIsbnComponent } from './admin-role/ISBN/add-book-isbn/add-book-isbn.component';
import { RetrieveBookIsbnComponent } from './admin-role/ISBN/retrieve-book-isbn/retrieve-book-isbn.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { FetchBookDetailsUserComponent } from './admin-role/fetch-book-details-user/fetch-book-details-user.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchBookComponent } from './user-role/search-book/search-book.component';
import { FilterBookComponent } from './user-role/filter-book/filter-book.component';
import { ViewBookDetailsComponent } from './user-role/view-book-details/view-book-details.component';
import { FavoriteGenresComponent } from './favorite-genres/favorite-genres.component';
import { ViewProfileComponent } from './user-role/view-profile/view-profile.component';
import { AuthGuardService } from './auth.guard.service';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {path: 'admin-role', component: AdminRoleComponent, canActivate: [AuthGuardService]},
  {path: 'admin-role/add-book', component: AddBookComponent, canActivate: [AuthGuardService]},
  {path: 'admin-role/edit-book', component: EditBookComponent, canActivate: [AuthGuardService]},
  {path: 'admin-role/add-book-isbn', component: AddBookIsbnComponent, canActivate: [AuthGuardService]},
  {path: 'admin-role/retrieve-book-isbn', component: RetrieveBookIsbnComponent, canActivate: [AuthGuardService]},
  {path: 'admin-role/fetch-book-details-user', component: FetchBookDetailsUserComponent, canActivate: [AuthGuardService]},
  {path: 'user-role', component: UserRoleComponent, canActivate: [AuthGuardService]},
  {path: 'user-role/search-book', component: SearchBookComponent, canActivate: [AuthGuardService]},
  {path: 'user-role/filter-book', component: FilterBookComponent, canActivate: [AuthGuardService]},
  {path: 'user-role/book-details', component: ViewBookDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'user-role/favorite-genre', component: FavoriteGenresComponent, canActivate: [AuthGuardService]},
  {path: 'user-role/view-profile', component: ViewProfileComponent, canActivate: [AuthGuardService]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
