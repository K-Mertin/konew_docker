/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelationqueryComponent } from './relationquery.component';

describe('RelationqueryComponent', () => {
  let component: RelationqueryComponent;
  let fixture: ComponentFixture<RelationqueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationqueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
