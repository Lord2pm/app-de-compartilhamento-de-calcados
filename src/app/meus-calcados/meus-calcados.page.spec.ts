import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusCalcadosPage } from './meus-calcados.page';

describe('MeusCalcadosPage', () => {
  let component: MeusCalcadosPage;
  let fixture: ComponentFixture<MeusCalcadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusCalcadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
