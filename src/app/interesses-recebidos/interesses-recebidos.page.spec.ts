import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InteressesRecebidosPage } from './interesses-recebidos.page';

describe('InteressesRecebidosPage', () => {
  let component: InteressesRecebidosPage;
  let fixture: ComponentFixture<InteressesRecebidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InteressesRecebidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
