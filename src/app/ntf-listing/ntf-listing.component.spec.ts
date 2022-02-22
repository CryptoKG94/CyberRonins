import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtfListingComponent } from './ntf-listing.component';

describe('NtfListingComponent', () => {
  let component: NtfListingComponent;
  let fixture: ComponentFixture<NtfListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtfListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtfListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
