import { waitForAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [LoadingComponent],
        providers: [LoadingService],
      }).overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [LoadingComponent] },
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test open component', () => {
    service.open();

    expect(service.isOpen).toEqual(true);
  });

  it('test close component', () => {
    service.open();
    service.close();

    expect(service.isOpen).toEqual(false);
  });
});
