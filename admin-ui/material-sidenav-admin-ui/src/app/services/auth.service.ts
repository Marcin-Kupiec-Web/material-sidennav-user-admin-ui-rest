import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8081'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASS_SESSION_ATTRIBUTE_NAME = 'authenticatedPass';
  public username: string;
  public password: string;
  public userOut: User;
  constructor(private http: HttpClient) {}

  authenticationService(username: string, password: string) {
    return this.http.get(`http://localhost:8081/terminarz/restControllerApp/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
         // tslint:disable-next-line:no-string-literal
        this.userOut = res['userOut'];
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    // sessionStorage.setItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME, password)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return ''; }
    return user;
  }
  getLoggedInPassName() {
    const pass = sessionStorage.getItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME);
    if (pass === null) { return ''; }
    return pass;
  }

  hasRole(rola: string): boolean {
    if (this.userOut != null) {
      return this.userOut.roleCollectionToString.search(rola) > -1;
      }
    return false;
  }
}
