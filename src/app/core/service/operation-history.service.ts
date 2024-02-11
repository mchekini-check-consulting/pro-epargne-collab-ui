import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PaginatedOperationHistory} from "../model/paginated-history-model";

@Injectable({
    providedIn: 'root'
})
export class OperationHistoryService {

    constructor(private http: HttpClient) {
    }


    getOperationHistory(page: number,size:number,filter?:string,sort?): Observable<PaginatedOperationHistory> {
        const url = `/api/v1/transaction?page=${page}&size=${size}&filter=${filter}&sort=${sort}`;
        return this.http.get<PaginatedOperationHistory>(url);
    }


}




