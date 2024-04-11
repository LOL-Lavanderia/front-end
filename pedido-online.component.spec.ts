import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoOnlineComponent } from './pedido-online.component';

describe('PedidoOnlineComponent', () => {
  let component: PedidoOnlineComponent;
  let fixture: ComponentFixture<PedidoOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
