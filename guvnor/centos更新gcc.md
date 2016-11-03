###1、获得安装包并解压  
  
`wget http://ftp.gnu.org/gnu/gcc/gcc-6.2.0/gcc-6.2.0.tar.bz2`  
`tar -jxvf gcc-6.2.0.tar.bz2`  
  
gcc下载地址 `http://ftp.gnu.org/gnu/gcc`  
  
###2、下载供编译需求的依赖项  
  
这个脚本文件会帮我们下载、配置、安装依赖库。  
`cd gcc-6.2.0`  
`./contrib/download_prerequisites`  
  
###3、建立一个目录供编译出的文件存放  
  
`mkdir gcc-build-6.2.0`  
`cd gcc-build-6.2.0`  
  
###4、生成makefile文件  
  
`../configure -enable-checking=release -enable-languages=c,c++ -disable-multilib`  
  
###5、编译（注意：此步骤非常耗时）  
  
`make -j4`  
  
-j4选项是make对多核处理器的优化  
  
###6、安装  
  
`sudo make install`  
  
###7、gcc版本修改  
  
重启或者执行命令行 `source /etc/profile`

###8。查看是否更新成功  
  
`gcc -v | gcc --version`