import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionartiporendaComponent } from './selecionartiporenda.component';

describe('SelecionartiporendaComponent', () => {
  let component: SelecionartiporendaComponent;
  let fixture: ComponentFixture<SelecionartiporendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionartiporendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelecionartiporendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
