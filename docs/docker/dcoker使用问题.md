## 问题一  

场景：运行`docker`容器后，进入容器下载命令，使用命令提示`wtctl: Operation not permitted`  

解决办法：  
执行命令：`docker run -d -e "container=docker" --privileged=true -v /sys/fs/cgroup:/sys/fs/cgroup --name centos7 centos:7 /usr/sbin/init`  
进入容器：`docker exec -it $CONTAINER_ID /bin/bash`  
执行想要执行的命令不在提示错误