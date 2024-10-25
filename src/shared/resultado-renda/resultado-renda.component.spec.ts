import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoRendaComponent } from './resultado-renda.component';

describe('ResultadoRendaComponent', () => {
  let component: ResultadoRendaComponent;
  let fixture: ComponentFixture<ResultadoRendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoRendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoRendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
