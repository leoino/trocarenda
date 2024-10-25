import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroPercentualComponent } from './parametro-percentual.component';

describe('ParametroPercentualComponent', () => {
  let component: ParametroPercentualComponent;
  let fixture: ComponentFixture<ParametroPercentualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParametroPercentualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParametroPercentualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
