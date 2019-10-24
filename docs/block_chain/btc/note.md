# btc指南

## 安装依赖

```
> brew install autoconf automake berkeley-db4 libtool boost miniupnpc openssl pkg-config protobuf
> brew install libevent
```

## 下载`btc`源码

[下载地址](https://github.com/bitcoin/bitcoin)  
基于`v0.18.1`版本学习  

`> git checkout v0.18.1 -b <branch_name>`  

## 编译

```
> ./autogen.sh
> ./configure --without-gui
> make
> make install
```

编译成功后拥有以下命令  

```
bitcoin-cli     bitcoin-tx      bitcoin-wallet  bitcoind
```

## 搭建私链

`> bitcoind -regtest -daemon`  
- regtest 指定使用私链，不加该参数则连接主链，testnet参数则是使用测试链 

**注意**
启动时未指定数据目录，则使用默认目录(`~/Library/Application\ Support/Bitcoin`)。
  
#### `bitcoind` 参数  

|参数|作用|
|---|---|
| `-conf=<文件名>` | 指定配置文件（默认：bitcoin.conf）|
| `-pid=<文件名> ` |指定 pid （进程 ID）文件（默认：bitcoind.pid|
| `-gen` | 生成比特币 |
| `-gen=0` | 不生成比特币 |
| `-min` | 启动时最小化 |
| `-splash` | 启动时显示启动屏幕（默认：1） |
| `-datadir=<目录名>` | 指定数据目录 |
| `-dbcache=` | 设置数据库缓存大小，单位为兆字节（MB）（默认：25 |
| `-dblogsize=` | 设置数据库磁盘日志大小，单位为兆字节（MB）（默认：100） |
| `-timeout=` | 设置连接超时，单位为毫秒 |
| `-proxy=` | 通过 Socks4 代理链接 |
| `-dns` | addnode 允许查询 DNS 并连接 |
| `-port=<端口>` | 监听 <端口> 上的连接（默认：8333，测试网络 testnet：18333） |
| `-maxconnections=` | 最多维护 个节点连接（默认：125） |
| `-addnode=` | 添加一个节点以供连接，并尝试保持与该节点的连接 |
| `-connect=` | 仅连接到这里指定的节点 |
| `-irc` | 使用 IRC（因特网中继聊天）查找节点（默认：0） |
| `-listen` | 接受来自外部的连接（默认：1） |
| `-dnsseed` | 使用 DNS 查找节点（默认：1）|
| `-banscore=` | 与行为异常节点断开连接的临界值（默认：100）|
| `-bantime=` | 重新允许行为异常节点连接所间隔的秒数（默认：86400） |
| `-maxreceivebuffer=` | 最大每连接接收缓存，1000 字节（默认：10000） |
| `-upnp` | 使用全局即插即用（UPNP）映射监听端口（默认：0）|
| `-detachdb` | 分离货币块和地址数据库。会增加客户端关闭时间（默认：0）|
| `-paytxfee=` | 您发送的交易每 KB 字节的手续费 |
| `-testnet` | 使用测试网络 |
| `-debug` | 输出额外的调试信息 |
| `-logtimestamps` | 调试信息前添加时间戳 |
| `-printtoconsole` | 发送跟踪/调试信息到控制台而不是 debug.log 文件 |
| `-printtodebugger` | 发送跟踪/调试信息到调试器 |
| `-rpcuser=<用户名>` | JSON-RPC 连接使用的用户名 |
| `-rpcpassword=<密码>` | JSON-RPC 连接使用的密码 |
| `-rpcport=` | JSON-RPC 连接所监听的 <端口>（默认：8332）|
| `-rpcallowip=` | 允许来自指定 地址的 JSON-RPC 连接 |
| `-rpcconnect=` | 发送命令到运行在 地址的节点（默认：127.0.0.1）|
| `-blocknotify=<命令>` | 当最好的货币块改变时执行命令（命令中的 %s 会被替换为货币块哈希值）|
| `-upgradewallet` | 将钱包升级到最新的格式 |
| `-keypool=` | 将密匙池的尺寸设置为 （默认：100）|
| `-rescan` | 重新扫描货币块链以查找钱包丢失的交易 |
| `-checkblocks=` | 启动时检查多少货币块（默认：2500，0 表示全部）|
| `-checklevel=` | 货币块验证的级别（0-6，默认：1）|
  
查看是否已经启动私链  
`> ps -ef | grep bitcoind`  
 
```
784574713 38408     1   0 10:14上午 ??         0:01.01 bitcoind -regtest -daemon
784574713 38423 32889   0 10:14上午 ttys002    0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn bitcoind
```

查看端口是否占用  
`> lsof -i:18443`  

```
COMMAND    PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
bitcoind 38408 yanglei01    7u  IPv6 0xbb10fd549cd5b341      0t0  TCP localhost:18443 (LISTEN)
bitcoind 38408 yanglei01    8u  IPv4 0xbb10fd54bd86e901      0t0  TCP localhost:18443 (LISTEN)
```

### 添加用户

`> bitcoin-cli -regtest getnewaddress <label> <address_type>`  

返回结果(地址)：  

`2N8Em5rLg1QRrensXsv4DNM96zAnA7iXamq`

**注意**  
命令中如果不加`-regtest`，则会使用主链信息，因以上步骤都是基于私链，未启动主链服务，所以会导致本地找不到服务。

实例：  
`> bitcoind_cli -regtest getnewaddress`  
该命令中未添加label参数，默认会为""，且label可重复。  

### 查看用户列表

`> bitcoin-cli -regtest listlabels`  

返回结果(label的一个数组)：

```
[
  "",
  "user1"
]
```

### 查看用户详情  

`> bitcoin-cli -regtest getaddressesbylabel <label>`  

返回结果(含有地址的对象)：

```
{
  "2N4W6LAScb5NL55aGxbmE9wWwUUMZseR6Yo": {
    "purpose": "receive"
  },
  "2N8Em5rLg1QRrensXsv4DNM96zAnA7iXamq": {
    "purpose": "receive"
  }
}
```

### 生成区块链  

`> bitcoin-cli -regtest generatetoaddress 101 2N8Em5rLg1QRrensXsv4DNM96zAnA7iXamq`  

返回结果(区块链的数组):

```
[
  "28a0f487bf47983b16dbe3d55d33047625bbc444f57dee44b8ae3c935201a031",
  "39e54a730d2a98cd21a864d33f27c6e3e1314935661bc86e03277738d86e4967",
  ...
]
```

**注意**
在回归测试链(又称私链)中前100块是拿不到btc的，只有生成第101块才有btc奖励。

### 查看余额

`> bitcoin-cli -regtest getbalance`

返回结果(btc数量):  

`50.00000000`

### 查看钱包详情

`> bitcoin-cli -regtest getwalletinfo`  

返回结果:

```
{
  "walletname": "",
  "walletversion": 169900,
  "balance": 50.00000000,
  "unconfirmed_balance": 0.00000000,
  "immature_balance": 5000.00000000,
  "txcount": 101,
  "keypoololdest": 1570846457,
  "keypoolsize": 999,
  "keypoolsize_hd_internal": 1000,
  "paytxfee": 0.00000000,
  "hdseedid": "1a59a6bc84f53ceaee42bb013a030ef07775f1f0",
  "private_keys_enabled": true
}
```

关键参数解释:  

|参数|诠释|
|---|---|
|`balance`|钱包中以 BTC 为单位已确认的总余额|
|`unconfirmed_balance`|钱包中以 BTC 为单位未确认的总余额|
|`immature_balance`|钱包中以 BTC 为单位未成熟的总余额|

### 查看所有地址、余额、用户

`> bitcoin-cli -regtest listaddressgroupings`

返回结果(含有地址、余额、label的数组):

```
[
  [
    [
      "2N8Em5rLg1QRrensXsv4DNM96zAnA7iXamq",
      50.00000000,
      ""
    ]
  ]
]
```

### 查询未花费的交易

`> bitcoin-cli -regtest listunspent`

返回结果:

```
[
  {
    "txid": "1207f9369cf245a98a0c1ec70ffbc73230aed9f02e430ae93a668b36141542d1",
    "vout": 0,
    "address": "2N8Em5rLg1QRrensXsv4DNM96zAnA7iXamq",
    "label": "",
    "redeemScript": "001413f806607a67ec3103bdcd120ac5b4685a203de0",
    "scriptPubKey": "a914a4736dad0dadf5d9209fb246960acaa326ea18a987",
    "amount": 50.00000000,
    "confirmations": 101,
    "spendable": true,
    "solvable": true,
    "desc": "sh(wpkh([12b1af8d/0'/0'/0']023018919a7fc94e8f5bd7cdc29ed45f17d4fcb1f5e7035945cc28f735782a4f13))#wvvzntz9",
    "safe": true
  }
]
```

### 转账

`> bitcoin-cli -regtest sendtoaddress <address> <amount>`

返回结果(交易id): 

`65da525c73ff2b300d97586d5d95ab37d560543f501dc261a059a9b3634ebe97`

### 查看交易详情

`> bitcoin-cli -regtest gettransaction <transaction_id>`

返回结果:

```
{
  "amount": 0.00000000,
  "fee": -0.00003320,
  "confirmations": 0,
  "trusted": true,
  "txid": "65da525c73ff2b300d97586d5d95ab37d560543f501dc261a059a9b3634ebe97",
  "walletconflicts": [
  ],
  "time": 1570865560,
  "timereceived": 1570865560,
  "bip125-replaceable": "no",
  "details": [
    {
      "address": "2MyoxcqeMuu4zdLkZfCRLCzCKX7NTSAX8xh",
      "category": "send",
      "amount": -2.00000000,
      "label": "user1",
      "vout": 0,
      "fee": -0.00003320,
      "abandoned": false
    },
    {
      "address": "2MyoxcqeMuu4zdLkZfCRLCzCKX7NTSAX8xh",
      "category": "receive",
      "amount": 2.00000000,
      "label": "user1",
      "vout": 0
    }
  ],
  "hex": "020000000001..."
}
```

### 复杂原始交易

准备数据  

|用户|地址|txid(交易id)|秘钥|余额|
|---|---|---|---|---|
|user0|`2N5MLsuLik6KZv498myhYotL7eNjizVKFSn`|`ef9263290ab3ec99ccd3515952ba40cd642101f343482534487a6a4bebd46ca5`|`cP3r3HDQvjhkbF35EYJP3GNATsN3VnVbRfG4eQA23PDYcnMZLmHB`|10|
|test_user|`2NEEqXaoGcgSvcJ81mNP6KSMC7Yka27FKbf`|`3ff3b7450cdaab2cfc51e3b2a751ed5d267b0fa8f13cf15789598d79ea4c3a56`|`cNooTKpG4YT7yi2m49LwS9rDBwoQqamJSF2gY1Uq59dg5daXwdho`|50|

#### 获取私钥命令  

`> bitcoin-cli -regtest dumpprivkey <address>`  

#### 目标账户  

|用户|地址|
|---|---|
|test_user3|`2MutSoWahS5rd63aXGT5YqEyLRUGhKLuirC`|
|test_user4|`2N5NPAzdcawtFivMW13zShQPR8CaqS21bkz`|

#### 创建RAW交易

```
> bitcoin-cli -regtest createrawtransaction '''
    [
        {
            "txid":"ef9263290ab3ec99ccd3515952ba40cd642101f343482534487a6a4bebd46ca5",
            "vout":1
        },
        {
            "txid":"3ff3b7450cdaab2cfc51e3b2a751ed5d267b0fa8f13cf15789598d79ea4c3a56",
            "vout": 0
        }
    ]
    ''' '''
    {
        "2MutSoWahS5rd63aXGT5YqEyLRUGhKLuirC": 49.999,
        "2N5NPAzdcawtFivMW13zShQPR8CaqS21bkz": 10
    }
    '''
```

返回结果(交易hex值): 

`0200000002a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000000ffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000000ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee8700000000`

##### 使用秘钥进行签名

第一次签名  

`> bitcoin-cli -regtest signrawtransactionwithkey 0200000002a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000000ffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000000ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee8700000000 "[\"cP3r3HDQvjhkbF35EYJP3GNATsN3VnVbRfG4eQA23PDYcnMZLmHB\"]"`

返回结果: 

```
{
  "hex": "02000000000102a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000017160014f535b6ff1281e91ec9de5b659f50f92063edbffaffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000000ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee870247304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d440290121024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace0000000000",
  "complete": false,
  "errors": [
    {
      "txid": "3ff3b7450cdaab2cfc51e3b2a751ed5d267b0fa8f13cf15789598d79ea4c3a56",
      "vout": 0,
      "witness": [
      ],
      "scriptSig": "",
      "sequence": 4294967295,
      "error": "Unable to sign input, invalid stack size (possibly missing key)"
    }
  ]
}
```

第二次签名  

`> bitcoin-cli -regtest signrawtransactionwithkey 02000000000102a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000017160014f535b6ff1281e91ec9de5b659f50f92063edbffaffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000000ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee870247304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d440290121024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace0000000000 "[\"cNooTKpG4YT7yi2m49LwS9rDBwoQqamJSF2gY1Uq59dg5daXwdho\"]"`

返回结果:

```
{
  "hex": "02000000000102a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000017160014f535b6ff1281e91ec9de5b659f50f92063edbffaffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000017160014b1456cd6e26d125175fc2f445220becdae742456ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee870247304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d440290121024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace0247304402205bd94ce812b30467a0524198a243a8e25910be868d6b01c0fba602e53542571d022008706c12d6edd2ee2fbe1b224634961fcf4d932be91471114c2936f875aee52c0121024b782b5ced427cf52d53cbd3209762c4dc70cd35a00d6ee054e91b354d19fb3200000000",
  "complete": true
}
```

##### 解密签名信息  

`> bitcoin-cli -regtest decoderawtransaction 02000000000102a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000017160014f535b6ff1281e91ec9de5b659f50f92063edbffaffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000017160014b1456cd6e26d125175fc2f445220becdae742456ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee870247304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d440290121024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace0247304402205bd94ce812b30467a0524198a243a8e25910be868d6b01c0fba602e53542571d022008706c12d6edd2ee2fbe1b224634961fcf4d932be91471114c2936f875aee52c0121024b782b5ced427cf52d53cbd3209762c4dc70cd35a00d6ee054e91b354d19fb3200000000`

返回结果:

```
{
  "txid": "c64cd124e490d695dd332e67f3f5b75d891e1d07d69eb2e9532deb90cd967ae2",
  "hash": "220e214351fce52bcdb23e8e8d73344da6710059fbc057b8061d924d33ba4e10",
  "version": 2,
  "size": 418,
  "vsize": 256,
  "weight": 1024,
  "locktime": 0,
  "vin": [
    {
      "txid": "ef9263290ab3ec99ccd3515952ba40cd642101f343482534487a6a4bebd46ca5",
      "vout": 1,
      "scriptSig": {
        "asm": "0014f535b6ff1281e91ec9de5b659f50f92063edbffa",
        "hex": "160014f535b6ff1281e91ec9de5b659f50f92063edbffa"
      },
      "txinwitness": [
        "304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d4402901",
        "024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace"
      ],
      "sequence": 4294967295
    },
    {
      "txid": "3ff3b7450cdaab2cfc51e3b2a751ed5d267b0fa8f13cf15789598d79ea4c3a56",
      "vout": 0,
      "scriptSig": {
        "asm": "0014b1456cd6e26d125175fc2f445220becdae742456",
        "hex": "160014b1456cd6e26d125175fc2f445220becdae742456"
      },
      "txinwitness": [
        "304402205bd94ce812b30467a0524198a243a8e25910be868d6b01c0fba602e53542571d022008706c12d6edd2ee2fbe1b224634961fcf4d932be91471114c2936f875aee52c01",
        "024b782b5ced427cf52d53cbd3209762c4dc70cd35a00d6ee054e91b354d19fb32"
      ],
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 49.99900000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_HASH160 1cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f OP_EQUAL",
        "hex": "a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f87",
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "2MutSoWahS5rd63aXGT5YqEyLRUGhKLuirC"
        ]
      }
    },
    {
      "value": 10.00000000,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_HASH160 84fc168e52d0e155903af1101a7293782f8cd6ee OP_EQUAL",
        "hex": "a91484fc168e52d0e155903af1101a7293782f8cd6ee87",
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "2N5NPAzdcawtFivMW13zShQPR8CaqS21bkz"
        ]
      }
    }
  ]
}
```

##### 广播

`> bitcoin-cli -regtest sendrawtransaction 02000000000102a56cd4eb4b6a7a4834254843f3012164cd40ba525951d3cc99ecb30a296392ef0100000017160014f535b6ff1281e91ec9de5b659f50f92063edbffaffffffff563a4cea798d598957f13cf1a80f7b265ded51a7b2e351fc2cabda0c45b7f33f0000000017160014b1456cd6e26d125175fc2f445220becdae742456ffffffff02606b042a0100000017a9141cfa56c5d9bcbc7d40f2443c5602a1fdd9f1423f8700ca9a3b0000000017a91484fc168e52d0e155903af1101a7293782f8cd6ee870247304402202aefe39fde61171887e5a747bb71a720fbe7c727404a2ed4f476f0360b9a7a6d02202188627953f1b9013c13d985abe226e35734d0b1a658691b2b1ab4cad6d440290121024b3d897dcb798a0fb447a64c14cc46cc702432ccefb81babf706c958fa242ace0247304402205bd94ce812b30467a0524198a243a8e25910be868d6b01c0fba602e53542571d022008706c12d6edd2ee2fbe1b224634961fcf4d932be91471114c2936f875aee52c0121024b782b5ced427cf52d53cbd3209762c4dc70cd35a00d6ee054e91b354d19fb3200000000`

返回结果:

`c64cd124e490d695dd332e67f3f5b75d891e1d07d69eb2e9532deb90cd967ae2`

### 离线签署

#### 准备未花费信息  

|用户|地址|txid|秘钥|余额|
|---|---|---|---|---|
|user|`2N7FfZDUdzaP3am6P876L3J1sXMXtNZUPcm`|`9c6b8dbe2a44576532627f9a65972240742244218ba5f639e6571d8a3fbc822f`|`cRapZ6AvDFyuqoTBWoX65LCMXCtFaA8nwBqtT9MHfghGQtjSBtH2`|50|

#### 目标账户

|用户|地址|
|---|---|
|user1|`2N2bxXRAqQDtGGchwa41S5NX5eFursWFjqu`|
|user2|`2N1mcKLH7Wj5PXCH8vPk3ZnziG4oQU3A8J9`|

#### 创建RAW交易

```
> bitcoin-cli -regtest createrawtransaction '''
    [
        {
            "txid":"9c6b8dbe2a44576532627f9a65972240742244218ba5f639e6571d8a3fbc822f",
            "vout":0
        }
    ]
    ''' '''
    {
        "2N2bxXRAqQDtGGchwa41S5NX5eFursWFjqu": 49.998
    }
    '''
    
02000000012f82bc3f8a1d57e639f6a58b21442274402297659a7f62326557442abe8d6b9c0000000000ffffffff01c0e4022a0100000017a91466a4f58ed137c872de259015044067730ccfcbc48700000000
```

#### 进行签名

```
> bitcoin-cli -regtest signrawtransactionwithkey 02000000012f82bc3f8a1d57e639f6a58b21442274402297659a7f62326557442abe8d6b9c0000000000ffffffff01c0e4022a0100000017a91466a4f58ed137c872de259015044067730ccfcbc48700000000 '''
["cRapZ6AvDFyuqoTBWoX65LCMXCtFaA8nwBqtT9MHfghGQtjSBtH2"]
'''

{
  "hex": "020000000001012f82bc3f8a1d57e639f6a58b21442274402297659a7f62326557442abe8d6b9c0000000017160014606dce96615c42c7e7ff06f0ddd8f408fa73f00dffffffff01c0e4022a0100000017a91466a4f58ed137c872de259015044067730ccfcbc487024730440220546fd776d7a2164c909ac828380858398d3dd20e1f989f83fac768258872210c0220677635f054d9cdf904d04289a02ad735208a3d7fd3af9edea414ac1f90da428201210386f7a44cf4a949fdc4a468bdccd523d166dc986714e49caec3a53224d29ceef400000000",
  "complete": true
}
```

#### 解密创建的RAW交易  

```
> bitcoin-cli -regtest decoderawtransaction 020000000001012f82bc3f8a1d57e639f6a58b21442274402297659a7f62326557442abe8d6b9c0000000017160014606dce96615c42c7e7ff06f0ddd8f408fa73f00dffffffff01c0e4022a0100000017a91466a4f58ed137c872de259015044067730ccfcbc487024730440220546fd776d7a2164c909ac828380858398d3dd20e1f989f83fac768258872210c0220677635f054d9cdf904d04289a02ad735208a3d7fd3af9edea414ac1f90da428201210386f7a44cf4a949fdc4a468bdccd523d166dc986714e49caec3a53224d29ceef400000000
 
{
  "txid": "aabbead0958d6d7d204368ea92246035dc2cee379b262c1a91376a3e1d454b35",
  "hash": "6b4c93de3ded4535ae466642c1abf9611d25f7ef632ac978915da049b196ab6b",
  "version": 2,
  "size": 215,
  "vsize": 134,
  "weight": 533,
  "locktime": 0,
  "vin": [
    {
      "txid": "9c6b8dbe2a44576532627f9a65972240742244218ba5f639e6571d8a3fbc822f",
      "vout": 0,
      "scriptSig": {
        "asm": "0014606dce96615c42c7e7ff06f0ddd8f408fa73f00d",
        "hex": "160014606dce96615c42c7e7ff06f0ddd8f408fa73f00d"
      },
      "txinwitness": [
        "30440220546fd776d7a2164c909ac828380858398d3dd20e1f989f83fac768258872210c0220677635f054d9cdf904d04289a02ad735208a3d7fd3af9edea414ac1f90da428201",
        "0386f7a44cf4a949fdc4a468bdccd523d166dc986714e49caec3a53224d29ceef4"
      ],
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 49.99800000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_HASH160 66a4f58ed137c872de259015044067730ccfcbc4 OP_EQUAL",
        "hex": "a91466a4f58ed137c872de259015044067730ccfcbc487",
        "reqSigs": 1,
        "type": "scripthash",
        "addresses": [
          "2N2bxXRAqQDtGGchwa41S5NX5eFursWFjqu"
        ]
      }
    }
  ]
}
```


#### 创建RAW交易

```
> bitcoin-cli -regtest createrawtransaction '''
    [
        {
            "txid":"aabbead0958d6d7d204368ea92246035dc2cee379b262c1a91376a3e1d454b35",
            "vout":0
        }
    ]
    ''' '''
    {
        "2N1mcKLH7Wj5PXCH8vPk3ZnziG4oQU3A8J9": 49.997
    }
    '''
    
0200000001354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000000ffffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd8700000000
```

#### 签名

```
> bitcoin-cli -regtest signrawtransactionwithwallet 0200000001354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000000ffffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd8700000000

{
  "hex": "0200000001354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000000ffffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd8700000000",
  "complete": false,
  "errors": [
    {
      "txid": "aabbead0958d6d7d204368ea92246035dc2cee379b262c1a91376a3e1d454b35",
      "vout": 0,
      "witness": [
      ],
      "scriptSig": "",
      "sequence": 4294967295,
      "error": "Input not found or already spent"
    }
  ]
}
```

签名失败，因为此次交易使用的交易id是上次交易，未广播生成的，所以需要使用公钥进行离线签名

```
> bitcoin-cli -regtest signrawtransactionwithwallet 0200000001354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000000ffffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd8700000000 '''
[
  {
    "txid": "aabbead0958d6d7d204368ea92246035dc2cee379b262c1a91376a3e1d454b35",
    "vout": 0,
    "scriptPubKey": "a91466a4f58ed137c872de259015044067730ccfcbc487",
    "amount": 49.997
  }
]
'''

{
  "hex": "02000000000101354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000017160014eebff7cc477d6e29e27d9eb7f1983bce91fe2c4affffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd870247304402200e030cdbb3dc643e53ee95bb378ba90436c1df11f85e413557ff64dc5975d13b02207f1c524986fadf394ec251949803134abee207a02913a0aff972cebc45bb32d40121034c53b4c14c716c40008d0f01657c2eb1a1a9d629d12cb561d0a0772670ee28a800000000",
  "complete": true
}
```

#### 广播

```
> bitcoin-cli -regtest sendrawtransaction 02000000000101354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000017160014eebff7cc477d6e29e27d9eb7f1983bce91fe2c4affffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd870247304402200e030cdbb3dc643e53ee95bb378ba90436c1df11f85e413557ff64dc5975d13b02207f1c524986fadf394ec251949803134abee207a02913a0aff972cebc45bb32d40121034c53b4c14c716c40008d0f01657c2eb1a1a9d629d12cb561d0a0772670ee28a800000000

error code: -25
error message:
Missing inputs
```

广播失败，因为此次交易是基于上次交易进行的，上次交易还未进行广播，故此次交易无法广播。  

##### 广播第一次交易  

```
> bitcoin-cli -regtest sendrawtransaction 020000000001012f82bc3f8a1d57e639f6a58b21442274402297659a7f62326557442abe8d6b9c0000000017160014606dce96615c42c7e7ff06f0ddd8f408fa73f00dffffffff01c0e4022a0100000017a91466a4f58ed137c872de259015044067730ccfcbc487024730440220546fd776d7a2164c909ac828380858398d3dd20e1f989f83fac768258872210c0220677635f054d9cdf904d04289a02ad735208a3d7fd3af9edea414ac1f90da428201210386f7a44cf4a949fdc4a468bdccd523d166dc986714e49caec3a53224d29ceef400000000

aabbead0958d6d7d204368ea92246035dc2cee379b262c1a91376a3e1d454b35
```

##### 广播第二次交易  

```
> bitcoin-cli -regtest sendrawtransaction 02000000000101354b451d3e6a37911a2c269b37ee2cdc35602492ea6843207d6d8d95d0eabbaa0000000017160014eebff7cc477d6e29e27d9eb7f1983bce91fe2c4affffffff01205e012a0100000017a9145d801fbc08fddc5cfdde08a1e4ec515b6e1393cd870247304402200e030cdbb3dc643e53ee95bb378ba90436c1df11f85e413557ff64dc5975d13b02207f1c524986fadf394ec251949803134abee207a02913a0aff972cebc45bb32d40121034c53b4c14c716c40008d0f01657c2eb1a1a9d629d12cb561d0a0772670ee28a800000000

error code: -26
error message:
non-mandatory-script-verify-flag (Signature must be zero for failed CHECK(MULTI)SIG operation) (code 64)
```