import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Database, ref, objectVal } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  data$: Observable<any[]> =  new Observable();;
  wordCount: number = 0;

  constructor(private db: Database) {}

  ngOnInit() {
    const testRef = ref(this.db, 'wordCounts');
    this.data$ = objectVal(testRef); // Fetches the object at 'default' path
    this.data$.subscribe((data) => {
      this.wordCount = Number(data);
    });
  }

}
