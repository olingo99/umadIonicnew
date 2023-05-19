import { TestBed } from '@angular/core/testing';

import { EventTemplateService } from './event-template.service';

describe('EventTemplateService', () => {
  let service: EventTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
