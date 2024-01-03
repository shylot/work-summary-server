import express from 'express';
import Service from "./service/Service";

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// 注册所有的服务
Service.register();
// 加载所有的服务
Service.load(app);
// 监听
app.listen(3000);
console.log('【服务发布地址】http://localhost:3000')
