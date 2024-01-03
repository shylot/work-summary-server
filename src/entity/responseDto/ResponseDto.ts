import {IResponseStatus} from "../../interface/IRequest";

export default class ResponseDto {
    private readonly status: IResponseStatus;
    private readonly result: any;
    private readonly msg: string;

    constructor(status: IResponseStatus, result?: any, msg?: string) {
        this.status = status;
        this.result = result;
        this.msg = msg ? msg : (status === IResponseStatus.SUCCESS ? '请求成功' : '请求失败')
    }

    public getStatus(): IResponseStatus {
        return this.status;
    }
    public getResult(): any {
        return this.result;
    }
    public getMSG(): string {
        return this.msg;
    }
}
