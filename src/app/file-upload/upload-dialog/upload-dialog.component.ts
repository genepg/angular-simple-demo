import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { forkJoin, Observable } from 'rxjs';
import { UploadService } from './upload.service';


@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  messages = [];
  uploading = false;
  files = new Set();

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    Object.entries(files).map(file => {
      // console.log('file', file);
      if (!isNaN(+file[0])) {
        this.files.add(file[1]);
      }
    });
    // console.log('this.files', this.files);
  }

  upload() {
    // set the component state to "uploading"
    this.uploading = true;
    this.messages = [];

    const messages: Observable<any>[] = this.uploadService.uploadFiles(this.files);

    messages.forEach((message, index) => {
      message.subscribe(res => {
        this.messages[index] = res;
      });
    });
  }

}
