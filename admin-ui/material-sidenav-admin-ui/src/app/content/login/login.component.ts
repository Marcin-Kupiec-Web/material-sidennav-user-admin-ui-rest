import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }
    username: string;
    password: string;
    fakepass = '';
    typepass = 'password';
    signin: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.min(3)]),
        password: new FormControl('', [Validators.required, Validators.min(3) ])
      });
      hide = true;
      get loginInput() { return this.signin.get('login'); }
      get passwordInput() { return this.signin.get('password'); }
    ngOnInit() {this.authenticationService.logout(); }

   onLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((data) => {
        this.router.navigate(['']);
      }, () => {this.authenticationService.logout();
      });
}

}
