import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'tableOfContents',
    loadChildren: () => import('./table-of-contents/table-of-contents.module').then(m => m.TableOfContentsModule)
  },
  {
    path: 'dragAndDrop',
    loadChildren: () => import('./drag-and-drop/drag-and-drop.module').then(m => m.DragAndDropModule)
  },
  {
    path: 'fileUpload',
    loadChildren: () => import('./file-upload/file-upload.module').then(m => m.FileUploadModule)
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
