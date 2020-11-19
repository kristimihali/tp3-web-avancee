import {Component, OnInit, Input, HostListener } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { FormArray, FormControl } from '@angular/forms';
import { TodoListData } from '../dataTypes/TodoListData';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() private data: TodoItemData;
  constructor( private todoService: TodoService ) { }

  ngOnInit() {
  }

  get label() : string {
    return this.data.label;
  }

  itemDone(item: TodoItemData, done:boolean){
    item.editing = false;
    this.todoService.setItemsDone(done, item); 
  } 

  itemDelete(item:TodoItemData){
    this.todoService.removeItems(item);
  }

  itemChange(item: TodoItemData, label:string){
    let editing = false;
    this.todoService.setEditingDone(label, editing, item);
    
  }

  edit(item:TodoItemData) {
    item.editing = true;

  }
  
  cancelEditingTodo(item: TodoItemData) {
    item.editing = false;
  }
  
}


    

