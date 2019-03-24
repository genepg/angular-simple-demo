import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TableOfContentsComponent } from './table-of-contents.component';
import { ArticleComponent } from './article/article.component';
import { TocComponent } from './toc/toc.component';

const routes: Routes = [
  { path: '', component: TableOfContentsComponent },
];
@NgModule({
  declarations: [
    TableOfContentsComponent,
    ArticleComponent,
    TocComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class TableOfContentsModule { }
