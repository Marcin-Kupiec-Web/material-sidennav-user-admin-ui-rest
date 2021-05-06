import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SideNavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  constructor(private sideNavService: SideNavService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  clickMenu() {
    this.sideNavService.toggle();
  }
  hasRole(rola: string): boolean {
    return this.authenticationService.hasRole(rola);
    }
}
