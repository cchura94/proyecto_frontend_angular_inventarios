import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVenta } from './nota-venta';

describe('NotaVenta', () => {
  let component: NotaVenta;
  let fixture: ComponentFixture<NotaVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVenta],
    }).compileComponents();

    fixture = TestBed.createComponent(NotaVenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
