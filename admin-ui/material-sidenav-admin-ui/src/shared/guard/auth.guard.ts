import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate() {// localStorage.getItem('authenticatedUser') || this.authenticationService.isUserLoggedIn()
        if (this.authenticationService.username) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
