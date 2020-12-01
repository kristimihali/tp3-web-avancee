import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface UndoableState {
  past: any[];
  present: any;
  future: any[];
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UndoRedoModule {
  type: string;
  hint?: string;
 }
