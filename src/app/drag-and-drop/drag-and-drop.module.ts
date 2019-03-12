import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DragAndDropComponent } from './drag-and-drop.component';
import { DragItemDirective } from './dnd-directive/drag-item.directive';
import { SortableListDirective } from './dnd-directive/sortable-list.directive';

const routes: Routes = [
  { path: '', component: DragAndDropComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DragAndDropComponent,
    DragItemDirective,
    SortableListDirective,
  ],
  exports: []
})
export class DragAndDropModule { }
