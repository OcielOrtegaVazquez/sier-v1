import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCMIComponent } from './resumen-cmi.component';

describe('ResumenCMIComponent', () => {
  let component: ResumenCMIComponent;
  let fixture: ComponentFixture<ResumenCMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCMIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
