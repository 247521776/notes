# `jenkins`使用学习  

该学习在`mac`系统下进行  

### 第一步下载`jenkins`

[下载地址](https://jenkins.io/)  

### 安装`jenkins`  

提示输入管理员账号密码  
密码所在路径位置为: `/Users/Shared/Jenkins/Home/secrets/initialAdminPassword`  

### 修改端口号  

`sudo defaults write /Library/Preferences/org.jenkins-ci httpPort 5566`  

### 自动启动  

`sudo launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist`  

### 取消自动启动

`sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist`