import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../counter.actions';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.scss']
})
export class SonComponent implements OnInit {

  counter: number = 0;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe(counter => this.counter = counter);
  }

  divide() {
    this.store.dispatch(actions.divide({ number: 2 }));
  }

  multiply() {
    this.store.dispatch(actions.multiply({ number: 2 }));
  }
}
