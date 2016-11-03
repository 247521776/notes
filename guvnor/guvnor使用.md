###启动命令
  
`guv start`
  
###启动命令帮助  
  
`guv start -h | guv start --help`  
  
###重启  
  
`guv restart <pid Or name>`  
  
###删除  
  
`guv remove <pid Or name>`  
  
###列表  
  
`guv list`  
  
###启动web  
  
`guv web`
  
##使用过程  
  
###问题
  
**1、**执行`guv web`报错，报错信息为 `/usr/lib64/libstdc++.so.6 version 'GLIBCXX_3.4.21' not found`  
  
**原因**：升级gcc时，生成的动态库没有替换老版本gcc的动态库
  

**解决方法**：执行命令`strings /usr/lib64/libstdc++.so.6 | grep GLIBCXX`  
查看是否有GLIBCXX_3.4.21版本，如果没有的话，需要把下载gcc时生成的动态库手动切换，具体操作可参考<a href="http://www.cnblogs.com/lzpong/p/5755678.html">手动切换g++</a>  
  
**2、**执行`guv web`报错，报错信息为:  
<pre><code>error: Failed to start /usr/local/lib/node_modules/guvnor/lib/web
error:  message=Command failed: sudo -u root printenv PATH
sudo: sorry, you must have a tty to run sudo
, killed=false, code=1, signal=null, cmd=sudo -u root printenv PATH</code></pre>  
  
**解决办法**：执行命令`visudo`，找到`Default requiretty`这行注释掉  
  
**3、**执行`guv remoteconfig`报错，报错信息为没有权限，重启服务器之后即可 
  
**4、**执行命令`sudo guv remoteconfig`报错，报错信息为`sudo: guv: command not found`，执行`sudo ln -s /usr/local/bin/guv /usr/bin/guv`命令