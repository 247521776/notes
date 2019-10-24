# 使用ethereumjs-tx操作eth

## 离线签署

```
const EthereumTx = require('ethereumjs-tx').Transaction;

const txParams = {
    nonce: "0x2",
    gasPrice: "0x64",
    gasLimit: "0x9c40",
    to: "0x3e981b0d257ed887a323a5a49c476166028e4bd5",
    value: "0x05f5e100"
};

const privateKey = Buffer.from(
    "e53c6a5772602edbc62e43df34bc0656779614c5e5910a3afb400f5d426a0dbc",
    "hex"
);


const tx = new EthereumTx(txParams);

tx.sign(privateKey);

const serializedTx = tx.serialize();
const raw = "0x" + serializedTx.toString("hex");
console.log(raw);
```

## 问题

### `invalid sender`

该问题是由库本身引起的，使用版本**1.3.7**则不会出现该问题，并能广播成功