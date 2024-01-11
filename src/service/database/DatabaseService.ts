import pg from 'pg';
import {Config} from "../../entity/database/Config";
import {IResponseStatus} from "../../interface/IRequest";
import ResponseDto from "../../entity/responseDto/ResponseDto";


export class DatabaseService {
    // 连接池
    private static pool: pg.Pool = new pg.Pool(Config.pg);
    private static client;
    private static done: Function = () => {};

    public static isConnected() {
        return !!this.client;
    }

    public static connect(): Promise<ResponseDto> {
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
    public static import(req: any): Promise<ResponseDto> {
        return new Promise((resolve, reject) => {
            console.log(req);
            if (this.client) {
                /*let sql: string = '';
                const temp: string = 'INSERT INTO students (title, issueId, hour, projectId, projectName, log, date)';
                list.forEach(({title, issueId, hour, projectId, projectName, log, date}: IDBSheetItem) => {
                    sql += `${temp} VALUES (${title}, ${issueId}, ${hour}, ${projectId}, ${projectName}, ${log}, ${date});`
                })
                this.client.query(sql, [], (error, response) => {
                    this.done();
                    if (error) {
                        reject(new ResponseDto(IResponseStatus.ERROR, error, '数据查询失败'));
                    } else{
                        resolve(new ResponseDto(IResponseStatus.SUCCESS, response, '数据查询成功'));
                    }
                })*/
            } else {
                reject(new ResponseDto(IResponseStatus.ERROR, null , '数据库未连接'));
            }
        })
    }
    public static query(sql: string): Promise<ResponseDto> {
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
