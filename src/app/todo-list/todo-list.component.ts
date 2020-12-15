import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router, RouterModule } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

// import { QRCodeModule } from 'angular2-qrcode';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css'],
    providers: [VoiceRecognitionService]
})

export class TodoListComponent implements OnInit {

    private todoList: TodoListData;
    public myAngularxQrCode: any = null;
    public selectAllItems = false;
    public position = -1;
    public history = [];

  // private tempTotalItems: TodoItemData[];
    location: any;
    isSingleClick: Boolean = true;

    constructor(private todoService: TodoService, public service : VoiceRecognitionService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
        this.myAngularxQrCode = JSON.stringify(this.todoList);

        if (!('webkitSpeechRecognition' in window)) {
          console.log('SpeechRecognition ne fonctionne pas sur ce navigateur');
          return;
        }
        this.service.init();
    }

    ngOnInit() {
      this.history = JSON.parse(localStorage.getItem("history")) || [];
      this.position = this.history.length - 1;
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

        this.saveHistory();
    }

    itemDone(item: TodoItemData, done:boolean){
        this.todoService.setItemsDone(done, item);
      this.saveHistory();
    }

    itemChange(item: TodoItemData, label:string){
        this.todoService.setItemsLabel(label, item);
    }

    deleteItem(item: TodoItemData){
        this.todoService.removeItems(item);
        this.saveHistory();
    }

    // cancelEditing(item: TodoItemData) {
    //     item.editing = false;
    // }

    deleteItems(){
        this.todoList.items.forEach(item => {
            if(item.isDone == true)
                this.deleteItem(item);
        });

      this.saveHistory();
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
      this.saveHistory();
    }

    selectAll(){
      this.selectAllItems = !this.selectAllItems;
      this.todoList.items.forEach(item => {
          this.todoService.setItemsDone(this.selectAllItems, item);
      });
      this.saveHistory();
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

    itemChangeLabel(label:string){
        this.todoService.setLabel(label);
    }

    get editable(){
        return this.todoList.editable;
    }
    ///////////////////////////////////////

    startService(){
        this.service.start();
      }

    stopService(){
      this.service.stop();
    }

    getHistory(){
      return JSON.parse(localStorage.getItem("history")) || [];
    }

    saveHistory(){
      this.history = this.getHistory();

      if (!this.history) {
        return;
      }

      if (this.todoList.items.length <=0) {
        localStorage.setItem("history", '[]');
      } else {
        this.history.push(this.todoList);
        localStorage.setItem("history",JSON.stringify(this.history));
        this.position = this.history.length - 1;

        console.log(this.history, this.position);
      }
    }

    undoOperator(){
      this.history = this.getHistory();
      this.position = this.position -1;
      if(this.history && this.history[this.position]){
        this.todoList.items =this.history[this.position].items;
      }
      console.log(this.history,this.position);
    }

    redoOperator(){
      this.history = this.getHistory();
      this.position = this.position + 1;

      if(!this.history){
        return;
      }

      if(this.position <= this.history.length -1 && this.history[this.position]){
          this.todoList.items =this.history[this.position].items;
      }
      console.log(this.history,this.position);
    }


}
