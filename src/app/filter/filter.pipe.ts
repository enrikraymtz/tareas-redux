import { Todo } from './../todo/model/todo.model';
import { Pipe, PipeTransform } from '@angular/core';

import * as fromFiltro from './filter.action';

@Pipe({
  name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: fromFiltro.filtrosValidos ): Todo[] {
    switch ( filtro ) {
      case 'completados':
        return todos.filter( todo => todo.completado );

      case 'pendientes':
        return todos.filter( todo => !todo.completado );

      default:
        return todos;
    }
  }

}
