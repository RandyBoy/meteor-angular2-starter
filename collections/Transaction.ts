export class Transaction {
    transaction = new Mongo.Collection('transactions');
    user = new Mongo.Collection('ausers');
    constructor() {
    }

    InitTransaction() {
        this.transaction.insert({ from: 'allenny.iteye.com', to: 'B', score: 10, state: 'initial' }, function (err, trans) {
            // 创建成功获得trans ID后，就可以开始事务了  
            this.beginTransaction(trans._id);
        });
    }

    RollbackScoreTransfer(transId, fnCallback) {
        this.transaction.findOne({ _id: transId }, (err, trans) => {
            // B用户的操作一定没有完成，无需处理，直接返还积分给A用户，同时需要清除与事务的关联。  
            this.user.update({ name: 'allenny.iteye.com', pendingTransactions: transId },
                {
                    $inc: { score: trans.score },
                    $pull: { pendingTransactions: transId }
                },
                (err, result) => {
                    fnCallback();// 完成rollback  
                });
        });
    }

    BeginTransaction(transId) {
        this.transaction.upsert({ _id: transId }, { $set: { state: 'pending' } }, (err, result) => {
            let cond_a = { name: 'allenny.iteye.com', pendingTransactions: { $ne: transId } };
            this.user.upsert(cond_a, { $inc: { score: -10 }, $push: { pendingTransaction: transId } }, (err, result) => {
                // 此处改变更新条件，增加用户状态检查  
                let cond_b = { name: 'B', state: { $ne: 'locked' }, pendingTransactions: { $ne: transId } };
                this.user.upsert(cond_b, { $inc: { score: 10 }, $push: { pendingTransaction: transId } }, (err, result) => {
                    if (err || !result) {
                        // 如果更新失败，则将回滚积分转移业务的函数传入rollback函数等待执行。  
                        this.Rollback(transId, this.RollbackScoreTransfer);
                    }
                    else {
                        this.Commit(transId);
                    }
                });
            });
        });
    }

    Commit(transId) {
        this.transaction.upsert({ _id: transId }, { $set: { state: 'committed' } }, (err, result) => {
            this.user.upsert({ name: 'allenny.iteye.com' }, { $pull: { pendingTransactions: transId } }, (err, result) => {
                this.user.upsert({ name: 'B' }, { $pull: { pendingTransactions: transId } }, (err, result) => {
                    this.EndTransaction(transId, function () {  // 取消关联后，可以直接完成该事务。  
                        console.log(' Transaction done');
                    });
                });
            });
        });
    }

    Rollback(transId, fnOperation) {
        // 先将事务状态变为'canceling'     
        this.transaction.update({ _id: transId }, { $set: { state: 'canceling' } }, (err, result) => {
            // 开始具体的回滚操作
            fnOperation(transId, () => {
                // 完成事务，将事务状态变为'canceled'， 回滚结束       
                this.EndTransaction(transId, () => {
                    console.log('Transaction rollback');
                });
            });
        });
    }

    EndTransaction(transId, fnCallback) {
        this.transaction.findOne({ _id: transId }, {
            fields: { 'state': 1 }, transform: (err, trans) => {
                if (trans.state == 'committed') {
                    this.transaction.update({ _id: transId }, { $set: { state: 'done' } }, (err, result) => {
                        // 其他处理  
                        fnCallback();
                    });
                } else if (trans.state == 'canceling') {
                    this.transaction.update({ _id: transId }, { $set: { state: 'canceled' } }, (err, result) => {
                        // 其他处理  
                        fnCallback();
                    });
                }
            }
        });
    }

}