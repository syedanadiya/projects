import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ViewBookDetailsComponent } from './view-book-details.component';
import { MaterialModule } from 'src/app/material.module';
import { StarRatingModule } from 'angular-star-rating';
import { AnytimeLibraryService } from 'src/app/anytime-library.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

describe('ViewBookDetailsComponent', () => {
  let component: ViewBookDetailsComponent;
  let fixture: ComponentFixture<ViewBookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBookDetailsComponent ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        StarRatingModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AnytimeLibraryService, AngularFireAuth]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
