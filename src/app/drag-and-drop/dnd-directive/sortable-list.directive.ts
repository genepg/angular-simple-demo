import { Directive, Output, EventEmitter, QueryList, ContentChildren, AfterContentInit, NgZone } from '@angular/core';
import { DragItemDirective } from './drag-item.directive';

export interface SortEvent {
  currentIndex: number;
  newIndex: number;
}

const distance = (rectA: ClientRect, rectB: ClientRect): number => {
  return Math.sqrt(
    Math.pow(rectB.top - rectA.top, 2) +
    Math.pow(rectB.left - rectA.left, 2)
  );
};

const hCenter = (rect: ClientRect): number => {
  return rect.left + rect.width / 2;
};

const vCenter = (rect: ClientRect): number => {
  return rect.top + rect.height / 2;
};

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective implements AfterContentInit {
  @ContentChildren(DragItemDirective) dragItems: QueryList<any>;

  @Output() sort = new EventEmitter<SortEvent>();

  private clientRects: ClientRect[];

  constructor(private ngZone: NgZone) { }

  ngAfterContentInit() {
    this.dragItems.forEach(dragItem => {
      dragItem.dragStart.subscribe(() => this.measureClientRects());
      dragItem.dragMove.subscribe(event => this.detectSorting(dragItem, event));
    });
  }

  private measureClientRects() {
    this.clientRects = this.dragItems.map(dragItem => dragItem.elementRef.nativeElement.getBoundingClientRect());
  }

  private detectSorting(dragItem: any, event: PointerEvent) {
    const currentIndex = this.dragItems.toArray().indexOf(dragItem);
    console.log(this.clientRects[currentIndex]);
    const currentRect = this.clientRects[currentIndex];

    this.clientRects
      .slice()
      .sort((rectA, rectB) => distance(rectA, currentRect) - distance(rectB, currentRect))
      .filter(rect => rect !== currentRect)
      .some(rect => {
        const isHorizontal = rect.top === currentRect.top;
        const isBefore = isHorizontal ?
          rect.left < currentRect.left :
          rect.top < currentRect.top;

        const moveBack = isBefore && (isHorizontal ?
          event.clientX < hCenter(rect) :
          event.clientY < vCenter(rect)
        );

        const moveForward = !isBefore && (isHorizontal ?
          event.clientX > hCenter(rect) :
          event.clientY > vCenter(rect)
        );

        if (moveBack || moveForward) {
          this.sort.emit({
            currentIndex,
            newIndex: this.clientRects.indexOf(rect)
          });

          return true;
        }

        return false;
      });
  }

}
