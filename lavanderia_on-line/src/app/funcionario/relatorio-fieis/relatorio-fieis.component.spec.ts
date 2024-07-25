import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFieisComponent } from './relatorio-fieis.component';

describe('RelatorioFieisComponent', () => {
  let component: RelatorioFieisComponent;
  let fixture: ComponentFixture<RelatorioFieisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioFieisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatorioFieisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
