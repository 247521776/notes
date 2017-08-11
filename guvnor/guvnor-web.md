## <span style='color:red'>注意：</span>
  
guvnor-web需要三个文件guvnor-web、guvnor-web-hosts、guvnor-web-users  
  
普通用户创建文件路径 `$HOME/.config/guvnor`  
root用户创建文件路径 `/etc/guvnor`  
  
### guvnor-web  
  
guvnor-web包含web服务器和用户界面设置  
  
<a href="https://github.com/tableflip/guvnor/blob/master/guvnor-web">配置信息</a>  
  
### guvnor-web-hosts  
  
监视主机  
配置信息如命令行`guv remoteconfig`输出信息
  
### guvnor-web-users
  
用户能访问的服务  
<pre><code>[userName]
  password = xxxx
[userName.webserver]
  secret = xxxxx</code></pre>