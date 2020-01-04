import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  bookData = {
    author: '',
    title: '',
    genre: '',
    file: '',
    ISBN: '',
    description: '',
    availability: '',
    noOfCopies: '',
    location: ''
  };

  imageUrl: any;
  keyValue: string;
  fetchedData = [];
  signupForm: FormGroup;
  displayForm = false;
  imagePath: string;
  message: string;
  selectedDate: '';
  showUploadThumbnail = true;
  submitted = false;
  showError = true;
  imageSelected = true;
  dataModified: string;

  constructor(private anytimeLibraryService: AnytimeLibraryService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      title: ['', Validators.required],
      genre: ['', Validators.required],
      file: [''],
      isbn: ['', [Validators.required, Validators.pattern('([0-9 -]){2,}')]],
      description: ['', Validators.required],
      availability: ['Please Select', Validators.required],
      noOfCopies: ['', [Validators.required, Validators.pattern('([0-9]){1,}')]],
      location: ['', Validators.required]
    });

    this.anytimeLibraryService.fetchBookDetails().subscribe((list) => {
      this.fetchedData = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  populateData(bookData) {
    this.displayForm = true;
    this.message = ' ';
    this.imageSelected = true;
    this.signupForm.setValue({
      author : bookData.author,
      title : bookData.title,
      genre : bookData.genre,
      file : '',
      isbn : bookData.ISBN,
      description : bookData.description,
      availability : bookData.availability,
      noOfCopies: bookData.noOfCopies,
      location : bookData.location
    });
    this.imageUrl = bookData.file;
    this.keyValue = bookData.$key;
    this.showUploadThumbnail = true;
  }

  validateISBN() {
    this.anytimeLibraryService.fetchRecordByISBN(this.signupForm.value.isbn).subscribe(response => {
      console.log(response);
      if (response.length > 0) {
          this.showError = false;
      } else {
          this.showError = true;
      }
    });
  }

  preview(files) {
    if (files.length === 0) {
        return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        this.imageUrl = ' ';
        return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event: ProgressEvent) => {
        this.imageUrl = reader.result;
        this.imageSelected = true;
    };
    this.message = ' ';
  }

  editThumbnail() {
    this.showUploadThumbnail = false;
    this.imageUrl = ' ';
  }

  editForm() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    } else if (this.signupForm.valid) {
      if (this.imageUrl === ' ' && this.message === ' ') {
        this.imageSelected = false;
      } else if (this.imageUrl === ' ' && this.message !== ' ') {
      } else {
        console.log('Form completely valid');
        this.bookData.author = this.signupForm.value.author,
        this.bookData.title = this.signupForm.value.title,
        this.bookData.genre = this.signupForm.value.genre,
        this.bookData.file = this.imageUrl,
        this.bookData.ISBN = this.signupForm.value.isbn,
        this.bookData.description = this.signupForm.value.description,
        this.bookData.availability = this.signupForm.value.availability,
        this.bookData.noOfCopies = this.signupForm.value.noOfCopies,
        this.bookData.location = this.signupForm.value.location;
        this.anytimeLibraryService.updateBookDetails(this.keyValue, this.bookData).then(() => {
          this.dataModified = 'Data is updated successfully';
          alert(this.dataModified);
        });
      }
    }
  }
  deleteRecord(key) {
    if (confirm('Are you sure you want to delete this record')) {
      this.anytimeLibraryService.deleteRecord(key);
    }
  }
}

