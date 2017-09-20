<style>
	.object {
		color: blue
	}
</style>
# Node.js内置的Error类型有：
-  <span class="object">`Error`</span>：通常的错误类型，如：`new Error("error")`
-  <span class="object">`SyntaxError`</span>: 语法错误，如：`require("some").limit()`
-  <span class="object">`ReferenceError`</span>: 引用错误，如引用一个未定义变量，如 `doNotExist`
-  <span class="object">`TypeError`</span>: 类型错误，如：`require('url').parse(() => { });`
-  <span class="object">`URIError`</span>: 全局的URI处理函数跑出的错误，如：`encodeURI("\uD800")`
-  <span class="object">`AssertError`</span>: 使用assert模块时抛出的错误，如：`assert(false)`
  
# 接收异常的方式
-  `try ··· catch`
-  `try ··· finally`
-  `try ··· catch ··· finally`  

### 细节
-  `try`语句可以嵌套在另一个`try`语句中，也可以嵌套在`catch`和`finally`块中
-  可以`throw`任何值，如一个字符串(**但请不要这样做，容易丢失错误栈**)
-  `error`通常有`name`、`message`、`stack`、 `constructor`属性  

# `stack trace`
错误栈本质上就是调用栈(或者叫堆栈追踪)。  
调用栈的概念：**每当有一个函数被调用，就会将之压入栈顶，调用完成之后从栈顶移除**  

### `Error.captureStackTrace`
`Error.captureStackTrace`是`Node.js`提供了一个`api`, 可以传入两个参数：  
`Error.captureStackTrace(targerObject[, constructorOpt])`  
在`targetObject`中添加一个`stack`属性，对该属性访问时，将以字符串的形式返回。  
`Error.captureStackTrace()`被调用时的代码位置信息(即：调用栈历史)  
举个例子：
<pre><code>const MyObject = {};
Error.captureStackTrace(MyObject);
console.log(MyObject.stack);

Error
    at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:2:7)
    at ...</code></pre>  

除了`targetObject`，`captureStackTrace`还接受一个类型为`function`的可选参数`contructorOpt`，当传入该参数时，调用栈中所有`contructorOpt`函数之上的信息(包括`contructorOpt`函数本身)，都会在访问`targetObject.stack`时被忽略。当需要对客户端隐藏内部实现的细节时，`contructorOpt`参数会很有用。传入第二个参数通常用于自定义错误。
<pre><code>function MyError() {
  Error.captureStackTrace(this, MyError)
  this.name = this.constructor.name
  this.message = 'you got MyError'
}

const myError = new MyError()
console.log(myError)
console.log(myError.stack)

MyError { name: 'MyError', message: 'you got MyError' }
Error
    at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:7:17)
    at ...</code></pre>  
如果去掉第二个参数：
<pre><code>function MyError() {
  Error.captureStackTrace(this)
  this.name = this.constructor.name
  this.message = 'you got MyError'
}

const myError = new MyError()
console.log(myError)
console.log(myError.stack)

MyError { name: 'MyError', message: 'you got MyError' }
Error
    at new MyError (/Users/nswbmw/Desktop/test/app.js:2:9)
    at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:7:17)
    at ...</code></pre>  
**可以看出：**出现了`MyError`相关的调用栈，但我们并不关心`MyError`及其内部实现，`captureStackTrace`第二个参数可以传入其他函数，不一定是当前函数，如：
<pre><code>const myObj = {}

function c() {
  Error.captureStackTrace(myObj, b)
}

function b() {
  c()
}

function a() {
  b()
}

a()
console.log(myObj.stack)

Error
    at a (/Users/nswbmw/Desktop/test/app.js:12:3)
    at Object.<anonymous> (/Users/nswbmw/Desktop/test/app.js:15:1)
    at ...</pre></code>
**可以看出：**`captureStackTrace`传入的第二个参数函数b，调用栈中隐藏了b函数及其以上所有的堆栈帧。
### `Error.perpareStackTrace`
V8暴露了另一个接口`Error.perpareStackTrace`，该接口是用来格式化`stack`，简单来讲就是定制`.stack`  
用法：`Error.perpareStackTrace(error, structuredStackTrace)`  
第一个参数是个 Error 对象，第二个参数是一个数组，每一项是一个 CallSite 对象，包含错误的函数名、行数等信息。  
异步错误信息在`node@8`以后提供了`async_hooks`模块。  
理解来源于文章 [石墨文档技术酒馆](https://zhuanlan.zhihu.com/p/28635475)