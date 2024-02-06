import { Routes } from '@angular/router';
import {OperationsComponent} from "./operations.component";
import {FinancialOperationComponent} from "./container/financial-operation/financial-operation.component";

export default [
    {
        path     : '',
        component: FinancialOperationComponent,
    },
] as Routes;
