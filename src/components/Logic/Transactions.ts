import { observable, computed } from 'mobx';

export class Transactions {

    @observable transactions: any;
    
    constructor() {}

    // last transactions

    @computed get last_buy_trans() {
        let is_last_buy = true;
        let filterTrans = this.transactions.filter((trans: { status: string, role: string }) => {
            if (trans.status == 'released' && trans.role == 'buyer' && is_last_buy) return trans
            if (trans.status == 'released' && trans.role == 'seller') is_last_buy = false;
        });

        return filterTrans;
    }

    // summary total

    @computed get total_buy() {
        let total = 0;
        this.buy_trans.map((trans: { fiat_amount: number }) => {
            total = total + Number(trans.fiat_amount);
        });

        return total;
    }

    @computed get total_sell() {
        let total = 0;
        this.sell_trans.map((trans: { fiat_amount: number }) => {
            total = total + Number(trans.fiat_amount);
        });

        return total;
    }

    @computed get total_profit() {
        return this.total_sell - this.total_buy;
    }

    @computed get buy_trans() {
        let filterTrans = this.transactions.filter((trans: { status: string, role: string }) => {
            if (trans.status == 'released' && trans.role == 'buyer') return trans
        });

        return filterTrans;
    }

    @computed get sell_trans() {
        let filterTrans = this.transactions.filter((trans: { status: string, role: string }) => {
            if (trans.status == 'released' && trans.role == 'seller') return trans
        });

        return filterTrans;
    }

    @computed get numbTrans() {
        return this.transactions.length;
    }
}