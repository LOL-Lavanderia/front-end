import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarPedidosComponent } from './visualizar-pedidos.component';

describe('VisualizarPedidosComponent', () => {
  let component: VisualizarPedidosComponent;
  let fixture: ComponentFixture<VisualizarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
