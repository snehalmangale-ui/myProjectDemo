import { Component, OnInit } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-rxjs-operators-concepts',
  templateUrl: './rxjs-operators-concepts.component.html',
  styleUrls: ['./rxjs-operators-concepts.component.scss'],
})
export class RxjsOperatorsConceptsComponent implements OnInit {
  broadCastMsg : any;
  videoSub: Subscription | undefined;
  broadCastTimerMsg : any;
  videoTimerSub: Subscription | undefined;

  constructor() {}
  ngOnInit(): void {
    this.asyAwaFunction();

    const broadCastVideos = interval(2000);
    const timerBroadCast = timer(1000, 1000);

   this.videoSub =  broadCastVideos.subscribe((res) =>{
      this.broadCastMsg = res;
    })
  this.videoTimerSub =  timerBroadCast.subscribe((res) =>{
    this.broadCastTimerMsg = res;
  })
  }

  asyAwaPromise = new Promise((resolve, reject) => {
    if (true) {
      setTimeout(() => {
        resolve('Promise is resolved');
      }, 3000);
    }
  });

  async asyAwaFunction() {
    let data = await this.asyAwaPromise;
    console.log(data);
  }

  unsubscribeToInterval(){
    this.videoSub?.unsubscribe();
  }
  unsubscribeToTimer(){
    this.videoTimerSub?.unsubscribe();
  }
}

