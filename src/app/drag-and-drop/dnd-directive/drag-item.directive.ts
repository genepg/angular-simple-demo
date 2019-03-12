import { Directive, ElementRef, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragItem]'
})
export class DragItemDirective {
  @HostBinding('attr.draggable') draggable = true;

  @Output() dragStart = new EventEmitter<MouseEvent>();
  @Output() dragMove = new EventEmitter<DragEvent>();
  @Output() dragEnd = new EventEmitter<DragEvent>();

  constructor(public elementRef: ElementRef) { }

  // @HostListener('dragstart', ['$event'])
  // onDragStart(event) {
  //   console.log('onDragStart');
  // }

  @HostListener('mousedown', ['$event'])
  onDragStart(event) {
    this.dragStart.emit(event);
    // console.log('down');
  }

  @HostListener('drag', ['$event'])
  onDragMove(event) {
    this.dragMove.emit(event);
    // console.log('onDrag');
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    this.dragEnd.emit(event);
    // console.log('onDragEnd');
  }


}
