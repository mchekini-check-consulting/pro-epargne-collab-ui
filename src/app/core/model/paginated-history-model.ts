import {OperationHistory} from "./operation-history-model";
import {Pagination} from "./pagination-model";

export interface PaginatedOperationHistory {
    data: OperationHistory[],
    pagination: Pagination
}

