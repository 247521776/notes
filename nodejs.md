# nodejs

<ul>
	<li><a href="#1">查看内存情况</a></li>
	<li><a href="#2">GC</a></li>
	<li><a href="#3">垃圾回收</a></li>
</ul>

## 查看内存情况<a name="1"></a>

```
const util = require("util");
console.log(util.inspect(process.memoryUsage()));
```  
-  `rss` : 常驻集的大小
-  `heapTotal` : 堆的总值
-  `heapUsed` : 实际使用的堆
-  `external` : 代表V8管理的，绑定到Javascript的C++对象的内存使用情况
  
## GC<a name="2"></a>

`nodejs`的`gc`方式为分代`gc`。  
`gc`有两类：`Young GC`和`Old GC`。  
`Young GC`: 大部分对象很快就失效，会频繁的执行该`GC`。  
`Old GC`: 一段时间内不能被回收，长时间存在的数据会执行该`GC`。

## 垃圾回收<a name="3"></a>

V8使用了两种类型的垃圾回收：  

-  `Scavenge`（提取）: 速度快但不彻底
-  `Mark-Sweep`（标记-清除）: 相对慢一点，但是可以回收所有未被引用的内存
  
相关连接:  
[深入理解Node.js中的垃圾回收和内存泄漏的捕获](http://www.csdn.net/article/1970-01-01/2826316)  
[Node.js 调试 GC 以及内存暴涨的分析](http://blog.csdn.net/lihuifeng/article/details/51984442)