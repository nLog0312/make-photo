import { Component, OnInit } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-take-with-upload',
  templateUrl: './take-with-upload.component.html',
  styleUrls: ['./take-with-upload.component.scss']
})
export class TakeWithUploadComponent implements OnInit {
images: { url: string | ArrayBuffer | null | undefined, file: File }[] = [];
  selectedFrame: any;

  frameOptions = [
    {
      name: 'Smile',
      url: 'assets/images/smile.png',
      styleImage1st: 'margin-top: 1.3em;'
    },
    {
      name: 'Green Clean Aesthetic Photostrip',
      url: 'assets/images/Green Clean Aesthetic Photostrip.png',
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
    const node = document.getElementById('photostrip-preview');
    if (!node) return;

    const scale = 2;
    const style = window.getComputedStyle(node);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);

    htmlToImage.toCanvas(node, {
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${width}px`,
        height: `${height}px`,
      }
    }).then((canvas) => {
      // Tạo link tải ảnh từ canvas
      const link = document.createElement('a');
      link.download = 'photo-strip.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch((error) => {
      console.error('Lỗi khi xuất ảnh:', error);
    });
  }
}
