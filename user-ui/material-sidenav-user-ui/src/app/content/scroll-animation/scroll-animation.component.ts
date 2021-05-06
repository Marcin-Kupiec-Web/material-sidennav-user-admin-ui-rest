import { Component, HostListener, ElementRef, Input, OnInit } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';


const visible = style({
  opacity: 1,
  transform: 'scale(1,1)'
});

const novisible = style({
  opacity: 0,
  transform: 'scale(0.0,0.0)'
});


@Component({
  selector: 'app-scroll-animation',
  templateUrl: './scroll-animation.component.html',
  animations: [
    trigger('foobar', [
      state('show', visible),
      state('hide', novisible),
      transition('show => hide', animate('1000ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ])
  ]
})
export class ScrollnimationComponent implements OnInit {

  state = 'hide';

  constructor(public el: ElementRef) { }
  @Input() stateNoScroll = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (scrollPosition >= componentPosition - 400) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }

  }

  ngOnInit() {
    if (this.stateNoScroll === true) {
    setTimeout(() => {
      this.state = 'show';
    }, 100);
  } else {
    this.state = 'hide';
  }
}
}
