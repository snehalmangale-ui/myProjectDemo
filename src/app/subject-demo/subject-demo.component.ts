import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../services/design-utility.service';

@Component({
  selector: 'app-subject-demo',
  templateUrl: './subject-demo.component.html',
  styleUrls: ['./subject-demo.component.scss']
})
export class SubjectDemoComponent implements OnInit, OnDestroy {
  exclusive: boolean = false;
  exclusiveBehav: boolean = false;
  arrOfColors: string[] = ['Green','Blue','Black','White'];

  constructor(public duService: DesignUtilityService){
    this.duService.exclusive.subscribe((res: boolean) => {
      if (res === true) {
        this.exclusive = true;
      }
    });

    this.duService.exclusiveBehaveSub.subscribe((res: boolean) => {
      if (res === true) {
        this.exclusiveBehav = true;
      }
    });
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void {
    // this.duService.exclusive.unsubscribe()
  }
}
