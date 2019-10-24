# 使用web3操作eth

## 离线签署

使用web3进行离线签署，是需要设置provider的。  
本地开启私链时需要配置rpc相关信息。  

`geth --rpc --rpccorsdomain "*" --port "30303" --rpcapi "db,personal,eth,web3" --networkid 95520 --nodiscover --verbosity=5 --rpcport "8456" --allow-insecure-unlock console 2>>/dev/null`  

|参数|作用|
|---|---|
|`rpc`|启用RPC服务|
|`rpcapi`|指定启用的RPC API|
|`rpcport`|指定RPC的端口|
|`rpccorsdomain`|指定哪些URL可以连接到你的节点|
|`nodiscover`| 关闭节点的可发现性，可以防止使用了相同network id和创世块的节点连接到你的区块链网络中（只能通过手动来添加节点|
|`allow-insecure-unlock`|允许通过http请求解锁账户|

js代码如下:

```
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8456"));

const address = "0x703ff5eeec322f9ee27570eb2ca1d8011b5217a7";
const password = "password";

const txParams = {
    "from": address,
    "to": "0x3e981b0d257ed887a323a5a49c476166028e4bd5",
    "nonce": 0,
    "value": 10000000,
    "gas": 32000,
    "gasPrice": 50000
};

transaction();

async function transaction() {
    await web3.eth.personal.unlockAccount(address, password, 1500);
    const tx = await web3.eth.signTransaction(txParams, address);
    console.log(tx);
}
```