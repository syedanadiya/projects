import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBookComponent } from './search-book.component';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { MaterialModule } from 'src/app/material.module';
import { By } from '@angular/platform-browser';

describe('SearchBookComponent', () => {
  let component: SearchBookComponent;
  let fixture: ComponentFixture<SearchBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBookComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AnytimeLibraryService, AngularFireDatabase]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service to be Invoked', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service).toBeTruthy();
  }));

  it('Invokes the service to fetch book details on search', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service.fetchBookDetails()).toBeTruthy();
  }));

  it('apply filter should be called on key up event', () => {
    spyOn(component, 'applyFilter');
    const input = fixture.debugElement.query(By.css('#searchByAuthorTitle'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

});
