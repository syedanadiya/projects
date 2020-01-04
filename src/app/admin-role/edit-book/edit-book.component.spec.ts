import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EditBookComponent } from './edit-book.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
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
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls as defined', () => {
    component.ngOnInit();
    expect(component.signupForm instanceof FormGroup).toBe(true);
  });

  it('should return false if the Edit form is Invalid', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('On edit form click, populate the current book data', () => {
    expect(component.populateData).toBeTruthy();
  });

});
