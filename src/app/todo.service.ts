import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable, BehaviorSubject} from 'rxjs';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {

  private todoListSubject = new BehaviorSubject<TodoListData>( 
    // {label: 'TodoList', items: [], editable:false} 
    {
      label: localStorage.getItem('label') == null ? 'TodoList' : localStorage.getItem('label'),
      items: localStorage.getItem('items') == null ? [] : JSON.parse(localStorage.getItem('items')), 
      editable:false
    } 
  );

  constructor() { }

  getTodoListDataObservable(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    localStorage.setItem('label', label);
    this.todoListSubject.next( {
      label: label,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({ label:I.label, isDone: I.isDone, editing:I.editing }) ),
      editable:false
    });
  }

  setItemsLabel(label: string, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();

    const newItems = tdl.items.map( I => items.indexOf(I) === -1 ? I : ({ label, isDone: I.isDone, editing:I.editing }) );
    localStorage.setItem('items', JSON.stringify(newItems));

    this.todoListSubject.next( {
      label: tdl.label,
      items: newItems,
      editable:false
    });
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    const newItems = tdl.items.map( I => items.indexOf(I) === -1 ? I : ({ label: I.label, isDone, editing:I.editing }) );
    localStorage.setItem('items', JSON.stringify(newItems));
    this.todoListSubject.next( {
      label: tdl.label,
      items: newItems,
      editable:false
    });
    
  }

  setEditingDone(label: string, editing: boolean, ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    const newItems = tdl.items.map( I => items.indexOf(I) === -1 ? I : ({ label, isDone:I.isDone, editing}) );
    localStorage.setItem('items', JSON.stringify(newItems));
    this.todoListSubject.next( {
      label: tdl.label,
      items: newItems,
      editable:false
    });
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    const newItems = [...tdl.items, ...items];
    localStorage.setItem('items', JSON.stringify(newItems));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: newItems,
      editable:false
    });
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    const newItems = tdl.items.filter( I => items.indexOf(I) === -1 );
    localStorage.setItem('items', JSON.stringify(newItems));
    this.todoListSubject.next( {
      label: tdl.label, // ou on peut écrire: ...tdl,
      items: newItems,
      editable:false
    });
  }
}
