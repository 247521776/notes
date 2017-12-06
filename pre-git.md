# pre-git与eslint结合使用

## pre-git

可以自动在项目上添加`precommit / pre-push`钩子  

[git地址](https://github.com/bahmutov/pre-git)

## eslint

用于代码书写检查  

[git地址](https://github.com/eslint/eslint)  

## pre-git与eslint结合使用

使用场景：在进行`git`操作时，自动进行`eslint`检测。  
  
前提条件：  

-  `pre-git`的安装
-  `eslint`全局或者项目安装
-  `babel-eslint`全局或者项目安装

使用在commit时检查所有js文件的书写  

```
// package.json
{
	"pre-commit": [
		"eslint *.js"
	]
}
```