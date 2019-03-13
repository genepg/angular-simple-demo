import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkDragAndDropComponent } from './cdk-drag-and-drop.component';

describe('CdkDragAndDropComponent', () => {
  let component: CdkDragAndDropComponent;
  let fixture: ComponentFixture<CdkDragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdkDragAndDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdkDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
