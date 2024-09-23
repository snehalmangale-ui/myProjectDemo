import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {
  exclusive = new Subject<boolean>();
  exclusiveBehaveSub = new BehaviorSubject<boolean>(false);
  constructor() { }

  print (val: any, containerId: any){
    let ele = document.createElement('li');
    ele.innerText = val;
    document.getElementById(containerId)?.appendChild(ele);
  }

  setExclusive(){
    this.exclusive.next(true);
  }
  setExclusiveBehav(){
    this.exclusiveBehaveSub.next(true);
  }
}
