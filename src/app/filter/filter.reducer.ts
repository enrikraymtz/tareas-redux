
import * as fromFiltro from './filter.action';

const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filterReducer( state = estadoInicial,
                               action: fromFiltro.acciones ): fromFiltro.filtrosValidos {
   switch ( action.type ) {

        case fromFiltro.SET_FILTER:
            return action.filtro;

        default:
            return state;
   }

}
