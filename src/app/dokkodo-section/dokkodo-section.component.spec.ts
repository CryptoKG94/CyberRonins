import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokkodoSectionComponent } from './dokkodo-section.component';

describe('DokkodoSectionComponent', () => {
  let component: DokkodoSectionComponent;
  let fixture: ComponentFixture<DokkodoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DokkodoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DokkodoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
