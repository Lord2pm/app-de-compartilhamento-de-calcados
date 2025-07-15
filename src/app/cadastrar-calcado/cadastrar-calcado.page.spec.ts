import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarCalcadoPage } from './cadastrar-calcado.page';

describe('CadastrarCalcadoPage', () => {
  let component: CadastrarCalcadoPage;
  let fixture: ComponentFixture<CadastrarCalcadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarCalcadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
