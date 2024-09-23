import { Component } from '@angular/core';
import { dataModify, increment } from '../counter.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent {
  count$ : Observable<number>;
  constructor (private store: Store<{count : number}>){
    this.count$ = store.select('count')
  }
  increment(){
    this.store.dispatch(increment());
    this.store.dispatch(dataModify());
  }
}
