import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CaretLeftOutline, SettingOutline, StepBackwardOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { TakeWithCameraComponent } from './take-with-camera/take-with-camera.component';
import { TakeWithUploadComponent } from './take-with-upload/take-with-upload.component';
import { FormsModule } from '@angular/forms';

const icons: IconDefinition[] = [StepBackwardOutline, CaretLeftOutline, SettingOutline];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TakeWithCameraComponent,
    TakeWithUploadComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NzIconModule.forChild(icons),
    ToastrModule.forRoot(),
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
