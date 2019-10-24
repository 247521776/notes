# eth指南

## 安装ethereum

下载源码:   

`> git clone https://github.com/ethereum/go-ethereum`  

安装依赖:   

`> brew install go`  

编译:  

```
> cd go-ethereum
> make geth
```  

查看帮助信息，确定已经安装命令成功：  

`> /Users/yanglei01/work/go-ethereum/build/bin/geth --help`

## 创建创世块

每个区块链都始于创世块。第一次使用默认设置运行geth时，主网络生成块将提交给数据库。对于专用网络，通常需要一个不同的创世块。

这是一个自定义的genesis.json文件的例子。本config节确保某些协议升级立即可用。该alloc部分为帐户预付款。

创建**genesis.json**文件，内容如下:  

```
{
  "config": {
        "chainId": 10,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
  "coinbase"   : "0x0000000000000000000000000000000000000000",
  "difficulty" : "0x2000",
  "extraData"  : "",
  "gasLimit"   : "0x8000000",
  "nonce"      : "0x0000000000000042",
  "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
  "timestamp"  : "0x00",
  "alloc": {}
}
```
部分参数说明:

|参数|诠释|
|---|---|
|`config.chainId`|以太链的ID，用来唯一标记以太链|
|`coinbase`|矿工账号，第一个区块挖出来后将给这个矿工账号发送奖励|
|`difficulty`|难度值，越大越难|
|`extraData`|附加信息|
|`gasLimit`|gas的消耗总量限制，用来限制区块能包含的交易信息总和。因为是私链，填最大gas|
|`nonce`|一个64位随机数|
|`mixhash`|与nonce配合用于挖矿，由上一个块区的一部分生成的hash|
|`parentHash`|上一个区块的hash值|
|`alloc`|预设账号以及账号的以太币数量|

要创建使用此创世块的数据库

```
> geth --datadir path/to/custom/data/folder init genesis.json

INFO [10-16|13:53:09.481] Maximum peer count                       ETH=50 LES=0 total=50
INFO [10-16|13:53:09.531] Allocated cache and file handles         database=/Users/yanglei01/work/eth-data/geth/chaindata cache=16.00MiB handles=16
INFO [10-16|13:53:09.562] Writing custom genesis block
INFO [10-16|13:53:09.562] Persisted trie from memory database      nodes=3 size=399.00B time=199.862µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [10-16|13:53:09.563] Successfully wrote genesis state         database=chaindata hash=614a31…9df7ba
INFO [10-16|13:53:09.564] Allocated cache and file handles         database=/Users/yanglei01/work/eth-data/geth/lightchaindata cache=16.00MiB handles=16
INFO [10-16|13:53:09.590] Writing custom genesis block
INFO [10-16|13:53:09.591] Persisted trie from memory database      nodes=3 size=399.00B time=276.355µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [10-16|13:53:09.592] Successfully wrote genesis state         database=lightchaindata hash=614a31…9df7ba
```

## 创建私链

`> geth --datadir path/to/custom/data/folder  console 2`

如果不想污染控制台则可以执行下面命令:

`> geth --datadir path/to/custom/data/folder  console 2>>/dev/null`

## 常用命令

参考地址: 

