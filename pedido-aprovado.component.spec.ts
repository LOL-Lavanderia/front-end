import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoAprovadoComponent } from './pedido-aprovado.component';

describe('PedidoAprovadoComponent', () => {
  let component: PedidoAprovadoComponent;
  let fixture: ComponentFixture<PedidoAprovadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoAprovadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoAprovadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
