import pg from 'pg';
import ResponseDto from "../responseDto/ResponseDto";
import {IResponseStatus} from "../../interface/IRequest";
export default class PGDatabase {
    // 连接池
    private pool: pg.Pool;
    private client;
    private done: Function = () => {};
    // 数据库链接属性
    private config: any = {
        database: 'postgres',
        user: 'postgres',
        password: '123456',
        port: 5432,
        // 扩展属性
        max: 20, // 连接池最大连接数
        idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
    }
    constructor() {
        this.pool = new pg.Pool(this.config);
    }

    public connect() {
        return new Promise((resolve, reject) => {
            this.pool.connect((error, client, done) => {
                if (error) {
                    reject(new ResponseDto(IResponseStatus.ERROR, error, '数据库连接失败'));
                } else {
                    this.client = client;
                    this.done = done;
                    resolve(new ResponseDto(IResponseStatus.SUCCESS, null, '数据库连接成功'));
                }
            })
        })
    }
    public query(sql: string) {
        return new Promise((resolve, reject) => {
            if (this.client) {
                this.client.query(sql, [], (error, response) => {
                    this.done();
                    if (error) {
                        reject(new ResponseDto(IResponseStatus.ERROR, error, '数据查询失败'));
                    } else{
                        resolve(new ResponseDto(IResponseStatus.SUCCESS, response, '数据查询成功'));
                    }
                })
            } else {
                reject(new ResponseDto(IResponseStatus.ERROR, null , '数据库未连接'));
            }
        })
    }
}
