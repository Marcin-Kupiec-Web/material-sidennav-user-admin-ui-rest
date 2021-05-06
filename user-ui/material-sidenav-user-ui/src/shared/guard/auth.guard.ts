import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/auth.service';
import { Rejestry } from '../model/rejestry';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService) {}
    private rejestry: Rejestry;
    canActivate() {// localStorage.getItem('authenticatedUser') || this.authenticationService.isUserLoggedIn()

if (this.authenticationService.getLoggedInUserName() !== null) {
    this.authenticationService.authenticationServiceRefresh().subscribe((data) => {
                                                      }, () => {
                                                      });
    return true;
        }
// this.authenticationService.logout();
// this.router.navigate(['/start']);
// return false
return true;
    }

}
