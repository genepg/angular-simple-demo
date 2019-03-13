import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from 'src/app/material.module';

import { DragAndDropComponent } from './drag-and-drop.component';
import { DragItemDirective } from './dnd-directive/drag-item.directive';
import { SortableListDirective } from './dnd-directive/sortable-list.directive';
import { CdkDragAndDropComponent } from './cdk-drag-and-drop/cdk-drag-and-drop.component';

const routes: Routes = [
  { path: '', component: DragAndDropComponent },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DragAndDropComponent,
    DragItemDirective,
    SortableListDirective,
    CdkDragAndDropComponent,
  ],
  exports: []
})
export class DragAndDropModule { }
