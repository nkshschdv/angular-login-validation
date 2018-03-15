import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentails } from './login/credentails';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class LoginService {

  cred: Credentails = { username: null, password: null };
  private url = 'api/cred';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getCredential(): Observable<Credentails> {
    // console.log(this.http.get<Credentails>(this.url));
    return this.http.get<Credentails>(this.url);
  }
  // verifyUser(username , pass ): boolean {
  //    this.getCredential().subscribe(
  //     credentails => {
  //       this.cred = credentails[0];
  //     }
  //   );
    // console.log( this.cred );
    // if  ( this.cred.username === username && this.cred.password === pass) {
    //   return true;
    // }
    // return false;
  // }
}
