# graphql

`graphql`是`facebook`创建的`API`查询语言。  
安装方式：`npm install graphql --save`  
[官网](http://graphql.org/graphql-js/)  
[中文网](http://graphql.cn/)  
[nodeje教程](https://www.howtographql.com/graphql-js/1-getting-started/)  

**优点**：可以灵活的设定返回数据结构  

## 模式定义语言(SDL)

定义一个简单的类型：  

```
type Person{
	name: String!
	age: Int!
}
```  

定义一个`Person`类型，有两个属性：`name`、`age`，数据类型为：`String`、`Ine`，且不为空，**`!`**代表不为空。  
  
定义一个嵌套型的类型：
  
```
type Post {
	title: String!
	author: Person!
}
```  

关系的另一端需要放在`Person`类型上：  

```
type Person {
	name: String!
	age: Int!
	posts: [Post!]!
}
```

这样我们就创建了一个一对多的关系。  

## 通过查询获取数据

基本查询：  
  
```
{
	person {
		name
	}
}
```  

返回结果  

```
{
	person: {
		name: 'yang'
	}
}
```  
  
查询与参数  
  
```
{
	person(name: 'yang') {
		age
	}
}
```  
  
返回结果  

```
{
	person : {
		age: 18
	}
}
```  
  
## 使用`mutation`写数据  

一般有三种`mutation`:  

-  创建新的数据: `createXXXX`  
-  更新现有数据: `updateXXXX`  
-  删除现有数据: `deleteXXXX`  

如何创建一个新的示例`Person`  

```
mutation {
	createPerson (name: 'yang', age: 18) {
		name
		age
	}
}
```  

返回结果

```
{
	createPerson: {
		name: 'yang',
		age: 18
	}
}
```  

## 实时更新与订阅

当一个客户订阅了一个事件时，它讲保持与服务端的连接。每当特定的事件发生时，服务器都会讲相应的数据推送给客户端。  
  
订阅一个事件：  
  
```
subscription {
	newPerson {
   		name
   		age
	}
}
```  

返回结果  

```
{
	"newPerson": {
   		"name": "yang",
   		"age": 18
	}
}
```  

## 定义一个模式  
  
查询的方式：  

```
type Query {
  	allPersons(last: Int): [Person!]!
}

type Mutation {
  	createPerson(name: String!, age: Int!): Person!
}

type Subscription {
  	newPerson: Person!
}

type Person {
  	name: String!
  	age: Int!
  	posts: [Post!]!
}

type Post {
  	title: String!
  	author: Person!
}
```

## 使用第三方库

使用第三方库有：  

-  `apollo-server-express`
-  `graphql-tools`
-  `dataloders`  

### `apollo-server-express`

该库用于后端服务所用。·  

### `graphql-tools`

该库用于生成模型对象。  

### `dataloders`

该库用于批量处理请求，减少数据库连接次数。
  
### 流程  

请求 -> `apollo-server-express` -> 权限认证(可有可无) -> `graphql-tools`  -> 解析器 ->  
数据库操作 -> `apollo-server-express` -> 响应