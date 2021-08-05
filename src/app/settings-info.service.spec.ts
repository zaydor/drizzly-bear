import { TestBed } from '@angular/core/testing';

import { SettingsInfoService } from './settings-info.service';

describe('SettingsInfoService', () => {
  let service: SettingsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
