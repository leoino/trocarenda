import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemDadosComponent } from './sem-dados.component';

describe('SemDadosComponent', () => {
  let component: SemDadosComponent;
  let fixture: ComponentFixture<SemDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
