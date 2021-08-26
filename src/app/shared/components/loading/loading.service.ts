import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef,
  ComponentRef,
} from '@angular/core';
import { LoadingComponent } from './loading.component';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

/** @dynamic */
@Injectable()
export class LoadingService {
  private isOpen = false;
  private currentComponentRef: ComponentRef<LoadingComponent> | null = null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(): void {
    /* istanbul ignore else */
    if (!this.isOpen) {
      this.isOpen = true;

      const componentRef = this.getElementRef();
      this.appendToContainer(componentRef);
      this.currentComponentRef = componentRef;
    }
  }

  close(): void {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
      this.isOpen = false;
    }
  }

  private getElementRef(): ComponentRef<LoadingComponent> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(LoadingComponent)
      .create(this.injector);

    return componentRef;
  }

  private appendToContainer(componentRef: ComponentRef<LoadingComponent>): void {
    this.appRef.attachView(componentRef.hostView);

    const loadingScreen = (componentRef.hostView as EmbeddedViewRef<LoadingComponent>)
      .rootNodes[0] as HTMLElement;

    const body = this.document.getElementsByTagName('body')[0];
    body.appendChild(loadingScreen);
  }
}
