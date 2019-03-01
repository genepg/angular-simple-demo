import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';

const routes: Routes = [
  { path: '', component: FileUploadComponent },
];

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class FileUploadModule { }
