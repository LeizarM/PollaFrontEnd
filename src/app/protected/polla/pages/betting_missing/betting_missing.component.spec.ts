/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Betting_missingComponent } from './betting_missing.component';

describe('Betting_missingComponent', () => {
  let component: Betting_missingComponent;
  let fixture: ComponentFixture<Betting_missingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Betting_missingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Betting_missingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
