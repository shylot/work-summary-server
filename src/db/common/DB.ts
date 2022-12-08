import {IdbInfo} from "./IDB";

export default class DB {
    private readonly host: string;
    private readonly port: number;
    private readonly dbName: string;
    private readonly userName: string;
    private readonly password:string;
    private readonly note: string;
    private readonly max: number = 20;
    private readonly idleTimeoutMillis: number = 3000;

    constructor(opt: IdbInfo) {
        this.host = opt.host;
        this.port = opt.port;
        this.dbName = opt.dbName;
        this.userName = opt.userName;
        this.password = opt.password;
        this.note = opt.note || '';
        this.max = opt.max || 20;
        this.idleTimeoutMillis = opt.idleTimeoutMillis || 3000;
    }

    public getHost(): string {return this.host}
    public getPort(): number {return this.port}
    public getDbName(): string {return this.dbName}
    public getUserName(): string {return this.userName}
    public getPassword(): string {return this.password}
    public getMax(): number {return this.max}
    public getNote(): string {return this.note}
    public getIdleTimeoutMillis(): number {return this.idleTimeoutMillis}

    public connect() {}
}
