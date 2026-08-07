import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompra } from './nota-compra';

describe('NotaCompra', () => {
  let component: NotaCompra;
  let fixture: ComponentFixture<NotaCompra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompra],
    }).compileComponents();

    fixture = TestBed.createComponent(NotaCompra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
