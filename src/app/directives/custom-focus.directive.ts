import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomFocus]'
})
export class CustomFocusDirective {

  constructor(private eleRef : ElementRef) {
    this.eleRef.nativeElement.style.fontWeight = 'bold';
   }

}
