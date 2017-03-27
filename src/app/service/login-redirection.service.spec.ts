import { TestBed, inject } from '@angular/core/testing';

import { LoginRedirectionService } from './login-redirection.service';

describe('LoginRedirectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRedirectionService]
    });
  });

  it('should ...', inject([LoginRedirectionService], (service: LoginRedirectionService) => {
    expect(service).toBeTruthy();
  }));
});
