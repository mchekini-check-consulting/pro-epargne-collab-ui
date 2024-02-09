import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorAccountService {
  url: string = 'api/v1/account';
  constructor(private http:HttpClient) { }

  getCollaboratorAccounts(){
    return this.http.get(this.url)
  }
}
