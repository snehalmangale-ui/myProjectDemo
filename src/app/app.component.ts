import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DesignUtilityService } from './services/design-utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myProjectDemo';
countData$:Observable<number>;
dataModify$ : Observable<string>;

  constructor (private store :Store<{count:number, dataModify:string}>, 
    private duService : DesignUtilityService,
    private router: Router
  ){
    this.countData$ = store.select('count');
    this.dataModify$ = store.select('dataModify');
    
  }

  ngOnInit(): void {
    
  }

  goToSubjectDemo() {
    this.router.navigate([`/subjectDemo`]);
    setTimeout(() => {
      this.duService.setExclusive();
      this.duService.setExclusiveBehav();
    }, 1000);

  }
}
