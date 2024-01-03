import express from 'express';
import Service from "./service/Service";
import PGDatabase from "./entity/database/PGDatabase";
import ResponseDto from "./entity/responseDto/ResponseDto";

const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const db = new PGDatabase();
app.get('/connect', (req, res) => {
    db.connect().then(response => {
        res.json(response);
    }).catch((err) => {
        res.json(err);
    })
})
// 注册所有的服务
Service.register();
// 加载所有的服务
Service.load(app);
// 监听
app.listen(3000);
