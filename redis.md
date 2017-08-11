# redis
使用库`node_redis  `
## 创建一个客户端
<pre><code>var redis = require("redis"),  
client = redis.createClient([options])</code></pre>;  
  
-  `host`
-  `port`
-  `path`
-  `url`
-  `password`
-  `db`
  
## 接收错误
`client.on("error", (err) => {});  `
## 存储数据
### 普通存储
`client.set(key, value, [callback]);`
### 哈希缓存
`client.hset(key, value, [callback]);  `
  
-  `client.hset(key, key1, value1, [callback])  = client.hset(key, {key1 : value1}, [callback]);  `
-  `client.hmset = client.hset  `
  
## 查询数据
### 普通查询
-  `client.get(key, (err, data) => {});`
### 哈希查询
-  获得所有key  
`client.hkeys(key, (err, data) => {});`
-  获得key的数据  
`client.hgetall(key, (err, data) => {});`
## 删除缓存
`client.del(key, (err, data) =>　{});`
## 断开连接
-  进行操作之后断开  
`client.quit();  `
-  未进行操作及时断开  
`client.end();`
