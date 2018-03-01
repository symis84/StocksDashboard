import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { StockTickerComponent } from '../stock-ticker/stock-ticker.component';
import { RefreshDataButtonComponent } from './refresh-data-button.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

describe('RefreshDataButtonComponent', () => {
  let component: RefreshDataButtonComponent;
  let fixture: ComponentFixture<RefreshDataButtonComponent>;
  let downloadService: DownloadService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StockTickerComponent, RefreshDataButtonComponent, AppComponent, DashboardComponent],
      imports: [BrowserModule, AppRoutingModule, HttpClientModule],
      providers: [DownloadService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshDataButtonComponent);
    component = fixture.componentInstance;
    component.text = 'Update Data';
  });

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('on ngOnInit the component will update the "text" property with the correct data', async(() => {
    const text = 'Update Data';
    fixture.detectChanges();
    expect(component.text).toEqual(text);
  }));

});
