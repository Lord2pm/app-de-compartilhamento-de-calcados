import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalcadosDisponiveisPage } from './calcados-disponiveis.page';

describe('CalcadosDisponiveisPage', () => {
  let component: CalcadosDisponiveisPage;
  let fixture: ComponentFixture<CalcadosDisponiveisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcadosDisponiveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
