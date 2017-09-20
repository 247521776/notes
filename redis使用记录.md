# redis
  
执行命令`./redis-cli -h xxx -p xxxx`, 报错, 错误信息为  
`Could not connect to Redis at 123.206.6.87:6379: Connection refused`  
该错误说明服务器端中的配置文件中绑定了本地`ip`，导致其他`ip`登录被拒，只需在配置文件中注释`bind 127.0.0.1`  
配置文件为安装目录中的`redis.conf`
  
  
执行添加命令报错，错误信息为
<pre><code>(error) DENIED Redis is running in protected mode because protected mode is enabled, no bind address was specified,
no authentication password is requested to clients. In this mode connections are only accepted from the loopback interface. 
If you want to connect from external computers to Redis you may adopt one of the following solutions: 
1) Just disable protected mode sending the command 'CONFIG SET protected-mode no' from the loopback interface by connecting to Redis from the same host the server is running, 
however MAKE SURE Redis is not publicly accessible from internet if you do so. Use CONFIG REWRITE to make this change permanent. 
2) Alternatively you can just disable the protected mode by editing the Redis configuration file, 
and setting the protected mode option to 'no', and then restarting the server. 
3) If you started the server manually just for testing, restart it with the '--protected-mode no' option. 
4) Setup a bind address or an authentication password. NOTE: You only need to do one of the above things in order for the server to start accepting connections from the outside.</code></pre>
选择开启权限认证模式，在配置文件中找到`requirepass`，取消该注释，`requirepass `后为密码。