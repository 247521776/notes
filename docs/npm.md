# npm使用问题

## 下载依赖报`EINVALIDTAGNAME`

```
npm ERR! code EINVALIDTAGNAME
npm ERR! Invalid tag name "bn.js@4.11.8": Tags may not have any characters that encodeURIComponent encodes.

npm ERR! A complete log of this run can be found in:
```

解决办法: 删除node_modules，重新下载依赖