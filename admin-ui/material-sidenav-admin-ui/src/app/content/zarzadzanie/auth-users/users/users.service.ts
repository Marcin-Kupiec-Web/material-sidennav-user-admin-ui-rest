import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8081/terminarz/restControllerAppUs';
  }

  public findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl + '/getUsers');
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl + '/updateUsers', user);
  }
  public addUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl + '/addUsers', user);
  }

  public removeUser(user: User): Observable<any> {
    return this.http.delete(this.usersUrl + '/deleteUsers' + '/' + user.id);
  }


}
