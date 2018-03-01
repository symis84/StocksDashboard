import { NgModule, forwardRef }       from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { StockTickerComponent } from './components/stock-ticker/stock-ticker.component';
import { RefreshDataButtonComponent } from './components/refresh-data-button/refresh-data-button.component';
import { DownloadService }          from './services/download.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    StockTickerComponent,
    RefreshDataButtonComponent
  ],
  providers: [DownloadService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
