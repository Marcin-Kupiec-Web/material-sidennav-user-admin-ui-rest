import { Component, OnInit, HostListener, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MediaMatcher} from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/auth.service';
import { RejestryService } from 'src/shared/services/rejestry.service';
import { Rejestry } from 'src/shared/model/rejestry';
import { Router } from '@angular/router';
import { User } from 'src/shared/model/user';

export interface LoginUser {
  login: string;
  password: string;
}

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  isSticky = false;
  login: string;
  password: string;
  zalogowany: User = new User();
  rola: string;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  hasRole(rola: string): boolean {
  return this.authenticationService.hasRole(rola);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
  openDialog() {
    this.authenticationService.logout();
    const dialogRef = this.dialog.open(DialogContentLoginComponent, {
      width: '400px',
      backdropClass: 'dialog-bg',
      data: {login: this.login, password: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'app-dialog-content-login',
  templateUrl: './dialogContentLogin.html',
})
export class DialogContentLoginComponent {
    private rejestr: Rejestry = new Rejestry();
    signin: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.min(3)]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get loginInput() { return this.signin.get('login'); }
  get passwordInput() { return this.signin.get('password'); }

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private rejestryService: RejestryService,
    public dialogRef: MatDialogRef<DialogContentLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginUser) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
// ---------------------------------- click zaloguj --------------------------------
  onLogin() {
    this.authenticationService.authenticationService(this.data.login, this.data.password).subscribe((data) => {
        this.logRejestr();
        this.router.navigate(['/start']);
        this.onNoClick();
      }, () => {this.authenticationService.logout();
      });
}
// ----------------------------------- zapisanie w rejestrach ------------------------
logRejestr() {
  this.rejestr.akcja = 'logowanie';
  this.rejestr.obiekt = 'użytkownik';
  this.rejestr.uzytkownik = 'Nazwa: ' + this.authenticationService.userOut.username
  + ' / Id: ' + this.authenticationService.userOut.id;
  this.rejestryService.addRejestr(this.rejestr).subscribe(dt => { });
}
}
