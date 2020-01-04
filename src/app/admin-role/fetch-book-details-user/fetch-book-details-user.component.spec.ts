import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { FetchBookDetailsUserComponent } from './fetch-book-details-user.component';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { MaterialModule } from 'src/app/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';

describe('FetchBookDetailsUserComponent', () => {
  let component: FetchBookDetailsUserComponent;
  let fixture: ComponentFixture<FetchBookDetailsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchBookDetailsUserComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AnytimeLibraryService]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchBookDetailsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service to be Invoked', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service).toBeTruthy();
  }));

  it('Invokes the service to load all the users data at component render',
      inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service.fetchAllUsersBookDetailsRecords()).toBeTruthy();
  }));

  it('apply filter should be called on key up event', () => {
    spyOn(component, 'applyFilter');
    const input = fixture.debugElement.query(By.css('#searchContent'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

});


