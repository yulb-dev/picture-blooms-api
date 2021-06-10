# 前言

这是[picture-blooms](https://github.com/yulb-dev/picture-blooms.git)的后台接口项目地址

## 技术栈

```
node + express + mongodb(mongoose)
```

## 项目运行

运行前:
1、请确保你已经启动 mongodb 数据库服务并恢复数据库文件

```
//恢复数据库文件：
mongorestore -h localhost:27017 -d pictureblooms --dir <path>
/*
<path>：
mongorestore 最后的一个参数，设置备份数据所在位置，例如：D:\project\picture-blooms-api\data\dump\pictureblooms
*/
```

2、项目运行：

```
git clone https://github.com/yulb-dev/picture-blooms-api.git

cd picture-blooms-api

npm install

node index.js
```

## 最后
1、注意检查 "/index.js" 里的 "Access-Control-Allow-Origin"值，始终与前端项目地址保持一致，因为这涉及到跨域问题
2、"/router/port.js"里的port值为上传文件的地址，如果你不在服务器部署此项目，则不需要考虑这个问题

