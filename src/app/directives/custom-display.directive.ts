import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomDisplay]'
})
export class CustomDisplayDirective implements OnInit {
  @Input() appCustomDisplay: boolean = false;
  constructor(
    private tempRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    if(this.appCustomDisplay){
      this.viewContainerRef.createEmbeddedView(this.tempRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
