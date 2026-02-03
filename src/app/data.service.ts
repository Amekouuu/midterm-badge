import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {

  posts$!: Observable<Post[]>;

  constructor(private http: HttpClient) {
    this.posts$ = this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .pipe(shareReplay(1));
  }
}
