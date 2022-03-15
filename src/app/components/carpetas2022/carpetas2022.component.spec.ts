import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carpetas2022Component } from './carpetas2022.component';

describe('Carpetas2022Component', () => {
  let component: Carpetas2022Component;
  let fixture: ComponentFixture<Carpetas2022Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Carpetas2022Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Carpetas2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
