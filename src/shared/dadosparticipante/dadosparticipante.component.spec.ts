import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosparticipanteComponent } from './dadosparticipante.component';

describe('DadosparticipanteComponent', () => {
  let component: DadosparticipanteComponent;
  let fixture: ComponentFixture<DadosparticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosparticipanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosparticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
