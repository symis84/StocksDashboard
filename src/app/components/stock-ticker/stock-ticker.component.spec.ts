import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { StockTickerComponent } from './stock-ticker.component';
import { RefreshDataButtonComponent } from '../refresh-data-button/refresh-data-button.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

describe('StockTickerComponent', () => {
  let component: StockTickerComponent;
  let fixture: ComponentFixture<StockTickerComponent>;
  let downloadService: DownloadService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockTickerComponent, RefreshDataButtonComponent, AppComponent, DashboardComponent],
      imports: [ BrowserModule, AppRoutingModule,
        HttpClientModule],
      providers: [DownloadService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(StockTickerComponent);
    component = fixture.componentInstance;
    component.stocksList = '["EUR:USD","USD:CHF","USD:JPY"]';
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('on ngOnInit the component will create a proper stockQuoteArr obj based on input stocksList', async(() => {

    const result = {
      code: 'EUR:USD',
      value: 'N/A'
    }

    fixture.detectChanges();
    expect(component.stockQuoteArr[0]).toEqual(result);
  }));

  it('on startDataSubscription function the component will update stockQuoteArr obj with the new data', async(() => {

    const mockResponse = [{
      code: 'EUR:USD',
      value: '111.11'
    }];
    spyOn(component.download, 'getData').and.returnValue(
      {
        skip: () => {
          return {
            filter: () => {
              return {
                subscribe: (cb) => {
                  cb(mockResponse);
                }
              }
            }
          }
        }
      }
    );

    const result = {
      code: 'EUR:USD',
      value: '111.11'
    }

    component.startDataSubscription();
    fixture.detectChanges();
    expect(component.stockQuoteArr[0]).toEqual(result);
  }));
});
