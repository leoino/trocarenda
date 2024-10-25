import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroReaisComponent } from './parametro-reais.component';

describe('ParametroReaisComponent', () => {
  let component: ParametroReaisComponent;
  let fixture: ComponentFixture<ParametroReaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametroReaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametroReaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
