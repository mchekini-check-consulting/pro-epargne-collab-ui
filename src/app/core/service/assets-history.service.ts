import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AssetsModel} from "../model/assets.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssetsHistoryService {

    url: string = 'api/v1/asset';
    constructor(private http:HttpClient) { }

    getAssetsHistory(): Observable<AssetsModel[]>{
        return this.http.get<AssetsModel[]>(this.url)
    }
}
