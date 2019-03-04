import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { map } from 'rxjs/operators';

const url = 'http://localhost:3000/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return `File "${file.name}" is ${percentDone}% uploaded.`;

      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private upload(file: File) {
    // create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, file))
    );
  }

  uploadFiles(files: Set<File>) {
    const progressMessage = [];
    files.forEach(file => {
      progressMessage.push(this.upload(file));
    });
    return progressMessage;
  }

}
