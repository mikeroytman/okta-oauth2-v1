import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {

  constructor(private http: HttpClient) { }

  callAPI(body, headers)
  {
      console.log('hh', headers);
      return this.http.post(environment.baseURL, body, headers);
  }
}
