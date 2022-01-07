import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterPrincipalComponent } from './counter-principal.component';

describe('CounterPrincipalComponent', () => {
  let component: CounterPrincipalComponent;
  let fixture: ComponentFixture<CounterPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
