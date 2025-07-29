import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendFormService {

  private URL_API = 'https://tuservidor.com/api/endpoint';


  constructor(private http: HttpClient ) { }

  sendForm(data: any): Observable<any>{
    return this.http.post(this.URL_API, data)
  }

}
