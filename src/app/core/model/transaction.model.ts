import {OperationTypeEnum} from "../enum/operation.type.enum";

export class TransactionModel {
    amount: Number;
    operationType: OperationTypeEnum;
    planType: String | undefined | null;
    comment: String | undefined | null;
}
