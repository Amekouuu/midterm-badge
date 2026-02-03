import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { DataService } from '../data.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  latest$!: Observable<any>;

  constructor(private data: DataService) {
    this.latest$ = this.data.posts$
      .pipe(map(posts => posts.slice(0, 5)));
  }
}
