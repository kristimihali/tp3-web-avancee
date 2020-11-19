import {Component, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    private todoList: TodoListData; 

    constructor(private todoService: TodoService) {
         todoService.getTodoListDataObservable().subscribe( tdl => this.todoList = tdl );
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

    // uneditable(itemIndex: TodoItemData){
    //     this.todoList.items.forEach(item => {
    //         if(item.editing == true)
    //             this.cancelEditing(item);
    //     });
        
    // }
}
