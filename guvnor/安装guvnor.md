#<span style='color:red'>问题<span>

##安装失败
  
###报错信息为node-gyp库报错  
  
解决方法：更新gcc编译器  
可能报错原因：库使用了新语法，旧编译器不支持该语法，需更新编译器  
  
###报错信息为fs库，需支持graceful-fs  
  
解决方法：node版本过高  
可能报错原因：node版本过高，node 6.0不支持graceful-fs  
  
##安装问题  
  
###安装过程中卡住  
  
可能原因：网速慢或者库本身有问题
  
###使用命令报错`libavahi-compat-libdnssd-dev before installing guvnor`  
  
在centos下载包`avahi-compat-libdns_sd-devel.x86_64`