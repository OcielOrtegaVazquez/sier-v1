import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmiComponent } from './cmi.component';

describe('CmiComponent', () => {
  let component: CmiComponent;
  let fixture: ComponentFixture<CmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
