import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill'; // Import the QuillModule
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Observable, Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [QuillModule, CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {

  editorContent: string = '';
  private editorContentSubject: Subject<any> = new Subject();
  isLoading = false;
  backendApiUrl: string = 'http://127.0.0.1:8000/api/core/suggestions/';
  responseText: any = "";
 
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': [1, 2, 3, 4, 5, 6] }],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large'] }],
      [{ 'color': [] }, { 'background': [] }],

      [{ 'font': [] }],
      [{ 'align': [] }],

    ]
  };

  editorFormats = [
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'header', 'list', 'indent', 'script', 'font', 'color', 'background',
    'align'
  ];

  constructor(private http: HttpClient) {

    this.editorContentSubject.pipe(
      debounceTime(1000), // Wait 1s after the user stops typing
      switchMap(content => {

        this.isLoading = true
        this.http.post(this.backendApiUrl,{
          text: content
        }).subscribe(respone => {
          this.responseText = this.cleanApiResponse(respone);
          this.isLoading = false;
        })
        console.log('Making API call with content:', content);
        return this.apiCall(content);

      })
    ).subscribe();
  }

  onEditorContentChanged(event: any): void {
    this.editorContent = event.html;
    if ( this.editorContent && this.editorContent.length>100) {
      this.editorContentSubject.next(this.editorContent);
    }
  }

  apiCall(content: string) {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(content);
        observer.complete();
      }, 1000);
    });
  }

  cleanApiResponse(apiResponse: any): string {
    let cleanedResponse = apiResponse.replace(/```[a-z]*\n/g, ''); 
    cleanedResponse = cleanedResponse.replace(/```$/, '');
    cleanedResponse = cleanedResponse.trim();
    return cleanedResponse;
  }

  

}
