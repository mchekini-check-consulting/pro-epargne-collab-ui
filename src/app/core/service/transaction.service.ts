import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {TransactionModel} from "../model/transaction.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    url: string = 'api/v1/transaction';

  constructor(private http: HttpClient) {}

    sendTransaction(transactionModel: TransactionModel ){
      return this.http.post<TransactionModel>(this.url, transactionModel);
   }
}