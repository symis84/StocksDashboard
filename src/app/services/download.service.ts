import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";

interface IStockListResponse {
  code: string;
  value: string;
}

interface IStockListRequest {
  code: string;
  type: string;
}

@Injectable()
export class DownloadService {

  // static strings
  private static ALPHAVANTAGE_URL = 'https://www.alphavantage.co/query?';  // URL to web api
  private static APIKEY = 'ZRTYU84IHRVJALJ6';
  private static CURRENCY_API_FUNCTION_NAME = 'CURRENCY_EXCHANGE_RATE';
  private static CURRENCY_TYPE = 'currency';
  private static ALPHAVANTAGE_API_CURRENCY_RESPONSE_MAIN_PROP= "Realtime Currency Exchange Rate";
  private static ALPHAVANTAGE_API_CURRENCY_RESPONSE_FROM_PROP = "1. From_Currency Code";
  private static ALPHAVANTAGE_API_CURRENCY_RESPONSE_TO_PROP = "3. To_Currency Code";
  private static ALPHAVANTAGE_API_CURRENCY_RESPONSE_VALUE_PROP = "5. Exchange Rate";

  private downloadDataObserver: BehaviorSubject<IStockListResponse[]> = new BehaviorSubject([]);
  public quotesArr: IStockListRequest[] = [];

  constructor(public http: HttpClient) { }

  /**
   * this function will create one in memory object with all the quotes to be downloaded and
   * it will return one observable object. the observable object permits to receive one event
   * when new quote is available
   *
   * @param quotesList a list with the quotes to download
   * @param type the type of the quotes to download: currency data, equity data, etc..
   * @returns {Void}
   */
  public getData(quotesList, type): Observable<IStockListResponse[]> {
    quotesList.forEach((quote) => {
        const newQuoteRequest:IStockListRequest = {
          code: quote,
          type: type
        }
        this.quotesArr.push(newQuoteRequest);
    });
    return this.downloadDataObserver.asObservable();
  }

  /**
   * this function starts the new quotes download process.
   *
   * @returns {Void}
   */
  public requestData(): void {
    let tmpQuotesCode: string[] = [];
    this.quotesArr.forEach((quote: IStockListRequest) => {
      if (tmpQuotesCode.indexOf(quote.code) === -1) {
        let quoteCodeArr = quote.code.split(':');
        if (quote.type === DownloadService.CURRENCY_TYPE) {
          // I added 1 sec delay because 'www.alphavantage' api servise blocks consecutive ajax requests
          // at the the same.
          // If i don't add one delay, sometimes they send me back the following response:
          // "Information": "Please kindly contact support@alphavantage.co if you would like to have a higher API call volume"
          setTimeout( () => {
            this.requestCurrencyData(quoteCodeArr[0], quoteCodeArr[1])
          },1000);
        }
      }
    });
  }

  /**
   * In order to get a new currency quote, this function will send a ajax request to the public stocks api service (www.alphavantage) .
   * This function will publish the new currency quote through the downloadDataObserver object to all the listeners
   *
   * @param from The currency you would like to get the exchange rate for
   * @param to The destination currency for the exchange rate
   * @returns {Void}
   */
  public requestCurrencyData(from, to){
    let url = `${DownloadService.ALPHAVANTAGE_URL}function=${DownloadService.CURRENCY_API_FUNCTION_NAME}&from_currency=${from}&to_currency=${to}&apikey=${DownloadService.APIKEY}`;
      this.http.get(url).subscribe(
        (res) => {
          let response: IStockListResponse = {
            code: `${res[DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_MAIN_PROP][DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_FROM_PROP]}:${res[DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_MAIN_PROP][DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_TO_PROP]}`,
            value: res[DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_MAIN_PROP][DownloadService.ALPHAVANTAGE_API_CURRENCY_RESPONSE_VALUE_PROP]
          }
          this.downloadDataObserver.next([response]);
        },
        (err) => {
          // TBD: console.log to be replaced with a proper log system ( e.g. "AWS.CloudWatch" )
          console.log('error to download new quotes: ',err);
        }
    );
  }

}
