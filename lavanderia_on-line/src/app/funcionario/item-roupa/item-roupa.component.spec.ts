import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRoupaComponent } from './item-roupa.component';

describe('ItemRoupaComponent', () => {
  let component: ItemRoupaComponent;
  let fixture: ComponentFixture<ItemRoupaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemRoupaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemRoupaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
