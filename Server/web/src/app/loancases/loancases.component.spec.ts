/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoancasesComponent } from './loancases.component';

describe('LoancasesComponent', () => {
  let component: LoancasesComponent;
  let fixture: ComponentFixture<LoancasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoancasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoancasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
