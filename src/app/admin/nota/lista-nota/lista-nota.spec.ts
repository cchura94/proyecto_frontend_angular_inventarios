import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNota } from './lista-nota';

describe('ListaNota', () => {
  let component: ListaNota;
  let fixture: ComponentFixture<ListaNota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNota],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaNota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
