import { Component, OnInit, Input } from '@angular/core';
import { DownloadService } from '../../services/download.service';

interface IStockList {
  code: string;
}

@Component({
  selector: 'app-refresh-data-button',
  templateUrl: './refresh-data-button.component.html',
  styleUrls: [ './refresh-data-button.component.scss' ]
})
export class RefreshDataButtonComponent{

  @Input()
  public text: string;

  constructor( public download: DownloadService) {}

  /**
   * this function will trigger the process to download new data from the public Alphavantage API service
   *
   * @returns {Void}
   */
  public getCurrentPrice(): void {

    this.download.requestData();

  }

}
