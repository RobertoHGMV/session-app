import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Address } from 'src/models/address';
import { DataToken } from 'src/models/data-token';
import { BillOfExchange } from 'src/models/bill-of-exchange';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:39052';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  }

  getAddress() {
    return this.httpClient.get<Address>('https://viacep.com.br/ws/01001000/json/');
  }

  login() {
    const customerLogin = {
      email: "", 
      password: ""
    };

    return this.httpClient.post<DataToken>(`${this.url}/api/AuthenticationCustomer/v1/Login`, JSON.stringify(customerLogin), this.httpOptions)
    .pipe(
      // retry(2),
      catchError(this.handleError));
  }

  getBillofExchanges(dataToken: DataToken) {
    const options = { 
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dataToken.token}` 
        }),
        params: new HttpParams({fromString: "Skip=0&Take=15"}),
        withCredentials: true 
      };
      
    const urlBills = `${this.url}/api/BillOfExchange/v1/c00001/all`;

    return this.httpClient.get<BillOfExchange[]>(urlBills, options)
    .pipe(
      // retry(2),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
