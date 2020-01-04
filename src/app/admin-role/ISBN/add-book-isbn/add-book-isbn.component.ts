import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

@Component({
  selector: 'app-add-book-isbn',
  templateUrl: './add-book-isbn.component.html',
  styleUrls: ['./add-book-isbn.component.scss']
})
export class AddBookIsbnComponent implements OnInit {

    addBookForm: FormGroup;
    submitted = false;
    imagePath: string;
    imgUrl: any;
    message: string;
    bookData: any;
    showError = true;

    constructor(private anytimeLibraryService: AnytimeLibraryService, private formBuilder: FormBuilder) {}

    private generateId() {
        return Math.round(Math.random() * 10000);
    }

    ngOnInit() {
      this.bookData = {
          id: this.generateId(),
          author: '',
          title: '',
          genre: '',
          file: '',
          ISBN: '',
          description: '',
          availability: '',
          noOfCopies: Number,
          location: ''
      };

      this.addBookForm = this.formBuilder.group({
          author: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          title: ['', Validators.required],
          genre: ['', Validators.required],
          file: ['', Validators.required],
          isbn: ['', [Validators.required, Validators.pattern('([0-9 -]){2,}')]],
          description: ['', Validators.required],
          availability: ['Please Select', Validators.required],
          noOfCopies: ['', [Validators.required, Validators.pattern('([0-9]){1,}')]],
          location: ['', Validators.required]
      });
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
      reader.onload = (event: ProgressEvent) => {
          this.imgUrl = reader.result;
      };
      this.message = ' ';
    }

    validateISBN() {
      this.anytimeLibraryService.fetchRecordByISBN(this.addBookForm.value.isbn).subscribe(response => {
        console.log(response);
        if (response.length > 0) {
            this.showError = false;
        } else {
            this.showError = true;
        }
      });
    }

    get f() {
      return this.addBookForm.controls;
    }

    onSubmit() {
      this.submitted = true;
      if (this.addBookForm.invalid) {
        return;
      } else if (this.addBookForm.valid) {
        if (this.addBookForm.value.availability === 'Please Select' || this.message !== ' ') {
        } else {
          this.bookData.author = this.addBookForm.value.author;
          this.bookData.author = this.addBookForm.value.author;
          this.bookData.title = this.addBookForm.value.title;
          this.bookData.genre = this.addBookForm.value.genre;
          this.bookData.file = this.imgUrl;
          this.bookData.ISBN = this.addBookForm.value.isbn;
          this.bookData.description = this.addBookForm.value.description;
          this.bookData.availability = this.addBookForm.value.availability;
          this.bookData.noOfCopies = this.addBookForm.value.noOfCopies;
          this.bookData.location = this.addBookForm.value.location;
          this.anytimeLibraryService.saveBookDetails(this.bookData).subscribe(
            (response) => {
              if (response) {
                alert('Data saved successfully');
              }
            },
            (error) => {
              alert('Data could not be saved');
            }
          );
        }
      }
    }
}



