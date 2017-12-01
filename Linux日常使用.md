# `Linux`日常使用

## 后台跑任务

使用情况：当我们使用命令行跑起一个服务的时候，又想不停服务的情况下退出干其他时使用。  

例子：
  
```
启动服务
> tabris serve
Server started.
此时服务启动
ctrl + z，使该服务后台暂停后
暂停提示信息为：
[1]+  Stopped                 tabris serve -w
> bg 1
此时服务已经在后台进程中运行
```

[参考来源](https://www.cnblogs.com/lwm-1988/archive/2011/08/20/2147299.html)  

或者使用`nohup`命令  
[nohup命令](https://www.cnblogs.com/allenblogs/archive/2011/05/19/2051136.html)