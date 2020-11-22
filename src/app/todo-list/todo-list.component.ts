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
    
    // private tempTotalItems: TodoItemData[];
    location: any;
    isSingleClick: Boolean = true;     

    constructor(private todoService: TodoService) {
         todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
    }

    ngOnInit() {
    }
    
    get label(): string {
        return this.todoList.label;
    }
    
    get items(): TodoItemData[] {
        // return JSON.parse(localStorage.getItem('items'));
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

    // cancelEditing(item: TodoItemData) {
    //     item.editing = false;
    // }

    deleteItems(){
        this.todoList.items.forEach(item => {
            if(item.isDone == true)
                this.deleteItem(item); 
        });
    }

    get completed() {
		return this.items.filter(t => t.isDone).length;
    }

    get left() {
        return this.items.length - this.items.filter(t => t.isDone).length;
    }
    

    get allItems(): TodoItemData[]{
        return this.todoList.items;
    }

    deleteAll(){
        this.todoList.items.forEach(item => {
                this.deleteItem(item); 
        });
    }
    ///////////////////////////////////////////////
    cancelEditing() {
        this.todoList.editable = false;
    }

    editLabel() {
        this.todoList.items.forEach(item => {
            if(item.editing){
                item.editing = !item.editing;
            }
        });
        this.todoList.editable = true;
    }

    itemChangeLabel(label:string, item: TodoItemData){
        this.todoService.setLabel(label, item);
    }

    get editable(){
        return this.todoList.editable;
    }

}
