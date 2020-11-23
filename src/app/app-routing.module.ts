import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SigninComponent } from './authentication/signin/signin.component';


const routes: Routes = [

  { path: '', component: TodoListComponent },
  { path: 'active', component: TodoListComponent },
  { path: 'completed', component: TodoListComponent },
  // { path: 'signin', component:  SigninComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
