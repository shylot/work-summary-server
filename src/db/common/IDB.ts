export enum IdbType {
    PG = 'postgreSql'
}

export interface IdbInfo {
    host: string;
    port: number,
    dbName: string,
    userName: string,
    password:string,
    note: string,
    max?: number,
    idleTimeoutMillis?: number
}
