import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { reset } from '../counter.actions';

@Component({
  selector: 'app-grandson',
  templateUrl: './grandson.component.html',
  styleUrls: ['./grandson.component.scss']
})
export class GrandsonComponent implements OnInit {

  counter: number = 0;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe(counter => {
      this.counter = counter
    });
  }

  reset() {
    this.store.dispatch(reset());
  }

}
