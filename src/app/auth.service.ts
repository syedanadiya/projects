
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { of as observableOf} from 'rxjs';
import { map } from 'rxjs/operators';
import { AnytimeLibraryService } from './anytime-library.service';


@Injectable()
export class AuthService {

  setUID: string;
  onSignUp = false;
  fetchedUserProfileData: any = [];
  uid = this.angularFireAuth.authState.pipe(map(authState => {
      if (!authState) {
        return null;
      } else {
        if (this.onSignUp) {
          return null;
        } else {
          console.log('UID');
          this.setUID = authState.uid;
          return authState.uid;
        }
      }
    })
  );

  successfullLogin = this.angularFireAuth.authState.pipe(map(authState => {
      if (!authState) {
        return false;
      } else {
        console.log('returning boolean to true once loggedIn', authState.uid);
        if (this.onSignUp) {
          return null;
        } else {
          console.log('successfullLogin');
          this.setUID = authState.uid;
          return true;
        }
      }
    })
  );

  emailId = this.angularFireAuth.authState.pipe(map(authState => {
      if (!authState) {
        return null;
      } else {
        if (this.onSignUp) {
          return null;
        } else {
          console.log('fetching email id after login');
          return this.angularFireAuth.auth.currentUser.email;
        }
      }
    })
  );

  isAdmin = observableOf(true);

  constructor(private angularFireAuth: AngularFireAuth, public router: Router, private anytimeLibraryService: AnytimeLibraryService) {}

  signUp(email: string, password: string, userProfileData: any) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(value => {
      console.log('Success', value);
      this.onSignUp = true;
      this.anytimeLibraryService.saveUserProfileDetails(userProfileData).subscribe((response) => {
          if (response) {
            alert('Profile data saved successfully');
          }
      },
        (error) => {
          alert(error.text);
        }
      );
      this.router.navigate(['sign-in']);
    }).catch( err => {
      alert('Something went wrong:' + err.message);
    });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      this.onSignUp = false;
      console.log('Success', value);
      this.anytimeLibraryService.fetchUserProfileDetails(email).subscribe((listofSignedUpUser) => {
        console.log(listofSignedUpUser);
        this.fetchedUserProfileData = listofSignedUpUser;
        if (this.fetchedUserProfileData[0].role === 'Admin') {
          this.router.navigate(['admin-role']);
        } else {
          this.router.navigate(['user-role']);
        }
      });
    }).catch(err => {
      alert('Something went wrong' + err.message);
      this.router.navigate(['sign-up']);
    });
  }

  loginWithGoogle() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider ()).then(value => {
      console.log('Success', value);
      this.router.navigate(['user-role']);
    }).catch(err => {
      alert('Something went wrong' + err.message);
      this.router.navigate(['sign-up']);
    });
  }

  logout() {
    console.log('successfully logged out');
    this.angularFireAuth.auth.signOut();
  }
}
