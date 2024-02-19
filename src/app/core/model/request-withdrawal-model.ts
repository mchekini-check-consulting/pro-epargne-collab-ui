export class RequestWithdrawalModel {
    amount: number;
    typeAccount: string | null;
    reasonUnblocking:  string | null;
    rib: string | null;
    attachedFile: string | null;
}
