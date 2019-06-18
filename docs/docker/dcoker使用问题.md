## 问题一  

场景：运行`docker`容器后，进入容器下载命令，使用命令提示`wtctl: Operation not permitted`  

解决办法：  
执行命令：`docker run -d -e "container=docker" --privileged=true -v /sys/fs/cgroup:/sys/fs/cgroup --name centos7 centos:7 /usr/sbin/init`  
进入容器：`docker exec -it $CONTAINER_ID /bin/bash`  
执行想要执行的命令不在提示错误

## 问题而

场景：运行`docker rmi xxxx`，提示`Error response from daemon: conflict: unable to delete 8f5116cbc201 (cannot be forced) - image has dependent child images`  

解决办法：  
1. 删除所有镜像、容器、网络和卷: `docker system prune -a`  
2. 批量删除容器，再删除镜像:  

```
# 停止所有容器
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop

# 删除所有容器
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm

# 删除所有none镜像
docker images|grep none|awk '{print $3 }'|xargs docker rmi
```
