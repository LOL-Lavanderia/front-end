import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosAbertosComponent } from './pedidos-abertos.component';

describe('PedidosAbertosComponent', () => {
  let component: PedidosAbertosComponent;
  let fixture: ComponentFixture<PedidosAbertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidosAbertosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosAbertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
