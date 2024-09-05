import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myForm: FormGroup;
  outvalue: any;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      htmlContent1: new FormControl(''),
      htmlContent2: new FormControl('')
    });

    this.myForm.get('htmlContent2')?.valueChanges.subscribe(value => {
      console.log('HTML Content:', value);
      this.outvalue = value;
    });
  }

  // Function to handle file insertion in the editor
  handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const fileContent = event.target.result;

      if (file.type.startsWith('image/')) {
        // Insert image into the editor
        const imgTag = `<img src="${fileContent}" style="height: 200px;"  alt="Image" />`;
        this.insertHTML(imgTag);
      } else if (file.type === 'application/pdf') {
        // Insert PDF link into the editor
        const pdfLink = `<a href="${fileContent}" target="_blank">${file.name}</a>`;
        this.insertHTML(pdfLink);
      } else {
        // Insert other document link into the editor
        const docLink = `<a href="${fileContent}" download="${file.name}">${file.name}</a>`;
        this.insertHTML(docLink);
      }
    };
    reader.readAsDataURL(file); // Convert the file to base64 format
  };

  // Function to insert HTML content into the editor
  insertHTML(html: string) {
    const editorElement : any = document.querySelector('.angular-editor-textarea');
    if (editorElement) {
      editorElement.focus();
      document.execCommand('insertHTML', false, html);
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    upload: (file: File) => {
      this.handleFileUpload(file);
      return new Observable(); // Return an empty observable to satisfy the type
    },
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
}
