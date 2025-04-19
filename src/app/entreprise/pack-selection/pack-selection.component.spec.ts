import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackSelectionComponent } from './pack-selection.component';

describe('PackSelectionComponent', () => {
  let component: PackSelectionComponent;
  let fixture: ComponentFixture<PackSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
