import { TestBed } from '@angular/core/testing';

import { CalcadosService } from './calcados.service';

describe('CalcadosService', () => {
  let service: CalcadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
