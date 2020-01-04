import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddBookIsbnComponent } from './add-book-isbn.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

describe('AddBookIsbnComponent', () => {
  let component: AddBookIsbnComponent;
  let fixture: ComponentFixture<AddBookIsbnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookIsbnComponent ],
      imports: [
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AnytimeLibraryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookIsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls for add book by ISBN', () => {
    expect(component.addBookForm instanceof FormGroup).toBe(true);
  });

  it('should return false if the form Add book by ISBN is Invalid', () => {
    expect(component.addBookForm.valid).toBeFalsy();
  });

  it('Service to be called to persist the data', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service).toBeTruthy();
  }));

});
