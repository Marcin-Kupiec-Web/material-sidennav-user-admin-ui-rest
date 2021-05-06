import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Rejestry } from 'src/shared/model/rejestry';
import { User } from 'src/shared/model/user';
import { RejestryService } from 'src/shared/services/rejestry.service';
import { CryptoAESService } from '../crypto/crypto-aes.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8081'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASS_SESSION_ATTRIBUTE_NAME = 'authenticatedPass';
  USER_LOGIN_TOKEN = null;
  public username: string;
  public password: string;
  public userOut: User;
  private rejestr: Rejestry = new Rejestry();

  constructor(private http: HttpClient, private rejestryService: RejestryService, private crypt: CryptoAESService) {}
  // this.crypt.encryptUsingAES256( password)
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

  authenticationServiceRefresh() {
    return this.http.get(`http://localhost:8081/terminarz/restControllerApp/basicauth`,
      { headers: { authorization:
        this.createBasicAuthToken(this.getLoggedInUserName(),
        this.getLoggedInPassName())}}).pipe(map((res) => {
        // tslint:disable-next-line:no-string-literal
        this.userOut = res['userOut'];
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, this.crypt.encryptUsingAES256(username));
    sessionStorage.setItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME, this.crypt.encryptUsingAES256(password));
  }

  logout() {
    if (sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)) {
      this.logRejestr();
    }
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME);
    // sessionStorage.removeItem(this.USER_LOGIN_TOKEN);
    this.username = null;
    this.password = null;
    this.userOut = null;
  }

  logRejestr() {
    if (this.userOut) {
    this.rejestr.akcja = 'wylogowanie';
    this.rejestr.obiekt = 'użytkownik';
    this.rejestr.uzytkownik = 'Nazwa: ' + this.userOut.username
    + ' / Id: ' + this.userOut.id;
    this.rejestryService.addRejestr(this.rejestr).subscribe(dt => {
    });
  }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }

  getLoggedInUserName(): string {
    const user: string = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return null; }
    return this.crypt.decryptUsingAES256(user).replace(/^"|"$/g, '') ;
  }

  hasRole(rola: string): boolean {
    if (this.userOut != null) {
      return this.userOut.roleCollectionToString.search(rola) > -1;
      }
    return false;
  }

  getLoggedInPassName(): string {
    const pass: string = sessionStorage.getItem(this.USER_PASS_SESSION_ATTRIBUTE_NAME);
    if (pass === null) { return null; }
    return this.crypt.decryptUsingAES256(pass).replace(/^"|"$/g, '') ;
  }


}
