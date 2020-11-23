import {Component, OnInit, Input, HostListener } from '@angular/core';
import { TodoService } from '../todo.service';
import { TodoItemData } from '../dataTypes/TodoItemData';
import { FormArray, FormControl } from '@angular/forms';
import { TodoListData } from '../dataTypes/TodoListData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() public data: TodoItemData;
  //check if there is a field that is already being edited
  private keepTrack:TodoItemData;
  location: any;

  constructor( private todoService: TodoService, private _router: Router ) {         
    _router.events.subscribe((data:any) => { 
      if (data.url) {
        this.location = data.url;
        // console.log(_router.url);
        console.log(data.url);

      }
      // if (data.routerEvent) {
      //   console.log('YII');
      //   console.log(data.routerEvent);
      //   this.location = data.routerEvent.url;
      // }else{
      //   console.log('NO');
      //   console.log(data);
      // }
      // console.log(data.url);
    });
 }

  ngOnInit() {
    this._router.navigate([''])
  }

  get label() : string {
    return localStorage.getItem('label');
    // return this.data.label;
  }

  get isDone() : boolean {
    // return JSON.parse(localStorage.getItem('items')).;
    return this.data.isDone;
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
    if(this.keepTrack != null)
    //if there is an opened field that's being edited
    //then close that one and open another one that is being double clicked
      this.keepTrack.editing = false;

    item.editing = true;
    this.keepTrack = item;
  }

  ///////////////////////////////////////////////////// 
}


    

