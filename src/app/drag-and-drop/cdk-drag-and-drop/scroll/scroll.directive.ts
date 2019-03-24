import { Directive, ElementRef } from '@angular/core';

import { debounceTime, takeWhile } from 'rxjs/operators';
import { CdkDragAndDropComponent } from '../cdk-drag-and-drop.component';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  margin = 30;
  maxSpeed = 25;
  animationFrame: any;
  boundaryRect: ClientRect;
  point: { x: number; y: number } = { x: 0, y: 0 };

  activeDropContainer;
  activeDrag;
  draging;

  subscription;

  constructor(
    private elementRef: ElementRef,
    private cdkDragAndDropComponent: CdkDragAndDropComponent,
  ) {
    this.cdkDragAndDropComponent.dragStart$.subscribe(res => {
      this.boundaryRect = this.elementRef.nativeElement.getBoundingClientRect();
      if (res !== 'end') {
        this.dragStart(res);
      } else {
        this.dragEnd(res);
      }
    });
  }

  onMove(point: { x: number; y: number }) {
    this.point = point;
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(() => this.scrollTick());
  }

  scrollTick() {
    console.log('scrollTick');
    cancelAnimationFrame(this.animationFrame);
    if (this.autoScroll()) {
      this.animationFrame = requestAnimationFrame(() => this.scrollTick());
    }
  }

  autoScroll(): boolean {
    let scrollx;
    let scrolly;

    if (this.point.x < this.boundaryRect.left + this.margin) {
      scrollx = Math.floor(
        Math.max(
          -1,
          (this.point.x - this.boundaryRect.left) / this.margin - 1
        ) * this.maxSpeed
      );
    } else if (this.point.x > this.boundaryRect.right - this.margin) {
      scrollx = Math.ceil(
        Math.min(
          1,
          (this.point.x - this.boundaryRect.right) / this.margin + 1
        ) * this.maxSpeed
      );
    } else {
      scrollx = 0;
    }

    if (this.point.y < this.boundaryRect.top + this.margin) {
      scrolly = Math.floor(
        Math.max(-1, (this.point.y - this.boundaryRect.top) / this.margin - 1) *
          this.maxSpeed
      );
    } else if (this.point.y > this.boundaryRect.bottom - this.margin) {
      scrolly = Math.ceil(
        Math.min(
          1,
          (this.point.y - this.boundaryRect.bottom) / this.margin + 1
        ) * this.maxSpeed
      );
    } else {
      scrolly = 0;
    }

    setTimeout(() => {
      if (scrolly) {
        this.scrollY(scrolly);
      }

      if (scrollx) {
        this.scrollX(scrollx);
      }
    });

    return scrollx || scrolly;
  }

  scrollY(amount: number) {
    /*if (this.elementRef.nativeElement === window) {
      window.scrollTo(window.pageXOffset, window.pageYOffset + amount);
    } else {
      this.elementRef.nativeElement.scrollTop += amount;
    }*/
    const oldScrollTop = this.elementRef.nativeElement.scrollTop;
    this.elementRef.nativeElement.scrollTop += amount;
    if (this.scrollCallback) {
      this.scrollCallback({ x: 0, y: this.elementRef.nativeElement.scrollTop - oldScrollTop });
    }
  }

  scrollX(amount) {
    /*if (this.elementRef.nativeElement === window) {
      window.scrollTo(window.pageXOffset + amount, window.pageYOffset);
    } else {
      this.elementRef.nativeElement.scrollLeft += amount;
    }*/
    this.elementRef.nativeElement.scrollLeft += amount;
    if (this.scrollCallback) {
      this.scrollCallback({ x: amount, y: 0 });
    }
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }

  dragEnd(event) {
    this.draging = false;
    this.destroy();
    this.subscription.unsubscribe();
  }

  dragStart(event) {
    this.draging = true;
    this.activeDrag = event.source;

    this.activeDropContainer = event.source.dropContainer;

    this.subscription = this.activeDrag._dragRef.moved
      .pipe(
        debounceTime(10),
        takeWhile(_ => this.draging)
      )
      .subscribe(e => {
        console.log('moved');
        this.onMove(e.pointerPosition);
      });
  }



  scrollCallback({x, y}: { x: number; y: number }) {
    if (this.activeDropContainer) {
      const dropListRef: any = this.activeDropContainer._dropListRef;

      // https://github.com/angular/material2/issues/15343
      // ToDo: do not sync each scroll!
      // this.syncSiblings();

      // adjust containers
      // this.adjustContainers();
      // adjust items
      this.adjustItems(x, y);
      // ToDo: better condition for changed items
      // if (dropListRef._draggables.length > dropListRef._itemPositions.length) {
      //   this.syncItems();
      // }

      // draw rectungles for debug purpose
      // this.drawRects();
    }
  }

  adjustItems(deltaX: number, deltaY: number) {
    const dropListRef: any = this.activeDropContainer._dropListRef;
    dropListRef._itemPositions.forEach(it => {
      it.originalRect = it.originalRect || it.clientRect;
      it.clientRect = {
        ...it.clientRect,
        left: it.clientRect.left - deltaX,
        right: it.clientRect.right - deltaX,
        top: it.clientRect.top - deltaY,
        bottom: it.clientRect.bottom - deltaY
      };
    });
  }
}
