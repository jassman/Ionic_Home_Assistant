import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  apiURL = 'https://192.168.1.44/apiapp/';
  user = 'jasapp';
  password = 'jasdjango2.';

  constructor(private http: HttpClient) { 
     console.log("ApiAuthService::constructor");
  }

  getToken(): Observable<any>{
    let data = {"username": this.user, "password": this.password};
    return this.http.post(this.apiURL + "api-token-auth/", data).pipe(
      map(results => {
        console.log('RAW: ', results);
        return results['token'];
      })
    );
  }

}
