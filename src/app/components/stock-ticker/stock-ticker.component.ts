import { Component, OnInit, Input } from '@angular/core';
import { DownloadService } from '../../services/download.service';

interface IStockQuote {
  code: string;
  value: string;
}

@Component({
  selector: 'app-stock-ticker',
  templateUrl: './stock-ticker.component.html',
  styleUrls: [ './stock-ticker.component.scss' ]
})
export class StockTickerComponent implements OnInit {

  @Input() stocksList;

  private static CURRENCY_TYPE = 'currency';
  public stockQuoteArr: IStockQuote[] = [];

  constructor(public download: DownloadService) { }

  ngOnInit(): void {
    this.createInitialStockQuoteArr();
    this.startDataSubscription();
  }

  /**
   * this function will create one in memory stockQuoteArr object based on
   * the params passed in html component stocksList='["EUR:USD","USD:CHF","USD:JPY"]'.
   * In this coding test example, if ou open the dashboard.components.html file,
   * you can see the params passed in the component
   *
   * @returns {Void}
   */
  public createInitialStockQuoteArr(): void {
    const stocksListObj = JSON.parse(this.stocksList);
    stocksListObj.forEach( (code) => {
      const stockObj = {
        code,
        value: 'N/A'
      }
      this.stockQuoteArr.push(stockObj);
    });

  }

  /**
   * this function will attach one listener to the download service.
   * this function will listen when a new quote is ready to display.
   * the download service will publish a new quote when a new quote has been downloaded
   *
   * @returns {Void}
   */
  public startDataSubscription(): void {
    const stocksListObj = JSON.parse(this.stocksList);
    this.download.getData(stocksListObj, StockTickerComponent.CURRENCY_TYPE).skip(1).filter(data => this.stocksList.indexOf(data[0].code) > -1).subscribe(
      (newQuote) => {
        this.stockQuoteArr.forEach( (currentQuote,i) => {
          if (currentQuote.code === newQuote[0].code) {
            this.stockQuoteArr[i] = newQuote[0];
          }
        });
      }
    );
  }

}
