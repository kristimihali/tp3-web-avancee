import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Router, RouterModule } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Inject, Injectable } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import {AppComponent} from '../app.component';

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


  // private tempTotalItems: TodoItemData[];
    location: any;
    isSingleClick: Boolean = true;

    constructor(private todoService: TodoService, private viewContainerRef: ViewContainerRef, public service : VoiceRecognitionService) {
        todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
        this.myAngularxQrCode = JSON.stringify(this.todoList);

        if (!('webkitSpeechRecognition' in window)) {
          console.log('SpeechRecognition ne fonctionne pas sur ce navigateur');
          return;
        }
        this.service.init();
    }

    ngOnInit() {}

    getParentComponent(): AppComponent {
      return this.viewContainerRef['_data'].componentView.component
        .viewContainerRef['_view'].component;
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
                editing:false,
                position: {
                lat: this.getParentComponent().lat,
                lng: this.getParentComponent().lng
              }
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

    selectAll(){
      this.selectAllItems = !this.selectAllItems;
      this.todoList.items.forEach(item => {
          this.todoService.setItemsDone(this.selectAllItems, item);
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

   

}
