import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterBookComponent } from './filter-book.component';
import { MaterialModule } from 'src/app/material.module';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';

describe('FilterBookComponent', () => {
  let component: FilterBookComponent;
  let fixture: ComponentFixture<FilterBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBookComponent ],
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
    fixture = TestBed.createComponent(FilterBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service to be Invoked', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service).toBeTruthy();
  }));

  it('Invokes the filter book by genre', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service.fetchBookDetails()).toBeTruthy();
  }));

  it('apply filter should be called on key up event', () => {
    spyOn(component, 'applyFilter');
    const input = fixture.debugElement.query(By.css('#searchByGenre'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    expect(component.applyFilter).toHaveBeenCalled();
  });

});
