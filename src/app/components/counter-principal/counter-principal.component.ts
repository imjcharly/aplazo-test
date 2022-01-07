import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../counter/counter.actions';

@Component({
  selector: 'app-counter-principal',
  templateUrl: './counter-principal.component.html',
  styleUrls: ['./counter-principal.component.scss']
})
export class CounterPrincipalComponent implements OnInit {

  counter: number = 0;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.select('counter').subscribe(counter => this.counter = counter);
  }

  increment() {
    this.store.dispatch(actions.increment());
  }

  decrement() {
    this.store.dispatch(actions.decrement());
  }

}
