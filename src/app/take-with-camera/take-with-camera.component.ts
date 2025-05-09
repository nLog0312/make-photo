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

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Đảm bảo render xong trước khi chụp
    setTimeout(() => {
      htmlToImage.toBlob(node, {
        // Giúp tránh lỗi caching ảnh
        cacheBust: true,
        pixelRatio: 2
      }).then((blob) => {
        if (!blob) return;

        if (isIOS) {
          // Dùng FileReader để chuyển blob thành base64
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;

            const newWindow = window.open();
            if (newWindow) {
              newWindow.document.write(`
                <html>
                  <head><title>Ảnh của bạn</title></head>
                  <body style="margin:0;">
                    <img src="${base64data}" style="width:100%;height:auto;" />
                  </body>
                </html>
              `);
            } else {
              alert('Vui lòng bật pop-up để xem ảnh.');
            }
          };
          reader.readAsDataURL(blob);
        } else {
          // Trình duyệt khác: tải ảnh trực tiếp
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'photo-strip.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }).catch((error) => {
        console.error('Lỗi khi xuất ảnh:', error);
      });
    }, 300); // Delay nhẹ để DOM ổn định
  }

}
