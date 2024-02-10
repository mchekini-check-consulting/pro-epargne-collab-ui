export interface Account {
    accountId: number;
    amount: number;
    type: 'PERECO' | 'PEE';
    riskLevel?: 'PRUDENT' | 'BALANCED' | 'DYNAMIC';
    managementMode?: 'FREE' | 'DELEGATED';
}
