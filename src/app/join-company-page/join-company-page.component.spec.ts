import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCompanyPageComponent } from './join-company-page.component';

describe('JoinCompanyPageComponent', () => {
  let component: JoinCompanyPageComponent;
  let fixture: ComponentFixture<JoinCompanyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinCompanyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinCompanyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
