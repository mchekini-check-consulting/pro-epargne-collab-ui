export interface OperationHistory {
    transactionId: number,
    amount: number,
    previousAmount: number,
    nextAmount: number,
    createdAt: string,
    type: string,
    comment: string

}
