import { BorrarTodoAction } from './../todo.actions';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reduces';
import { ToggleTodoAction, EditarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  chkField: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todo);
    this.chkField = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.txtInput, Validators.required );

    this.chkField.valueChanges
        .subscribe( () => {
          const action = new ToggleTodoAction( this.todo.id );
          this.store.dispatch( action );
        });
  }

  editar() {
    this.editando = true;
    setTimeout( () => {
      this.txtInputFisico.nativeElement.focus();
    }, 1 );
  }

  terminarEdicion() {
    this.editando = false;
    if ( this.txtInput.invalid ) {
      return;
    }

    if ( this.txtInput.value === this.todo.texto ) {
      return;
    }

    const action = new EditarTodoAction( this.todo.id, this.txtInput.value );
    this.store.dispatch( action );
  }

  borrar() {
    const action = new BorrarTodoAction( this.todo.id );
    this.store.dispatch( action );
  }

}
