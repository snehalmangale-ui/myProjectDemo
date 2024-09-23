import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss'],
})
export class PromiseComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.asyAwaFunction();
  }

  asyAwaPromise = new Promise((resolve, reject)=>{
    if (true) {
      setTimeout(() => {
      resolve('Promise is resolved');
      }, 3000);
    }
  });

  myFunction() {
    let buyLaptop = new Promise((resolve, reject) => {
      if (true) {
        resolve('Promise is resolved');
      }
      reject('Promise is rejected');
    });

    buyLaptop
      .then((res) => {
        console.log('Promise response : ', res);
      })
      .catch((err) => {
        console.log('Promise rejected : ', err);
      });
  }
  async asyAwaFunction() {
    let data = await this.asyAwaPromise;
    console.log(data)
  }
}
