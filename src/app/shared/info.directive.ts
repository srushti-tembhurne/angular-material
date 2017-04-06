import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfo]'
})
export class InfoDirective {

  constructor(private el: ElementRef, private render: Renderer) {
     render.listen(el.nativeElement, 'click', (event) => {
      // Do something with 'event'
       console.log(event);
    return window.confirm('Are you sure you want to do this?');
    })
   }
 /* @HostListener('click', ['$event']) onclick(event: Event) {
    console.log(event);
    return window.confirm('Are you sure you want to do this?');
  }*/
}
