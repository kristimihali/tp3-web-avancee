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
// import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    SigninComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule, 
    StorageServiceModule,
    // QRCodeModule

  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
