import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'tableOfContents',
    loadChildren: './table-of-contents/table-of-contents.module#TableOfContentsModule'
  },
  {
    path: 'dragAndDrop',
    loadChildren: './drag-and-drop/drag-and-drop.module#DragAndDropModule'
  },
  {
    path: 'fileUpload',
    loadChildren: './file-upload/file-upload.module#FileUploadModule'
  },
  {
    path: '**',
    redirectTo: '',
    // component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
