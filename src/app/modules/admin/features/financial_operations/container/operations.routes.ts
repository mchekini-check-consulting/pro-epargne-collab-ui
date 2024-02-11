import {Routes} from '@angular/router';
import {FinancialOperationComponent} from "../component/financial-operation/financial-operation.component";
import {OperationsHistoryComponent} from "../component/operations-history/operations-history.component";


export default [
    {
        path: '',
        component: FinancialOperationComponent,
    },
    {
        path: 'operations-history.component.ts',
        component: OperationsHistoryComponent,
    },
] as Routes;


