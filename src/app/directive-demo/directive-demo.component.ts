import { Component } from '@angular/core';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrls: ['./directive-demo.component.scss']
})
export class DirectiveDemoComponent {
  isStyleTrue = true;
  changeTextColor(){
    this.isStyleTrue = !this.isStyleTrue;
  }
}
