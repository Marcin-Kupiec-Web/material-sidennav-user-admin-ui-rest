import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // alert(this.authenticationService.getLoggedInUserName());
        if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization: 'Basic ' + window.btoa(this.authenticationService.getLoggedInUserName() + ':' +
                    this.authenticationService.getLoggedInPassName())
                })
            });

            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}
