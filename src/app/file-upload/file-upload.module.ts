import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';

import { MaterialModule } from 'src/app/material.module';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

const routes: Routes = [
  { path: '', component: FileUploadComponent },
];

@NgModule({
  declarations: [FileUploadComponent, UploadDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  entryComponents: [
    UploadDialogComponent
  ],
  exports: [RouterModule],
})
export class FileUploadModule { }
