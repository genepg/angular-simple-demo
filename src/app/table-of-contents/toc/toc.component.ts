import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent implements OnInit {
  link = {
    id: 'section4'
  };

  rootUrl = this.router.url.split('#')[0];
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
