import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationCalculatorComponent } from './compensation-calculator.component';

describe('CompensationCalculatorComponent', () => {
  let component: CompensationCalculatorComponent;
  let fixture: ComponentFixture<CompensationCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompensationCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompensationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
