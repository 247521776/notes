# docker使用

<span style="color:red;">该`docker`使用环境为：`centos`</span>
<ol>
	<li><a href="#1">安装docker条件</a></li>
	<li><a href="#2">检查条件</a></li>
	<li><a href="#3">安装docker</a></li>
	<li><a href="#4">docker使用</a></li>
</ol>

## 安装docker条件<a name="1"></a>

使用`docker`条件  

-  必须是64位CPU架构的计算机，Docker目前不支持32位CPU
-  运行Linux3.8或更高版本内核，CentOS时内核必不小于3.10
-  内核必须支持一种合适的存储驱动，可以是Device Manager、AUFS、vfs、btrfs、以及默认的驱动Device Mapper中的一个
-  内核必须支持并开启cgroup和命名空间namespace功能

## 检查条件<a name="2"></a>

-  内核

```
> uname -a
```
```
Linux VM_120_89_centos 3.10.0-327.36.3.el7.x86_64 #1 SMP Mon Oct 24 16:09:20 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```
-  检查`Device Mapper`

```
> ls -l /sys/class/misc/device-mapper
或者在/proc/device文件中检查是否有device-mapper条目
> grep device-mapper /proc/devices
```
如果均没成功，可以用`yum`下载包：`device-mapper`、`device-mapper-multipath`

## 安装docker

```
> yum -y install docker.io
```

## docker的使用<a name="4"></a>

`docker`的镜像容器存储位置在: `/var/lib/dokcer`

查看`docker`信息

```
> docker info
```

`docker`状态

```
> systemctl status docker
```

停止`docker`服务

```
> systemctl stop docker
```

下载一个镜像

```
> docker pull centos:latest
```

启动`docker`

```
> service docker start
```

开机启动

```
> chkconfig docker on
```

查看已下载镜像

```
> docker images
```

删除镜像

```
> docker imr $IMAGE_ID
```

运行一个容器

```
> docker run -i -t centos /bin/bash
```

容器启动到删除

```
启动一个容器
> docker start $CONTAINER_ID
进入一个容器
> docker attach $CONTAINER_ID
重启
> docker restart $CONTAINER_ID
停止
> docker stop $CONTAINER_ID
删除一个容器
> docker rm $CONTAINER_ID
退出容器并停止容器
ctrl + d
退出容器并不停止容器
ctrl + p + q
```

查看所有容器

```
> docker ps -a
查看启动镜像
> docker ps
```

查看容器日志

```
> docker logs $CONTAINER_ID
```

将机器`a`镜像迁移到另一台机器上  
机器`a`上的操作

```
> docker save $CONTAINER_ID > /xxx/xxx.tar
```

机器`b`上的操作

```
> docker load < /xxx/xxx.tar
```