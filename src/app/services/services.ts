import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Post } from '../data.service';
import { TruncatePipe } from '../truncate.pipe';
import {
  BehaviorSubject,
  combineLatest,
  map,
  startWith,
  Observable,
  catchError,
  of,
  tap
} from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {

  private search$ = new BehaviorSubject<string>('');

  loading = true;
  error = false;

  filtered$!: Observable<Post[]>;

  constructor(private data: DataService) {

    this.filtered$ = combineLatest([
      this.data.posts$.pipe(
        tap(() => this.loading = false),
        catchError(() => {
          this.loading = false;
          this.error = true;
          return of([]);
        })
      ),
      this.search$.pipe(startWith(''))
    ]).pipe(
      map(([posts, term]) =>
        posts.filter(p =>
          p.title.toLowerCase().includes(term.toLowerCase()) ||
          p.body.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  onSearch(value: string) {
    this.search$.next(value);
  }
}
