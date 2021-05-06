import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSticky: boolean;
  @HostListener('window:scroll', ['$event'])
  checkScroll(e) {
    this.isSticky = window.pageYOffset >= 50;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
