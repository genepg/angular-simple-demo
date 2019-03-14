import { Component, OnInit, ElementRef, NgZone, Output } from '@angular/core';
import { CdkDragEnd, CdkDragStart, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { takeWhile, debounceTime, sampleTime, filter } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-cdk-drag-and-drop',
  templateUrl: './cdk-drag-and-drop.component.html',
  styleUrls: ['./cdk-drag-and-drop.component.scss']
})
export class CdkDragAndDropComponent implements OnInit {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    '1',
    '1',
    '1',
    '1'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  activeDropContainer;
  activeDrag;
  draging;

  // @Output() dragStart: any = new EventEmitter();
  dragStartSource = new Subject();
  dragStart$ = this.dragStartSource.asObservable();

  autoScroll;

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  ngOnInit() {
    console.log('TEST', this.el.nativeElement);

  }

  dragEnded(event: CdkDragEnd) {
    this.dragStartSource.next('end');
  }

  dragStarted(event: CdkDragStart) {
    this.dragStartSource.next(event);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log(event.previousContainer);
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
