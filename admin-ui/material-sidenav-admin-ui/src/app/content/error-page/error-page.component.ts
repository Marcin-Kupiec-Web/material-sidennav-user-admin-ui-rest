import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

}
