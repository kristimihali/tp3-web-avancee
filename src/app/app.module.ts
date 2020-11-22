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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// const routes: Routes = [
// 	{path: '', component: TodoListComponent, pathMatch: 'full'},
//   // {path: ':filter', component: TodoListComponent}
//   { path: 'signin', component: SigninComponent },
//   // { path: 'active', component: TodoListComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  imports: [
    // RouterModule.forRoot(routes, {useHash: true}),
    AppRoutingModule,
    BrowserModule, 
    FormsModule, 
    StorageServiceModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
