import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AnytimeLibraryService } from '../anytime-library.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  getUID: string;
  fetchedUserProfileData: any = [];
  showOnlyAdmin = false;
  showOnlyUser = false;
  loggedInUserEmail: string;
  constructor(public auth: AuthService, public angularFireAuth: AngularFireAuth,
              private anytimeLibraryService: AnytimeLibraryService, public router: Router) { }

  ngOnInit() {
    console.log('ngOnInit header ',
    this.auth.uid.subscribe((value) => {
      console.log(value);
      this.getUID = value;
    }));

    this.auth.emailId.subscribe((email) => {
      console.log('Email address fetched ', email);
      this.loggedInUserEmail = email;
      if (this.loggedInUserEmail !== null) {
        console.log('current Route', this.router.url);
        this.anytimeLibraryService.fetchUserProfileDetails(this.loggedInUserEmail).subscribe((listofSignedUpUser) => {
              console.log(listofSignedUpUser);
              this.showOnlyAdmin = false;
              this.showOnlyUser = false;
              this.fetchedUserProfileData = listofSignedUpUser;
              if (this.fetchedUserProfileData.length > 0) {
                console.log('User exists at database');
                if (this.fetchedUserProfileData[0].role === 'Admin') {
                this.showOnlyAdmin = true;
                } else {
                  this.showOnlyUser = true;
                }
              } else {
                console.log('User doesnt exist at database');
                this.showOnlyUser = true;
                this.router.navigate(['user-role']);
              }
        });
      } else if (this.loggedInUserEmail === null) {
          this.showOnlyAdmin = false;
          this.showOnlyUser = false;
      }
    });
  }
}
