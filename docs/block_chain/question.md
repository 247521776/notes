# 区块链问题

## 双花问题

比如我们手中有1000个BTC，我们往交易所中充值1000BTC，紧接着我们花费这1000BTC，然后控制51%的算力，更快的生成新的块，导致交易所中的充值失败，退回这1000BTC。

## 算力攻击

算力攻击是获取51%以上的算力，然后利用自己的算力优势来篡改区块链上的记录，从而达到撤销已付款的交易的目的。

通常情况下我们发起一次转账之后至少要等待6个区块的确认，才能将其视为是不可变的交易。因为需要篡改的区块数量越多，实现的难度就越大。