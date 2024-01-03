import PGDatabase from "../../entity/database/PGDatabase";
import ServiceRegister from "../ServiceRegister";
import {IModulePath} from "../../interface/IModulePath";
import {IRequestMethod} from "../../interface/IReqest";

export class DatabaseService {
    public register() {
        const pgDatabase: PGDatabase = new PGDatabase();
        const modulePath: IModulePath = IModulePath.DATABASE;
        // 数据库连接
        ServiceRegister.registerService(IRequestMethod.GET, modulePath,'connect', pgDatabase)
        // 数据库查询
        ServiceRegister.registerService(IRequestMethod.GET, modulePath, 'query', pgDatabase)
    }
}
