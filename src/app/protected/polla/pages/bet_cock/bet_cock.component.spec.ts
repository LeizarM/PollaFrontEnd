/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Bet_cockComponent } from './bet_cock.component';

describe('Bet_cockComponent', () => {
  let component: Bet_cockComponent;
  let fixture: ComponentFixture<Bet_cockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bet_cockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bet_cockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
