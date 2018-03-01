import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from './download.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { StockTickerComponent } from '../components/stock-ticker/stock-ticker.component';
import { RefreshDataButtonComponent } from '../components/refresh-data-button/refresh-data-button.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { fakeAsync } from '@angular/core/testing';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockTickerComponent, RefreshDataButtonComponent, AppComponent, DashboardComponent],
      imports: [BrowserModule, AppRoutingModule,
        HttpClientModule],
      providers: [DownloadService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(inject([DownloadService],
    (downloadService: DownloadService) => {
      service = downloadService;
  }));


  it('should be created', async(() => {
    expect(service).toBeTruthy();
  }));

  it('will create a proper quoteArr Obj', async(() => {

    const quoteList = ["EUR:USD", "USD:CHF", "USD:JPY"];
    service.getData(quoteList, 'currency');
    const mockQuoteArr = [
      {code: 'EUR:USD', type: 'currency' },
      {code: 'USD:CHF', type: 'currency' },
      {code: 'USD:JPY', type: 'currency' }
    ];
    expect(service.quotesArr).toEqual(mockQuoteArr);

  }));

  it('requestCurrencyData function will create a correct response', fakeAsync(() => {

    const mockResponse = {
      "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "EUR",
        "3. To_Currency Code": "USD",
        "5. Exchange Rate": "111.11"
      }
    };
    spyOn(service.http, 'get').and.returnValue(
      {
        subscribe: (cb) => {
          cb(mockResponse);
        }
      }
    );

    service.quotesArr = [{code: 'EUR:USD', type: 'currency' }];
    const quoteList = ["EUR:USD"];
    let result;
    service.getData(quoteList, 'currency').subscribe( (data) => {
      result = data;
    });
    service.requestCurrencyData('EUR', 'USD');
    const expectedResult = [
      { code: 'EUR:USD', value: '111.11' }
    ];
    expect(result).toEqual(expectedResult);

  }));

});