[官方wiki](https://github.com/ethereum/wiki/wiki/JavaScript-API)
[web3js](https://web3js.readthedocs.io/en/v2.0.0-alpha)

### 查看账户

```
> eth.accounts
[]
```

### 新建账户

```
> personal.newAccount("password")
"0x6cc0211230eccd5b54a2540f119c031047fa7016"
```

### 查看账户余额

```
> eth.getBalance("0x6cc0211230eccd5b54a2540f119c031047fa7016")
0
```

#### 获取用户信息

```
geth account list
```

### 挖矿

miner.start中的参数为线程数，不添加参数，则默认是全力挖矿，会导致电脑过热，所以需要注意添加参数信息。

```
# 设置矿工，如果未设置矿工，默认会以第一个用户为矿工
> miner.setEtherbase("0x6cc0211230eccd5b54a2540f119c031047fa7016")
true

> miner.start(1)
null

# 停止挖矿
> miner.stop()
null

# 查看余额
> eth.getBalance(eth.accounts[0])
15000000000000000000
```

### 交易

```
# 新增账户
> personal.newAccount("password123")
"0x35769611c86271aac373681ba1e6391f73cf056d"

# 设置交易金额
> amount = web3.toWei(1);
"1000000000000000000"

> eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1],value:amount})
Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at <anonymous>:1:1
```

进行交易失败，原因是未进行账号的解锁，每个一段时间账号就会自动锁定，想要进行交易，需要先进行解锁。  

```
# 解锁账号
> personal.unlockAccount(eth.accounts[0])
Unlock account 0x5ed41736dce0646e87b54d9c74559b8ede7e50a8
Password:
true

> eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1],value:amount})
"0xf8e211142b00bf9ea6ba607b8900f977ee3ff2c0ad65ad4108d5ad8a4a574e9b"

> eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1],value:amount})
"0xf8e211142b00bf9ea6ba607b8900f977ee3ff2c0ad65ad4108d5ad8a4a574e9b"

> eth.getBalance(eth.accounts[1])
0

> txpool.status
{
  pending: 1,
  queued: 0
}
```

看到交易提交了，但是未被执行，因为**停止挖矿**就无法进行交易。

```
> miner.start(1)
null

> eth.getBalance(eth.accounts[1])
1000000000000000000

> personal.unlockAccount(eth.accounts[0])
Unlock account 0x5ed41736dce0646e87b54d9c74559b8ede7e50a8
Password:
true

> eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1],value:amount})
"0xf8e211142b00bf9ea6ba607b8900f977ee3ff2c0ad65ad4108d5ad8a4a574e9b"

> eth.getBalance(eth.accounts[1])
2000000000000000000

> miner.stop()
null
```

#### ether和Wei之间转换

```
# ether -> Wei
> web3.toWei(2.3543123);
"2354312300000000000"

# Wei -> ether
> web3.fromWei(2354312300000000000);
"2.3543123"
```
#### 查看交易详情

```
> web3.eth.getTransaction("0xf8e211142b00bf9ea6ba607b8900f977ee3ff2c0ad65ad4108d5ad8a4a574e9b")
{
  blockHash: "0x7dd7b4ccd7e939f4e26ef8b7f4fae587ee1d341341bed98539e259872449c55f",
  blockNumber: 4,
  from: "0x5ed41736dce0646e87b54d9c74559b8ede7e50a8",
  gas: 21000,
  gasPrice: 1000000000,
  hash: "0xf8e211142b00bf9ea6ba607b8900f977ee3ff2c0ad65ad4108d5ad8a4a574e9b",
  input: "0x",
  nonce: 0,
  r: "0x4d1000b48e23580f2333c753a15d99b0416183746f4e29d44e730bae5fd52ada",
  s: "0x42d21678de5bcf365aa545f06d21278224b7a624e64a6a8d4041a7182297c60",
  to: "0x35769611c86271aac373681ba1e6391f73cf056d",
  transactionIndex: 0,
  v: "0x38",
  value: 1000000000000000000
}
```

#### 离线交易

```
> account = personal.listAccount[0]
"0x5ed41736dce0646e87b54d9c74559b8ede7e50a8"

> personal.unlockAccount(account, "password", 15000)

> miner.start();
null

tx = eth.signTransaction({from:account, to:eth.accounts[1], value: 1000000000, gas:200000, gasPrice: 2000, nonce: 0})
{
  raw: "0xf866808207d083030d409435769611c86271aac373681ba1e6391f73cf056d843b9aca008038a067b6ba4c68d513303bd94ea2eab169ada228e106cc223f3f639a35e775ab4f7ba05cd338cb7e4889604dc878e913445ff2a327be3d240988e9f5080888f7b2bce6",
  tx: {
    gas: "0x30d40",
    gasPrice: "0x7d0",
    hash: "0xa0592d02d57ed2dc8f503ce26ab6303bfe6d3d41ececb8f4b8d8a4bddc5bae89",
    input: "0x",
    nonce: "0x0",
    r: "0x67b6ba4c68d513303bd94ea2eab169ada228e106cc223f3f639a35e775ab4f7b",
    s: "0x5cd338cb7e4889604dc878e913445ff2a327be3d240988e9f5080888f7b2bce6",
    to: "0x35769611c86271aac373681ba1e6391f73cf056d",
    v: "0x38",
    value: "0x3b9aca00"
  }
}

> eth.getBalance(eth.accounts[1])
3000000000000000000

> eth.getBalance(eth.accounts[0])
62000000000000000000

> eth.sendRawTransaction("0xf866808207d083030d409435769611c86271aac373681ba1e6391f73cf056d843b9aca008038a067b6ba4c68d513303bd94ea2eab169ada228e106cc223f3f639a35e775ab4f7ba05cd338cb7e4889604dc878e913445ff2a327be3d240988e9f5080888f7b2bce6")

> eth.getBalance(eth.accounts[1])
3000000001000000000

> eth.getBalance(eth.accounts[0])
2.191999999998e+21
```

**nonce**的信息可以根据命令`eth.getTransactionCount(account)`获取。