import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoEfetuadaComponent } from './alteracao-efetuada.component';

describe('AlteracaoEfetuadaComponent', () => {
  let component: AlteracaoEfetuadaComponent;
  let fixture: ComponentFixture<AlteracaoEfetuadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlteracaoEfetuadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlteracaoEfetuadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
