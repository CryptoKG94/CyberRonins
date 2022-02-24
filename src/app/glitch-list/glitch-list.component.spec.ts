import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlitchListComponent } from './glitch-list.component';

describe('GlitchListComponent', () => {
  let component: GlitchListComponent;
  let fixture: ComponentFixture<GlitchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlitchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlitchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
