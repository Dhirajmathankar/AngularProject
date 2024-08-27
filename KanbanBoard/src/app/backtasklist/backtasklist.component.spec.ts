import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktasklistComponent } from './backtasklist.component';

describe('BacktasklistComponent', () => {
  let component: BacktasklistComponent;
  let fixture: ComponentFixture<BacktasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BacktasklistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
