import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import {TodoService} from './todo.service';
import {FormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { SigninComponent } from './authentication/signin/signin.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    SigninComponent,
    SpeechToTextComponent,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule, 
    // StorageServiceModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

    // NgxQRCodeModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
