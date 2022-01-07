import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandsonComponent } from './grandson.component';

describe('GrandsonComponent', () => {
  let component: GrandsonComponent;
  let fixture: ComponentFixture<GrandsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrandsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
