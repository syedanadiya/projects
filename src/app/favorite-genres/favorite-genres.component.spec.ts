import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { FavoriteGenresComponent } from './favorite-genres.component';
import { MaterialModule } from '../material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AnytimeLibraryService } from '../anytime-library.service';
import { environment } from 'src/environments/environment';

describe('FavoriteGenresComponent', () => {
  let component: FavoriteGenresComponent;
  let fixture: ComponentFixture<FavoriteGenresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteGenresComponent ],
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
      ],
      providers: [{provide : HttpClient}, AnytimeLibraryService, AngularFireDatabase]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service to be Invoked', inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service).toBeTruthy();
  }));

  it('Service to be Invoked to fetch initial list of genres if present',
    inject([AnytimeLibraryService], (service: AnytimeLibraryService) => {
    expect(service.fetchBookDetails()).toBeTruthy();
  }));

});
