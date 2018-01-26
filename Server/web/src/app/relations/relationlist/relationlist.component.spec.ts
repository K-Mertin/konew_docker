/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelationlistComponent } from './relationlist.component';

describe('RelationlistComponent', () => {
  let component: RelationlistComponent;
  let fixture: ComponentFixture<RelationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
