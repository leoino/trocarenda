import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextosAjudaComponent } from './textos-ajuda.component';

describe('TextosAjudaComponent', () => {
  let component: TextosAjudaComponent;
  let fixture: ComponentFixture<TextosAjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextosAjudaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextosAjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
