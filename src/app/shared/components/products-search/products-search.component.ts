import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss'],
})
export class ProductsSearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  searchDebouncer = new Subject<string>();

  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.searchDebouncer
        .pipe(debounceTime(500))
        .pipe(distinctUntilChanged())
        .subscribe((value: string) => {
          this.search.emit(value);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearch(value: string): void {
    this.searchDebouncer.next(value);
  }
}
