import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { SideNavService } from 'src/app/services/sidenav.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  subscription: Subscription;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(
      Breakpoints.Handset
  );

  panelOpenState = false;
  theme = 'jasny';
  constructor(private breakpointObserver: BreakpointObserver,
              private sideNavService: SideNavService,
              private overlay: OverlayContainer,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.sideNavService.getSideNavToggleSubjects().subscribe(() => {
      this.sidenav.toggle();
     });
   }
   toggleTheme(): void {
    if (this.overlay.getContainerElement().classList.contains('light-theme')) {
      this.overlay.getContainerElement().classList.remove('light-theme');
      this.overlay.getContainerElement().classList.add('dark-theme');
    } else if (this.overlay.getContainerElement().classList.contains('dark-theme')) {
      this.overlay.getContainerElement().classList.remove('dark-theme');
      this.overlay.getContainerElement().classList.add('light-theme');
    } else {
      this.overlay.getContainerElement().classList.add('dark-theme');
    }
    if (document.body.classList.contains('light-theme')) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      this.theme = 'ciemny';
    } else if (document.body.classList.contains('dark-theme')) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      this.theme = 'jasny';
    } else {
      document.body.classList.add('dark-theme');
      this.theme = 'ciemny';
    }
  }
  hasRole(rola: string): boolean {
    return this.authenticationService.hasRole(rola);
    }
}
