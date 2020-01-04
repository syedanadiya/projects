import { Component, OnInit } from '@angular/core';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  userProfileData: any = [];
  loggedInByGoogle = false;
  userData: string;
  loggedInUser: string;

  constructor(private anytimeLibraryService: AnytimeLibraryService, private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.loggedInUser = this.angularFireAuth.auth.currentUser.email;
    if (this.loggedInUser !== null) {
      this.loggedInUser = this.angularFireAuth.auth.currentUser.email;
      this.anytimeLibraryService.fetchUserProfileDetails(this.loggedInUser).subscribe((detailsList) => {
        if (detailsList.length > 0) {
          this.loggedInByGoogle = false;
          this.userProfileData = detailsList;
          console.log('the userprofile is', this.userProfileData);
        } else {
          this.loggedInByGoogle = true;
          this.userData = 'You have logged in with google with Email Address: ' + this.angularFireAuth.auth.currentUser.email;
        }
      });
    }
  }

}
