import { Component, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-take-with-camera',
  templateUrl: './take-with-camera.component.html',
  styleUrls: ['./take-with-camera.component.scss']
})
export class TakeWithCameraComponent implements OnInit {
  images: { url: string | ArrayBuffer | null | undefined, file: File }[] = [];
  selectedFrame: any;

  frameOptions = [
    {
      name: 'Smile',
      url: 'assets/smile.png',
      styleImage1st: 'margin-top: 1.3em;'
    },
    {
      name: 'Green Clean Aesthetic Photostrip',
      url: 'assets/Green Clean Aesthetic Photostrip.png',
      styleImage1st: 'margin-top: -5px;'
    }
  ];


  ngOnInit(): void {
    this.selectedFrame = this.frameOptions[0];
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({ url: e.target?.result, file });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  downloadPhotostip() {
    let node = document.getElementById('photostrip-preview');
    if (!node) return;

    htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'photo-strip.png';
      link.click();
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }
}
