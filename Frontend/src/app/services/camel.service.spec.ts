import { TestBed } from '@angular/core/testing';
import { CamelService } from './camel.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CamelService', () => {
  let service: CamelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(CamelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});