import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TransactionModel} from "./Transaction.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    url: string = 'api/v1/transaction';

  constructor(private http: HttpClient) {}

    sendTransaction(transactionModel: TransactionModel ) : void {
      /**/
      this.http.post<TransactionModel>(this.url, transactionModel).subscribe(res =>{
          console.log(res);
      });
   }
}
