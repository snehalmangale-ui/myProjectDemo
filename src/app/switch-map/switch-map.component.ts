import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  from,
  of,
  Subject,
  exhaustMap,
  fromEvent,
  interval,
  Subscriber,
  Subscription,
  concatMap,
  delay,
  filter,
  map,
  mergeMap,
  retry,
  retryWhen,
  scan,
  switchAll,
  switchMap,
  tap,
} from 'rxjs';
import { DesignUtilityService } from '../services/design-utility.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss'],
})
export class SwitchMapComponent implements OnInit, AfterViewInit {
  num = 1;
  url = 'http://localhost:3000/planDetails';
  btnSub$: Subject<boolean> = new Subject();
  submitted = false;
  sub1: Subscription | undefined;
  msg1: string = '';
  msg2: any;
  retryMsg: string = '';
  dataFromApi: any;

  constructor(public duService: DesignUtilityService, public http: HttpClient) {

  }


  @ViewChild('btn') btn: ElementRef | undefined;
  ngOnInit() {
    const source = from(['Tech', 'Comedy', 'News']).pipe(delay(1000));

    // Ex - 01 | Map
    source.pipe(map((res: any) => this.getData(res))).subscribe((res2: any) => {
      console.log(res2);
      this.duService.print(res2, 'elContainer');
    });

    // Ex 02 | Map + SwitchAll
    source
      .pipe(
        map((res3: any) => this.getData(res3)),
        switchAll()
      )
      .subscribe((res4: any) => {
        console.log(res4);
        this.duService.print(res4, 'elContainer2');
      });

    // Ex 03 | SwitchMap
    source
      .pipe(switchMap((res: any) => this.getData(res)))
      .subscribe((res2: any) => {
        console.log('SwitchMap Example ', res2);
        this.duService.print(res2, 'elContainer3');
      });

    // Ex 04 | Map

    const broadCast = interval(1000);

    this.sub1 = broadCast
      .pipe(map((res: any) => 'Video ' + res))
      .subscribe((res2: any) => (this.msg1 = res2));

    setTimeout(() => {
      this.sub1?.unsubscribe();
    }, 10000);

    const data = from([
      {
        id: 1,
        name: 'abc',
      },
      {
        id: 2,
        name: 'abcd',
      },
      {
        id: 3,
        name: 'pqr',
      },
      {
        id: 4,
        name: 'ghj',
      },
    ]);

    // Ex 01 Map
    data.pipe(map((res: any) => res?.name)).subscribe((res2: any) => {
      this.duService.print(res2, 'elContainer4');
    });

    // Ex 01 Filter
    data
      .pipe(
        filter((res3: any) => res3.name.length < 4),
        map((res: any) => res?.name)
      )
      .subscribe((res2: any) => {
        this.duService.print(res2, 'elContainer5');
      });

    // Ex 01 Tap

    this.callTap();

    // Ex 01 Retry

    this.retryExample();

    // Ex 01 MergeMap
    /* Transform items emmited by observable into other observable and then flattens those observables into a single observable sequence */
    // typeof of source is observable
    source
      .pipe(
        // getData returning an observable
        mergeMap((res: any) => this.getData(res))
      )
      .subscribe((res2: any) => {
        console.log('MergeMap example', res2);
        this.duService.print(res2, 'elContainer7');
      });
    // Ex 02 Map

    // as seen beelow two times needed to subscribe
    source
      .pipe(
        // getData returning an observable
        map((res: any) => this.getData(res))
      )
      .subscribe((res2: any) => {
        res2.subscribe((res3: any) => {
          this.duService.print(res3, 'elContainer8');
        });
      });

    // Ex 01 ConcatMap
    /* transforms each value emitted by a source observable into an inner observable, 
    executes it sequentially, and emits the values in the order they were received*/
    // typeof of source is observable
    source
      .pipe(
        // getData returning an observable
        concatMap((res: any) => this.getData(res))
      )
      .subscribe((res2: any) => {
        console.log('concatMap example', res2);
        this.duService.print(res2, 'elContainer9');
      });
  }

  callTap() {
    const source = interval(1500);
    const arr = ['snehal', 'suhas', 'shital', 'mangale', 'sne'];
    let obsSub: Subscription;

    obsSub = source
      .pipe(
        tap((res: any) => {
          console.log('Tap Befor ', res);
          if (res === 4) {
            obsSub?.unsubscribe();
          }
        }),
        map((res2: any) => arr[res2]),
        tap((res3: any) => console.log('Tap after ', res3))
      )
      .subscribe((res4: any) => this.duService.print(res4, 'elContainer6'));
  }

  retryExample() {
    this.http
      .get(this.url)
      .pipe(
        // retry(4),
        retryWhen((err: any) =>
          err.pipe(
            delay(3000),
            scan((retryCount: any) => {
              if (retryCount >= 3) {
                throw err;
              } else {
                retryCount += 1;
                return retryCount;
              }
            }, 0)
          )
        )
      )
      .subscribe(
        (res: any) => {
          this.dataFromApi = res[0];
        },
        (err: any) => {
          console.log('retrying');
        }
      );
  }

  getData(data: any) {
    return of(data + ' Video uploaded');
  }
  onSave(value: any) {
    return this.http.get(this.url + '/' + value);
  }
  ngAfterViewInit() {
    // add btn click of view child inside viewafterinit i.e after complete dom is loaded
    fromEvent(this.btn?.nativeElement, 'click')
      .pipe(
        tap(() => (this.submitted = true)),
        exhaustMap(() => this.onSave(this.num++))
      )
      .subscribe((data) => {
        console.log('saved notification => ', data);
      });
  }
}
