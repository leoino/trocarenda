import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroPrazoComponent } from './parametro-prazo.component';

describe('ParametroPrazoComponent', () => {
  let component: ParametroPrazoComponent;
  let fixture: ComponentFixture<ParametroPrazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametroPrazoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametroPrazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
