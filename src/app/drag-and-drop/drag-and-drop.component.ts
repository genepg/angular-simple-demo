import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {
  items = Array.from({length: 100}, (_, i) => i);

  constructor() { }

  ngOnInit() {
  }

  sort(event) {
    const current = this.items[event.currentIndex];
    const swapWith = this.items[event.newIndex];

    this.items[event.newIndex] = current;
    this.items[event.currentIndex] = swapWith;
  }

}
