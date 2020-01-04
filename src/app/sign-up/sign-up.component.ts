import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;
  message: string;
  imagePath: string;
  imgURL: any;
  userSignUpData: any;
  selectedRoles: string;
  roles: string[] = ['Admin', 'User'];

  constructor(private auth: AuthService, private formBuilder: FormBuilder) { }

  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z\s .]*')]],
      profilePic: ['', Validators.required],
      friends : new FormArray([], Validators.required),
      socialIds : new FormArray([], Validators.required)
    });

    this.userSignUpData = {
          id: this.generateId(),
          email: '',
          password: '',
          role: '',
          username: '',
          profilePic: '',
          socialIds: '',
          friends: '',
    };
  }

  preview(files) {
    if (files.length === 0) {
        return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
        this.imgURL = reader.result;
    };
    this.message = ' ';
  }

  get f() {
      return this.signUpForm.controls;
  }

  onAddSocialIds() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('socialIds') as FormArray).push(control);
  }

  deleteSocialId(index: number) {
    (this.signUpForm.get('socialIds') as FormArray).removeAt(index);
  }

  onAddFriends() {
    const control = new FormControl(null, Validators.required);
    (this.signUpForm.get('friends') as FormArray).push(control);
  }

  deleteFriend(index: number) {
    (this.signUpForm.get('friends') as FormArray).removeAt(index);
  }

  get formData() {
    return this.signUpForm.get('friends') as FormArray;
  }

  get formDataForSocialIds() {
    return this.signUpForm.get('socialIds') as FormArray;
  }

  signUp() {
    console.log(this.signUpForm);
    this.submitted = true;
    if (this.signUpForm.invalid) {
        return;
      } else if (this.signUpForm.valid) {
        this.userSignUpData.email = this.signUpForm.value.email;
        this.userSignUpData.password = this.signUpForm.value.password;
        this.userSignUpData.role = this.signUpForm.value.role;
        this.userSignUpData.username = this.signUpForm.value.username;
        this.userSignUpData.profilePic = this.imgURL;
        this.userSignUpData.friends = this.signUpForm.value.friends;
        this.userSignUpData.socialIds = this.signUpForm.value.socialIds;
        console.log(this.userSignUpData);
        this.auth.signUp(this.signUpForm.value.email, this.signUpForm.value.password, this.userSignUpData);
      }
  }
}
