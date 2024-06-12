/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { See_betsComponent } from './see_bets.component';

describe('See_betsComponent', () => {
  let component: See_betsComponent;
  let fixture: ComponentFixture<See_betsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ See_betsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(See_betsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
