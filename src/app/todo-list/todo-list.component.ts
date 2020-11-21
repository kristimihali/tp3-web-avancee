import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';


@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 
    
    private tempTotalItems: TodoItemData[];
    location: any;

    constructor(private todoService: TodoService, private _router: Router) {
         todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
         _router.events.subscribe((data:any) => { this.location = data.url; });
    }

    ngOnInit() {
    }
    
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        return this.todoList.items;
    }

    appendItem(label: string){
        if(label != "")
            this.todoService.appendItems({
                label,
                isDone:false,
                editing:false
            });
    }

    itemDone(item: TodoItemData, done:boolean){
        this.todoService.setItemsDone(done, item);
    }

    itemChange(item: TodoItemData, label:string){
        this.todoService.setItemsLabel(label, item);
    }
    
    deleteItem(item: TodoItemData){
        this.todoService.removeItems(item);
    }

    cancelEditing(item: TodoItemData) {
        item.editing = false;
    }

    deleteItems(){
        this.todoList.items.forEach(item => {
            if(item.isDone == true)
                this.deleteItem(item); 
        });
    }

    get completed() {
		return this.items.filter(t => t.isDone).length;
    }

    get completedItems(): TodoItemData[]{
        //this.tempTotalItems = this.todoList.items;
        return this.todoList.items = this.todoList.items.filter(t => t.isDone);
    }

    get left() {
        return this.items.length - this.items.filter(t => t.isDone).length;
    }
    
    get leftItems(): TodoItemData[]{
        return this.todoList.items = this.todoList.items.filter(t => t.isDone == false);
    }

    get allItems(): TodoItemData[]{
        return this.todoList.items;
    }

    public isVisited = false;
    public checkVisited(add:boolean) {
       // reverse the value of property
       this.isVisited = add ? true:false;
    }
}
