# 对mongodb的理解以及使用
<ol>
<li>主流存储引擎</li>
<li>存储类型</li>
<li>数据库操作</li>
<li>集合操作</li>
<li>数据类型</li>
<li>数据操作</li>
</ol>

[如何开启有权限的mongodb](http://www.cnblogs.com/zengen/archive/2011/04/23/2025722.html)

## 主流存储引擎

- `WiredTiger`
- `In-Memory`

### `WiredTiger`

**存储位置**  
`WiredTiger`引擎存储在**磁盘文件**中  
**1. 文档级别的并发操作**  
在大多数写操作，`WiredTiger`使用[乐观并发控制](http://www.cnblogs.com/Fandyx/archive/2012/07/14/2591153.html)，如果写操作发生冲突时，`mongodb`会将其中一个操作重新执行，这个过程是系统自动完成的。  
**2. 检查点(`Checkpoint`)**  
`Checkpoint`创建的时间间隔是**60s**或者产生**2G**日志文件，当`mongodb`发生错误而异常终止运行，`monggodb`重启时，使用上一个`Checkpoint`开始还原数据。  
**3. 预先记录日志**  
在写入数据之前先记录日志，日志记录结束之后进行数据的写入，好处在于`mongodb`系统崩溃，可以根据日志还原上次`Checkpoint`操作之后发生的数据更新。  
### `In-memory`

**存储位置**  
`In-Memory`引擎存储在**内存**当中

## 存储类型
`mongodb`文档类似`json`，但不完全是`json`。  
`json`只有六种类型：`null`、布尔值、数字、字符串、对象、数组  
`mongodb`在其基础上又扩展了几种字段，如日期

## 数据库操作
-  创建数据库：`use <newDb>`;
-  查看当前数据库：`db`
-  查看所有数据库：`show dbs`  
<span style="color:red;">注意：使用`show dbs`命令时，空数据库是不展示出来的。</sapn>
-  删除当前数据库：`db.dropDatabase()`  
<span style="color:red;">注意如果当前没有选择数据库，默认删除`test`数据库</span>

## 集合操作

-  创建集合：`db.createCollection(name, options)`  
<span style="color: red;">注意：如果不创建集合，在插入文档时，`mongodb`会自动创建</span>  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
|`name`|`String`|需创建集合的名称|
|`options`|`Object`|(可选)指定内存以及索引|

**`options`**参数  

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| `capped` | `boolean` | (可选)如果为`true`，则启动封闭的集合，需要通过设置`size`限制大小，当到达极限，则会覆盖旧的条目 |
| `autoIndexId` | `boolean` | (可选)如果为`true`，则在_id字段上自动创建索引。默认值为`false` |
| `size` | `number` | (可选)集合大小，如果`capped`为true，需指定此字段的值 |
| `max` | `number` | (可选)集合最大的文档数 |

-  查看集合：`show collections`
-  删除集合：`db.<collection name>.drop()`  
例如：`db.test.drop()`

## 数据类型

| 类型 | 描述 |
| --- | --- |
| 字符串 | 字符串必须为`UTF-8` |
| 整型 | 整型可以为32位或64位，取决于服务器 |
| 布尔类型 | `true/false` |
| 双精度浮点数 | 用于存储浮点数 |
| 数组 | 用于存储数组类型的值 |
| 时间戳 | `ctimestamp`,当文档修改添加时，方便进行录制 |
| 对象 | 用于嵌入文档 |
| `null` | 用于存储`null`值 |
| 符号 | 同字符串 |
| 日期 | 用于存储日期格式数据 |
| 对象id | 用于存储文档id |
| 二进制数据 | 用于存储二进制数据 |
| 代码 | 用于存储`js`代码 |
| 正则表达式 | 用于存储正则表达 |

## 数据操作

-  插入：`db.<collection_name>.insert(document)`
-  插入单条文档：`db.<collection_name>.insertOne(document)`
-  插入多条文档：`db.<collection_name>.insertManry([document, ...])`
-  查询：`db.<collection_name>.find(document)`  
显示格式化可以添加`pretty()`方法，如：`db.<collection_name>.find().pertty()`
-  查询单条文档：`db.<collection_name>.findOne()`  
  
| 操作 | 语法 | 示例 | `RDBMS`等效语句 |
| --- | --- | --- | --- |
| 相等 | `{<key> : <value>}` | `db.test.find({"user": "test"}).pertty()` | `where user="test"` |
| 小于 | `{<key> : {$lt : <value>}}` | `db.test.find({"age" : {$lt: 10}}).pertty()` | `where age < 10` |
| 小于等于 | `{<key>: { $lte : <value> }}` | `db.test.find({"age": {$lte: 10}}).pertty()` | `where age <= 10` |
| 大于 | `{<key> : {$gt : <value>}}` | `db.test.find({age: {$gt: 10}}).pertty()` | `where age > 10` |
| 大于等于 | `{<key> : {$gte : <value>}}` | `db.test.find({age: {$gte: 10}}).pertty()` | `where age >= 10` |
| 不等于 | `{<key> : {$ne : <value>}}` | `db.test.find({age: {$ne:10}}).pertty()` | `where age <> 10` | 
| `and`操作符 | `{$and:[{<key1>:<value1>},{<key2>:<value2>}]}` | `db.test.find({$and:[{"userName": "yang"}，{"age":10}]}).pertty()` | `where userName='yang' and age=10` |
| `or`操作符 | `{$or:[{<key1>:<value1>}, {<key2>:<value2>}]}` | `db.test.find({$or:[{"userName": "yang"}, {"age": 10}]}).pertty()` | `where userName= 'yang' or age= 10` |
| `and`和`or`一起使用 | `{<key>: <value>, {$or: [{<key1>:<value1>}, {<key2>: <value2>}]}}` | `db.test.find({"userName": "yang", {$or: [{"age" : 10}, {"sex": "man"}]}}).pertty()` | `where userName='yang and (age=10 or sex='man')'` |
  
-  查询嵌套字段  
数据：`{user: {age: 10, name: 'yang'}}`  
查询：`db.test.find({user.age: {$gt: 5}})`或者`db.test.find({user.name: "yang"})`
-  更新  
**`update`**
<pre><code>语法：db.collection_name.update(SELECTION\_CRITERIA, UPDATE\_DATA)
例如数据如下：
\> db.test.find({}, {_id:1, title: 1});
{"_id": 100, "title": "test"}
{"_id": 101, "title": "yang"}
更新数据如下：
\> db.test.update({"title": "yang"}, {$set: {"title": "this is update"}});
\> db.test.find({"_id": 101}, {"_id": 1, "title": 1});
{"_id": 101, "title": "this is update"}</code></pre>  
默认情况下，`mongodb`只会更新一个文档，要想更新多个文档需要设置`multi`为`true`。  
`db.test.update({"title": "yang"}, {$set: {"title": "this is update"}}, {"multi": true});`  
**`save`**
<pre><code>语法: db.collection_name.save({_id: ObjectId(), NEW\_DATA})
\> db.test.save({"_id": 100, "title": "this is save"})
\> db.test.find({"_id": 100}, {"_id" 1, "title": 1});
{"_id": 100, "title": "this is save"}</code></pre>  
 
-  删除  
`remove`可接受两个参数：  

| 参数 | 描述 |
| --- | --- |
| `criteria` | (可选)符合删除条件的集合将被删除 |
| `justOne` | (可选)如果为`true`或 1，则删除单条文档 |

<pre><code>语法如下：db.collection_name.remove(DELLETION_CRITTERIA)
> db.test.remove({"_id": 100});
删除单条数据
> db.test.remove({"title": "yang"}, 1);
删除全部数据
> db.test.remove();</code></pre>  

-  映射：`find`方法默认显示文档的所有字段，为了限制限制字段显示，可以讲字段设置成 1 或 0，显示为 1，隐藏为 0。  
<pre><code>语法：db.collection_name.find(document, {KEY: 1})
例如：
\> db.test.find({"title": "yang"}, {"_id": 1, "title": 1})
{"_id": 101, "title": "yang"}
db.test.find({"title": "yang"}, {"_id": 0, "title": 1})
相当于 db.test.find({"title": "yang"}, {"title": 1})</code></pre>  

-  限制条数   
**`limit`**   
需要显示的文档数
<pre><code>语法：db.collection_name.find().limit(NUMBER)
例如：
\> db.test.find({}).limit(1)
{"_id": 100, "title": "test"}</code></pre>
**`skip`**  
需要跳过的文档数，默认情况下为0  
<pre><code>语法：db.collection_name.find().limit().skip()
例如：
\> db.test.find({}).limit(1).skip(1)
{"_id": 101, "title": "yang"}</code></pre>  

-  排序  
使用`sort`方法进行排序，1 为升序，-1 为降序  
<pre><code>语法：db.collection_name.find().sort({KEY: 1})
例如：
\> db.test.find({}).sort({"_id": 1})</code></pre>  

-  索引  
创建索引: 升序 `db.collection_name.ensureIndex({KEY:1}, options)`或者降序 `db.collection_name.ensureIndex({KEY: -1}, options)`  
查询索引: `db.collection_name.getIndexes()`  
删除索引: `db.test.dropIndex({KEY: 1})`
<pre><code>复合索引
例如: db.test.ensureIndex({"_id": 1, "title": -1})</code></pre>
该索引被创建以后，基于`_id`和`title`的查询都会用上该索引，或者基于`_id`的查询也会用到该索引，但是基于`title`的查询则不会用到该复合索引，如果想要用到该索引，查询条件中需要包含复合索引中的前N个索引。  
[**`options参数`**](http://www.cnblogs.com/AlvinLee/p/6089276.html)

-  聚合  
<pre><code>语法: db.collection_name.aggregate(AGGREGATE\_OPERATION)
\> db.test.aggregate([{$group: {_id: "$title", num_tutorial: {$sum : 1}}}]);
相当于sql中的
\> select title as _id, count(*) as num_tutorial from test group by title</code></pre>
可用聚合列表  

| 表达式 | 描述 | 示例 | 
| --- | --- | --- |
| `$sum` | 计算总和 | `db.test.aggregate([{$group: {_id: "$title", sum: {$sum: "$title"}}}])` |
| `$avg` | 计算平均值 | `db.test.aggregate([{$group: {_id: "$title", avg: {$avg: "$_id"}}}])` |
| `min` | 获取集合中对应字段的最小值 | `db.test.aggregate([{$group: {_id: "$title", min: {$min: "$title"}}}])` |
| `max` | 获取集合中对应字段的最大值 | `db.test.aggregate([{$group: {_id: "$title", max: {$max: "$title"}}}])` |
| `$push` | 在结果文档中插入值到一个数组中 | `db.test.aggregate([{$group: {_id: "$title", push: {$push: "$title"}}}])` |
| `$addToSet` | 在结果文档中插入值到一个数组中，但不创建副本 | `db.test.aggregate([{$group: {_id: "$title", addToSet: {$addToSet: "$title"}}}])` |
| `$first` | 获取结果中第一条文档数据 | `db.test.aggregate([{$group: {_id: "$title", first: {$first: "$title"}}}])` | 
| `$last` | 获取结果中最后一条文档数据 | `db.test.aggregate([{$group: {_id: "$title", last: {$last: "$title"}}}])` | 