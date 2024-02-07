import { Routes } from '@angular/router';
import {OperationsComponent} from "./operations.component";
import {FinancialOperationComponent} from "./container/financial-operation/financial-operation.component";
import {TableOverviewExample} from "./container/financial-operation/component/financial-operation-list";

export default [
    {
        path     : '',
        component: FinancialOperationComponent,
    },
    {
        path     : 'list',
        component: TableOverviewExample,
    },
] as Routes;
