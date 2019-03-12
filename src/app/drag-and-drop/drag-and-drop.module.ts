import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DragAndDropComponent } from './drag-and-drop.component';


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
  ],
  exports: []
})
export class DragAndDropModule { }
