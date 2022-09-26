import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PFMViewsComponent } from './pfmviews.component';

describe('PFMViewsComponent', () => {
  let component: PFMViewsComponent;
  let fixture: ComponentFixture<PFMViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PFMViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PFMViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
