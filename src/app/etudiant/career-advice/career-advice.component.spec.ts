import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAdviceComponent } from './career-advice.component';

describe('CareerAdviceComponent', () => {
  let component: CareerAdviceComponent;
  let fixture: ComponentFixture<CareerAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareerAdviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
