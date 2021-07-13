import { Component } from '@angular/core';
import { Address } from 'src/models/address';
import { DataService } from './services/data.service';
import { DataToken } from 'src/models/data-token';
import { BillOfExchange } from 'src/models/bill-of-exchange';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Session-App';
  mode = 'adress';
  dataToken = {} as DataToken;
  billOfExchanges: BillOfExchange[] = [];
  address = {} as Address;

  constructor(private data: DataService) { }

  getAddress() {
    this.mode = 'adress';
    
    this.data.getAddress().subscribe((cep => { 
      this.address = cep;
      console.log(this.address);
    }));
  }

  login() {
    this.data.login().subscribe((resp) => {
      this.dataToken = resp;
      console.log(resp);
      alert("Login realizado com sucesso!");
    });
  }

  getBillofExchanges() {
    this.mode = 'bills';

    this.data.getBillofExchanges(this.dataToken).subscribe((resp) => {
      this.billOfExchanges = resp;
      console.log(resp);
    });
  }
}
