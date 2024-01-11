import express from 'express';
import {DatabaseService} from "./service/database/DatabaseService";
import ResponseDto from "./entity/responseDto/ResponseDto";
import {IResponseStatus} from "./interface/IRequest";
import multer from "multer";
import XLSX from "XLSX";
import {IDBSheetItem} from "./entity/database/IDatabase";

const app = express();
app.use( async (req: any, res: any, next: Function) => {
    // 保证数据库连接
    if (DatabaseService.isConnected()) {
        next();
    } else {
        const response: ResponseDto = await DatabaseService.connect();
        if (response.getStatus() === IResponseStatus.ERROR) {
            res.send(response)
        } else {
            next();
        }
    }
})
// 初始测试
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// 配置 multer 来处理文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // 指定保存到 uploads 目录下
    },
});
const upload = multer({storage})
// 导入Excel
app.post('/import', upload.single('file'), async (req: any, res: any) => {
    // 读取上传的 Excel 文件
    const workbook = XLSX.readFile(req.file.path);
    // 获取第一个工作表的数据
    const worksheetName = workbook.SheetNames[0];
    const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[worksheetName]) || [];
    console.log(data)
    const keys: string[] = Object.keys(data[0]);
    const list: IDBSheetItem[] = [];
    data.forEach((item: any, index: number) => {
        const dateTime: number = Number(item[keys[1]]);
        const it: IDBSheetItem = {
            issueId: item[keys[0]],
            title: item[keys[1]],
            hour: Number(item[keys[2]]),
            projectId: item[keys[18]],
            projectName: item[keys[19]],
            log: item[keys[22]],
            // 将Excel时间转换为JavaScript时间
            date: new Date(dateTime * 24 * 60 * 60 * 1000),
        }
        list.push(it);
    });
    console.log(list);
    /*try {
        // 将数据插入到 PostgreSQL 数据库中
        const sql = 'INSERT INTO your_table (column1, column2) VALUES ($1, $2)';
        for (const row of data) {
            await pool.query(sql, [row.column1, row.column2]);
        }
        res.sendStatus(200); // 返回成功状态码
    } catch (error) {
        console.error(error); // 打印错误信息
        res.sendStatus(500); // 返回错误状态码
    } finally {
        pool.end(); // 断开与数据库的连接
    }*/
});

// 监听
app.listen(3000);
console.log('【服务发布地址】http://localhost:3000')
