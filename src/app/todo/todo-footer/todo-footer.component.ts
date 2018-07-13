import { Todo } from './../model/todo.model';
import { Component, OnInit } from '@angular/core';

import * as fromFiltro from '../../filter/filter.action';
import * as fromTodo from '../../todo/todo.actions';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reduces';
import { BorrarAllTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe( state => {
      this.filtroActual =  state.filtro;
      this.contarPendientes( state.todos );
    });
  }

  cambiarFiltro( nuevoFiltro: fromFiltro.filtrosValidos ) {
    const action = new fromFiltro.SetFiltroAction( nuevoFiltro );
    this.store.dispatch( action );
  }

  contarPendientes( todos: Todo[] ) {
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  borrarCompletado() {
    const action = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch( action );
  }

}
