import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DownloadService } from '../../services/download.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { StockTickerComponent } from '../../components/stock-ticker/stock-ticker.component';
import { RefreshDataButtonComponent } from '../../components/refresh-data-button/refresh-data-button.component';
import { AppComponent } from '../../app.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let downloadService: DownloadService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, DashboardComponent, StockTickerComponent, RefreshDataButtonComponent],
      imports: [BrowserModule, AppRoutingModule, HttpClientModule],
      providers: [DownloadService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    downloadService = TestBed.get(DownloadService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
