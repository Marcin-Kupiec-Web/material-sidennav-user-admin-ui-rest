import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideNavService {
 private sideNavToggleSubject: Subject<any>;

  constructor() {
    this.sideNavToggleSubject = new Subject<any>();
  }

  public toggle() {
    return this.sideNavToggleSubject.next(null);
  }

  public getSideNavToggleSubjects(): Observable<any>{
    return this.sideNavToggleSubject.asObservable();
  }
}
