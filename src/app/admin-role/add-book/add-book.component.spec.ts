import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AddBookComponent } from './add-book.component';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookComponent ],
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
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    expect(component.addBookForm instanceof FormGroup).toBe(true);
  });

  it('should return false if the Add form is Invalid', () => {
    expect(component.addBookForm.valid).toBeFalsy();
  });

});
